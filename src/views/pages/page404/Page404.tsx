import { CCol, CContainer, CRow } from '@coreui/react'

export default function Page404() {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! Você está perdido.</h4>
              <p className="text-body-secondary float-start">
                A página que você está procurando não foi encontrada.
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
