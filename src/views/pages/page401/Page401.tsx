import { CCol, CContainer, CRow } from '@coreui/react'

export default function Page401() {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">401</h1>
              <h4 className="pt-3">Você não tem permissão para acessar a página.</h4>
              <p className="text-body-secondary float-start">
                Solicite permissão ao administrador.
              </p>
            </div>
            {/*<CInputGroup className="input-prepend">*/}
            {/*  <CInputGroupText>*/}
            {/*    <CIcon icon={cilMagnifyingGlass} />*/}
            {/*  </CInputGroupText>*/}
            {/*  <CFormInput type="text" placeholder="What are you looking for?" />*/}
            {/*  <CButton color="info">Search</CButton>*/}
            {/*</CInputGroup>*/}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
