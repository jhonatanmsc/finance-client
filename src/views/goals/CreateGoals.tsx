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
import { useNavigate, useParams } from 'react-router-dom'
import api from '@/services/baseApi'
import Decimal from 'decimal.js'
import { CenteredModal } from '@/views/modals/CenteredModal'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

export default function CreateGoals() {
  const { id } = useParams()
  const isEditMode = !!id
  const [pageTitle, setPageTitle] = useState('Novo Objetivo')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState<number>(0.0)
  const [concludedAt, setConcludedAt] = useState<string>()
  const navigate = useNavigate()
  const [goalRaw, setGoalRaw] = useState<any>(null)
  const [visible, setVisible] = useState(false)
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (isEditMode) {
      setPageTitle('Editar Objetivo')
      api.get('/goals/' + id).then((res: any) => {
        setGoalRaw(res)
      })
    }
  }, [])

  useEffect(() => {
    if (goalRaw) {
      setTitle(goalRaw.title)
      setDescription(goalRaw.description)
      setValue(goalRaw.value)
      setConcludedAt(goalRaw.concluded_at)
    }
  }, [goalRaw])

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    let data = {
      title: title,
      description: description,
      value: new Decimal(value),
      concluded_at: concludedAt,
    }
    api.post(`/goals/`, data)
  }

  const handdleGoBack = () => {
    navigate(-1)
  }

  const handdleDelete = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    let data = { reason: reason }
    api.delete(`/goals/${id}/`, { data }).then((res) => {
      navigate('/objetivos/')
    })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>{pageTitle}</strong>
          {isEditMode ?? (
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
              <CFormInput
                type="number"
                id="input-value"
                label="Valor"
                step="0.01"
                value={value}
                onChange={(e) => {
                  setValue(Number(e.target.value))
                }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="date"
                id="input-concluded-at"
                label="Concluído em"
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
        title="Deletar Objetivo"
        visible={visible}
        setVisible={setVisible}
        textSubmitButton="deletar"
        styleSubmitButton="danger"
      >
        <form id="form-delete" onSubmit={handdleDelete}>
          <h5>Deseja realmente deletar o objetivo?</h5>
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
