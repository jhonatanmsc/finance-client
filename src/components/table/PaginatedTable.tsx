import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormLabel,
  CFormSelect,
  CInputGroup, CLink,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { Suspense, useEffect } from 'react'
import Pagination from '@/components/table/Pagination'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

type PaginatedTablePros = {
  qtyPages: number
  title: string
  perPage: number
  currentPage: number
  filters?: React.ReactNode
  headers: Array<any>
  data: Array<object>
  setPageSize: any
  pageOptions: any
  pagination?: PaginationType
  baseUrl: string
  setPage(number: number): any
  setPageOptions(mPageOptions: { value: number; label: string }[]): void
}

export default function PaginatedTable(props: PaginatedTablePros) {
  const navigate = useNavigate()

  useEffect(() => {
    let mPageOptions = Array.from({ length: 5 }, (_, i) => ({
      value: (i + 1) * 20,
      label: `${(i + 1) * 20}`,
    }))
    props.setPageOptions(mPageOptions)
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>{props.title}</strong>
          <div className="float-end">
            <CButton
              color="secondary"
              className="rounded-pill"
              onClick={() => navigate(`/${props.baseUrl}/novo`)}
            >
              <CIcon icon={cilPlus} /> Novo
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow className="w-100 mb-3">
            <CCol sm={2}>
              <CInputGroup>
                <CFormLabel htmlFor="contributions" className="me-3">
                  n° de páginas
                </CFormLabel>
                <CFormSelect
                  id="page-size"
                  onChange={(e) => props.setPageSize(parseInt(e.target.value))}
                >
                  {props.pageOptions.map((pg: any) => (
                    <option
                      value={pg.value}
                      selected={pg.value === props.currentPage}
                      key={pg.value}
                    >
                      {pg.label}
                    </option>
                  ))}
                </CFormSelect>
              </CInputGroup>
            </CCol>
          </CRow>

          {props?.filters}

          <CTable>
            <CTableHead>
              <CTableRow>
                {props.headers.map((k: string, cellIndex: number) => (
                  <CTableHeaderCell key={cellIndex} scope="col">
                    {k}
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <Suspense
                fallback={
                  <CTableRow>
                    <CTableDataCell className="pt-3 text-center" colSpan={9}>
                      <CSpinner color="primary" variant="grow" />
                    </CTableDataCell>
                  </CTableRow>
                }
              >
                {props?.data?.map((it: any, index: number) => (
                  <CTableRow key={index}>
                    {props.headers.map((k: string, cellIndex: number) => (
                      <CTableDataCell key={cellIndex}>
                        {cellIndex === 0 ? (
                          <CLink href={`/${props.baseUrl}/${it.id}/editar`}>{it[k]}</CLink>
                        ) : (
                          it[k]
                        )}
                      </CTableDataCell>
                    ))}
                  </CTableRow>
                ))}
              </Suspense>
            </CTableBody>
          </CTable>
          <Pagination
            pagination={props.pagination}
            setPage={props.setPage}
            qtyPages={props.qtyPages}
            currentPage={props.currentPage}
          />
        </CCardBody>
      </CCard>
    </>
  )
}
