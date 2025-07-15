import { CCol, CContainer, CRow } from '@coreui/react'

export default function Page500() {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4">500</h1>
              <h4 className="pt-3">Houston, temos um problema!</h4>
              <p className="text-body-secondary float-start">
                A página buscada não está disponível no momento
              </p>
            </span>
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
