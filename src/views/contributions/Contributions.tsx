import React, { useEffect, useState, createRef } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react';
import api from "@/services/baseApi";

export default function Contributions() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    setLoading(true);
    api.get(`/contributions?page=${page}&page_size=${pageSize}`).then((res: any) => {
      setContributions(res.results);
      setLoading(false);
    })
  }, []);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Contribuições</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Título</CTableHeaderCell>
                <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
                <CTableHeaderCell scope="col">Desconto</CTableHeaderCell>
                <CTableHeaderCell scope="col">Valor</CTableHeaderCell>
                <CTableHeaderCell scope="col">Qtd</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                <CTableHeaderCell scope="col">Fornecedor</CTableHeaderCell>
                <CTableHeaderCell scope="col">Objetivo</CTableHeaderCell>
                <CTableHeaderCell scope="col">Executado em</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {contributions.map((contr: any) => (
                <CTableRow>
                  <CTableDataCell>{contr.title}</CTableDataCell>
                  <CTableDataCell>{contr.description}</CTableDataCell>
                  <CTableDataCell>{contr.discount}</CTableDataCell>
                  <CTableDataCell>{contr.value}</CTableDataCell>
                  <CTableDataCell>{contr.quantity}</CTableDataCell>
                  <CTableDataCell>{contr.total}</CTableDataCell>
                  <CTableDataCell>{contr.supplier}</CTableDataCell>
                  <CTableDataCell>{contr.goal}</CTableDataCell>
                  <CTableDataCell>{contr.created_at}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}
