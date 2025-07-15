import React, { useEffect, useState, useRef } from 'react'
import { CRow, CCol, CFormLabel, CButton } from '@coreui/react'
import api from '@/services/baseApi'
import Decimal from 'decimal.js'
import { decimalToBRL } from '@/utilities/currency'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import PaginatedTable from '@/components/table/PaginatedTable'

export default function Contributions() {
  const [contributions, setContributions] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [goals, setGoals] = useState([])
  const animatedComponents = makeAnimated()
  const goalsSelectRef = useRef(null)
  const suppliersSelectRef = useRef(null)
  const [goalInputId, setGoalInputId] = useState('')
  const [supplierInputId, setSupplierInputId] = useState('')
  // pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [qtyPages, setQtyPages] = useState(1)
  const [pageOptions, setPageOptions] = useState<{ value: number; label: string }[]>([])
  const [paginationData, setPaginationData] = useState<PaginationType>()

  useEffect(() => {
    if (goalsSelectRef.current) {
      const input = goalsSelectRef.current.querySelector('input')
      if (input?.id) {
        setGoalInputId(input.id)
      }
    }
    if (suppliersSelectRef.current) {
      const input = suppliersSelectRef.current.querySelector('input')
      if (input?.id) {
        setSupplierInputId(input.id)
      }
    }
    let mPageOptions = Array.from({ length: 5 }, (_, i) => ({
      value: (i + 1) * 20,
      label: `${(i + 1) * 20}`,
    }))
    setPageOptions(mPageOptions)
    api.get(`/goals?page=1&page_size=100`).then((res: any) => {
      setGoals(res.results.map((it: any) => ({ value: it.id, label: it.title })))
    })
    api.get(`/suppliers?page=1&page_size=100`).then((res: any) => {
      setSuppliers(res.results.map((it: any) => ({ value: it.id, label: it.name })))
    })
  }, [])

  useEffect(() => {
    api
      .get(`/contributions?page=${page}&page_size=${pageSize}&ordering=-created_at`)
      .then((res: any) => {
        setQtyPages(Math.ceil(res.count / pageSize))
        setPaginationData({
          count: res.count,
          next: res.next,
          previous: res.previous,
        })
        let contribs = res.results.map((contr: any) => {
          let date = new Date(contr.created_at)
          return {
            Título: contr.title,
            Descrição:
              contr.description.length > 20
                ? contr.description.substring(0, 20) + '...'
                : contr.description,
            'Desconto%': parseInt(Decimal(contr.discount).toFixed(2)),
            'Vlr R$': decimalToBRL(contr.value),
            Qtd: contr.quantity,
            'Total R$': decimalToBRL(contr.total),
            Fornecedor: contr.supplier.name,
            Objetivo: contr.goal.title,
            'Executado em': date.toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          }
        })
        setContributions(contribs)
      })
  }, [page, pageSize])

  return (
    <>
      <PaginatedTable
        title="Contribuições"
        filters={
          <CRow className="w-100 mb-3">
            <CCol sm={5}>
              <CFormLabel htmlFor={goalInputId} className="me-3">
                Objetivos
              </CFormLabel>
              <div ref={goalsSelectRef}>
                <Select isMulti components={animatedComponents} options={goals} />
              </div>
            </CCol>
            <CCol sm={5}>
              <CFormLabel htmlFor={supplierInputId} className="me-3">
                Fornecedores
              </CFormLabel>
              <div ref={suppliersSelectRef}>
                <Select isMulti components={animatedComponents} options={suppliers} />
              </div>
            </CCol>
            <CCol sm={2} className="d-flex align-items-end">
              <CButton color="primary" className="rounded-pill">
                <CIcon icon={cilSearch} /> Aplicar
              </CButton>
            </CCol>
          </CRow>
        }
        qtyPages={qtyPages}
        perPage={pageSize}
        currentPage={page}
        pageOptions={pageOptions}
        headers={[
          'Título',
          'Descrição',
          'Desconto%',
          'Vlr R$',
          'Qtd',
          'Total R$',
          'Fornecedor',
          'Objetivo',
          'Executado em',
        ]}
        data={contributions}
        pagination={paginationData}
        setPageOptions={setPageOptions}
        setPageSize={setPageSize}
        setPage={setPage}
      />
    </>
  )
}
