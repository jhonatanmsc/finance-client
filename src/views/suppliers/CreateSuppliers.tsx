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
import { CenteredModal } from '@/views/modals/CenteredModal'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import RatingField from '@/components/RatingField'

export default function CreateSuppliers() {
  const { id } = useParams()
  const isEditMode = !!id
  const [pageTitle, setPageTitle] = useState('Novo Fornecedor')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState<number>(0.0)
  const navigate = useNavigate()
  const [supplierRaw, setSupplierRaw] = useState<any>(null)
  const [visible, setVisible] = useState(false)
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (isEditMode) {
      setPageTitle('Editar Fornecedor')
      api.get('/suppliers/' + id).then((res: any) => {
        setSupplierRaw(res)
      })
    }
  }, [])

  useEffect(() => {
    if (supplierRaw) {
      setName(supplierRaw.title)
      setDescription(supplierRaw.description)
      setRating(supplierRaw.rating)
    }
  }, [supplierRaw])

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    let data = {
      name: name,
      description: description,
      rating: rating,
    }
    api.post(`/suppliers/`, data)
  }

  const handdleGoBack = () => {
    navigate(-1)
  }

  const handdleDelete = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    let data = { reason: reason }
    api.delete(`/suppliers/${id}/`, { data }).then((res) => {
      navigate('/fornecedores/')
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
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <label>Avaliação</label>
              <RatingField rating={rating} onRate={setRating} />
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
        title="Deletar Fornecedor"
        visible={visible}
        setVisible={setVisible}
        textSubmitButton="deletar"
        styleSubmitButton="danger"
      >
        <form id="form-delete" onSubmit={handdleDelete}>
          <h5>Deseja realmente deletar o fornecedor?</h5>
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
