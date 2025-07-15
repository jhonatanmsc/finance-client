import React from 'react'
import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react'
import {useSelector} from "react-redux";
import store, {RootState} from "@/store";
import CIcon from "@coreui/icons-react";

export const ToastStackMessage = () => {
  const messages = useSelector((state: RootState) => state.messages)

  const onClose = (index: number) => {
    store.dispatch({
      type: 'removeMessage',
      index: index,
    })
  }

  return (
    <CToaster className="p-3 me-auto z-3" placement="top-end">
      {messages.map((msg: any, index: number) => (
        <CToast key={index} autohide={true} visible={true} onClose={() => onClose(index)}>
          <CToastHeader closeButton>
            <CIcon icon={msg.icon} className={`${msg.type} me-2`}/>
            <div className="fw-bold me-auto">Mensagem</div>
            <small>7 min ago</small>
          </CToastHeader>
          <CToastBody>{msg.text}</CToastBody>
        </CToast>
      ))}
    </CToaster>
  )
}
