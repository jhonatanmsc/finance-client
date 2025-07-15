import {CPagination, CPaginationItem} from "@coreui/react";
import React from "react";

type PaginationProps = {
  pagination?: PaginationType;
  setPage: any;
  qtyPages: number;
  currentPage: number;
}

export default function Pagination(props: PaginationProps){

  return (
    <div className="d-flex justify-content-end w-100">
      <CPagination aria-label="Page navigation example" style={{ cursor: 'pointer' }}>
        <CPaginationItem aria-label="Previous" disabled={!props?.pagination?.previous} onClick={() => props.setPage(props.currentPage - 1)}>
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        {Array.from({ length: props.qtyPages }).map((_, index: number) => (
          <CPaginationItem active={index + 1 === props.currentPage} onClick={() => props.setPage(index + 1)}>{index + 1}</CPaginationItem>
        ))}
        <CPaginationItem aria-label="Next" disabled={!props?.pagination?.next} onClick={() => props.setPage(props.currentPage + 1)}>
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </div>
  )
}
