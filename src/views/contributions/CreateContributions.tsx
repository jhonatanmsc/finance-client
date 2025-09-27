import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import makeAnimated from 'react-select/animated'
import { useNavigate, useParams } from 'react-router-dom'
import api from '@/services/baseApi'
import Decimal from 'decimal.js'
import { CenteredModal } from '@/views/modals/CenteredModal'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import CurrencyInput from '@/components/CurrencyInput'
import SelectInput from '@/components/SelectInput'

export default function CreateContributions() {
  const { id } = useParams()
  const isEditMode = !!id
  const [pageTitle, setPageTitle] = useState('Nova Contribuição')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState<number | null>(0)
  const [qty, setQty] = useState<number>(1.0)
  const [concludedAt, setConcludedAt] = useState<string>()
  const [mGoalsTofilter, setMGoalsTofilter] = useState<any>()
  const [mSupplierTofilter, setMSupplierTofilter] = useState<any>()
  const [goals, setGoals] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const animatedComponents = makeAnimated()
  const navigate = useNavigate()
  const [contributionRaw, setContributionRaw] = useState<any>(null)
  const [visible, setVisible] = useState(false)
  const [reason, setReason] = useState('')

  useEffect(() => {
    api.get(`/goals?page=1&page_size=100`).then((res: any) => {
      setGoals(res.results.map((it: any) => ({ value: it.id, label: it.title })))
    })
    api.get(`/suppliers?page=1&page_size=100`).then((res: any) => {
      setSuppliers(res.results.map((it: any) => ({ value: it.id, label: it.name })))
    })
    if (isEditMode) {
      setPageTitle('Editar Contribuição')
      api.get('/contributions/' + id).then((res: any) => {
        setContributionRaw(res)
      })
    }
  }, [])

  useEffect(() => {
    if (contributionRaw) {
      let goal = goals.find((it: any) => it.value === contributionRaw.goal)
      let supplier = suppliers.find((it: any) => it.value === contributionRaw.supplier)
      setTitle(contributionRaw.title)
      setDescription(contributionRaw.description)
      setValue(contributionRaw.value)
      setQty(contributionRaw.quantity)
      setConcludedAt(contributionRaw.concluded_at)
      setMGoalsTofilter(goal)
      setMSupplierTofilter(supplier)
    }
  }, [contributionRaw, goals, suppliers])

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    let data = {
      title: title,
      description: description,
      value: new Decimal(value ?? 0),
      quantity: new Decimal(qty),
      goal: mGoalsTofilter?.value,
      supplier: mSupplierTofilter?.value,
      concluded_at: concludedAt,
    }
    api.post(`/contributions/`, data)
  }

  const handdleGoBack = () => {
    navigate(-1)
  }

  const handdleDelete = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    let data = { reason: reason }
    api.delete(`/contributions/${id}/`, { data }).then((res) => {
      navigate('/contribuicoes/')
    })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>{pageTitle}</strong>
          {isEditMode && (
            <div className="float-end">
              <CButton
                color="danger"
                className="rounded-pill text-white"
                onClick={() => setVisible(true)}
              >
                <CIcon icon={cilTrash} /> deletar
              </CButton>
            </div>
          )}
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3" onSubmit={submitForm}>
            <CCol md={12}>
              <CFormInput
                type="text"
                id="input-title"
                label="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </CCol>
            <CCol xs={12}>
              <CFormTextarea
                id="input-description"
                label="Descrição"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></CFormTextarea>
            </CCol>
            <CCol md={6}>
              <CurrencyInput
                id="input-value"
                label="Valor"
                value={value}
                onChange={setValue}
                placeholder="R$ 0,00"
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                id="input-qty"
                label="Quantidade"
                step="0.01"
                value={qty}
                onChange={(e) => {
                  setQty(Number(e.target.value))
                }}
              />
            </CCol>
            <CCol md={6}>
              <SelectInput
                label="Objetivos"
                components={animatedComponents}
                options={goals}
                value={mGoalsTofilter}
                onChange={(vl) => setMGoalsTofilter(vl)}
              />
            </CCol>
            <CCol md={6}>
              <SelectInput
                label="Fornecedores"
                options={suppliers}
                value={mSupplierTofilter}
                onChange={(vl) => setMSupplierTofilter(vl)}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="date"
                id="input-concluded-at"
                label="Executado em"
                lang="pt-BR"
                value={concludedAt}
                onChange={(e) => setConcludedAt(e.target.value)}
              />
            </CCol>
            <CRow>
              <CCol xs={10} />
              <CCol xs={1}>
                <CButton color="secondary" onClick={handdleGoBack}>
                  Voltar
                </CButton>
              </CCol>
              <CCol xs={1}>
                <CButton color="primary" type="submit">
                  Salvar
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
      <CenteredModal
        title="Deletar Contribuição"
        visible={visible}
        setVisible={setVisible}
        textSubmitButton="deletar"
        styleSubmitButton="danger"
      >
        <form id="form-delete" onSubmit={handdleDelete}>
          <h5>Deseja realmente deletar a contribuição?</h5>
          <CFormTextarea
            id="input-reason"
            label="Rasão da exclusão: "
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></CFormTextarea>
        </form>
      </CenteredModal>
    </>
  )
}
