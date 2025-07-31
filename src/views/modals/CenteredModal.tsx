import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

type Props = {
  title: string
  visible: boolean
  setVisible(show: boolean): void
  size?: 'sm' | 'lg' | 'xl'
  children?: React.ReactNode
  textSubmitButton: string
  styleSubmitButton: string
  onClickButton?(): void
}

export const CenteredModal = (props: Props) => {
  return (
    <>
      <CModal
        alignment="center"
        visible={props.visible}
        onClose={() => props.setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
        size={props.size}
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">{props.title}</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {props.children ? (
            props.children
          ) : (
            <div>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac exists
              eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </div>
          )}
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => props.setVisible(false)}>
            fechar
          </CButton>
          <CButton
            color={props.styleSubmitButton}
            type="submit"
            form="form-delete"
            onClick={props?.onClickButton}
          >
            {props.textSubmitButton}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
