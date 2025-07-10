import React, {useEffect, useState, createRef, Suspense, useRef} from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell, CTableFoot, CPaginationItem, CPagination, CSpinner, CForm,
  CFormLabel, CInputGroup, CButton, CFormInput, CFormSelect
} from '@coreui/react';
import api from "@/services/baseApi";
import Decimal from "decimal.js";
import {decimalToBRL} from "@/utilities/currency";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import CIcon from "@coreui/icons-react";
import {cilSearch} from "@coreui/icons";

export default function Contributions() {
  const [contributions, setContributions] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [goals, setGoals] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [qtyPages, setQtyPages] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const animatedComponents = makeAnimated();
  const goalsSelectRef = useRef(null);
  const suppliersSelectRef = useRef(null);
  const [goalInputId, setGoalInputId] = useState("");
  const [supplierInputId, setSupplierInputId] = useState("");
  const [pageOptions, setPageOptions] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    if (goalsSelectRef.current) {
      const input = goalsSelectRef.current.querySelector('input');
      if (input?.id) {
        setGoalInputId(input.id);
      }
    }
    if (suppliersSelectRef.current) {
      const input = suppliersSelectRef.current.querySelector('input');
      if (input?.id) {
        setSupplierInputId(input.id);
      }
    }
    let mPageOptions = Array.from({ length: 5 }, (_, i) => ({
      value: (i + 1) * 20,
      label: `${(i + 1) * 20}`,
    }));
    setPageOptions(mPageOptions);
    api.get(`/goals?page=1&page_size=100`).then((res: any) => {
      setGoals(
        res.results.map((it: any) => ({value: it.id, label: it.title}))
      );
    })
    api.get(`/suppliers?page=1&page_size=100`).then((res: any) => {
      setSuppliers(
        res.results.map((it: any) => ({value: it.id, label: it.name}))
      );
    })
  }, []);

  useEffect(() => {
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
    })
  }, [page, pageSize]);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Contribuições</strong>
        </CCardHeader>
        <CCardBody>
          <CRow className="w-100 mb-3">
            <CCol sm={2}>
              <CInputGroup>
                <CFormLabel htmlFor="contributions" className="me-3">n° de páginas</CFormLabel>
                <CFormSelect
                  id="page-size"
                  onChange={(e) => setPageSize(parseInt(e.target.value))}
                >
                  {pageOptions.map(pg => (
                    <option
                      value={pg.value}
                      selected={pg.value === page}
                      key={pg.value}
                    >
                      {pg.label}
                    </option>
                  ))}
                </CFormSelect>
              </CInputGroup>
            </CCol>
          </CRow>
          <CRow className="w-100 mb-3">
            <CCol sm={5}>
              <CFormLabel htmlFor={goalInputId} className="me-3">Objetivos</CFormLabel>
              <div ref={goalsSelectRef}>
                <Select
                  isMulti
                  components={animatedComponents}
                  options={goals}
                />
              </div>
            </CCol>
            <CCol sm={5}>
              <CFormLabel htmlFor={supplierInputId} className="me-3">Fornecedores</CFormLabel>
              <div ref={suppliersSelectRef}>
                <Select
                  isMulti
                  components={animatedComponents}
                  options={suppliers}
                />
              </div>
            </CCol>
            <CCol sm={2} className="d-flex align-items-end">
              <CButton color="primary" className="rounded-pill"><CIcon icon={cilSearch}/> Aplicar</CButton>
            </CCol>
          </CRow>
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
              <Suspense
                fallback={
                  <CTableRow>
                    <CTableDataCell className="pt-3 text-center" colSpan={9}>
                      <CSpinner color="primary" variant="grow" />
                    </CTableDataCell>
                  </CTableRow>
                }
              >
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
              </Suspense>
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
