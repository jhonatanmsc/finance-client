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
  CTableHeaderCell, CTableBody, CTableDataCell, CTableFoot, CPaginationItem, CPagination
} from '@coreui/react';
import api from "@/services/baseApi";
import Decimal from "decimal.js";
import {decimalToBRL} from "@/utilities/currency";

export default function Contributions() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [qtyPages, setQtyPages] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get(`/contributions?page=${page}&page_size=${pageSize}&ordering=-created_at`).then((res: any) => {
      setQtyPages(Math.ceil(res.count / pageSize))
      setNextPage(res.next)
      setPrevPage(res.previous)
      let contribs = res.results.map((contr: any) => {
        contr.description = contr.description.length > 20 ? contr.description.substring(0, 20) + '...' : contr.description;
        contr.discount = Decimal(contr.discount).toFixed(2)
        contr.discount = parseInt(contr.discount);
        contr.value = decimalToBRL(contr.value);
        contr.total = decimalToBRL(contr.total);
        let date = new Date(contr.created_at);
        contr.created_at = date.toLocaleString(
          'pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }
          );
        return contr;
      })
      setContributions(contribs);
      setLoading(false);
    })
  }, [page]);

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
                <CTableHeaderCell scope="col">Desconto%</CTableHeaderCell>
                <CTableHeaderCell scope="col">Vlr R$</CTableHeaderCell>
                <CTableHeaderCell scope="col">Qtd</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total R$</CTableHeaderCell>
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
                  <CTableDataCell>{contr.supplier?.name}</CTableDataCell>
                  <CTableDataCell>{contr.goal?.title}</CTableDataCell>
                  <CTableDataCell>{contr.created_at}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <div className="d-flex justify-content-end w-100">
            <CPagination aria-label="Page navigation example" style={{ cursor: 'pointer' }}>
              <CPaginationItem aria-label="Previous" disabled={!prevPage} onClick={() => setPage(page - 1)}>
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              {Array.from({ length: qtyPages }).map((_, index: number) => (
                <CPaginationItem active={index + 1 === page} onClick={() => setPage(index + 1)}>{index + 1}</CPaginationItem>
              ))}
              <CPaginationItem aria-label="Next" disabled={!nextPage} onClick={() => setPage(page + 1)}>
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            </CPagination>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}
