import React, { useEffect, useState } from 'react'
import api from '@/services/baseApi'
import { decimalToBRL } from '@/utilities/currency'
import PaginatedTable from '@/components/table/PaginatedTable'
import RatingField from '@/components/RatingField'

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([])
  // pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [qtyPages, setQtyPages] = useState(1)
  const [pageOptions, setPageOptions] = useState<{ value: number; label: string }[]>([])
  const [paginationData, setPaginationData] = useState<PaginationType>()

  useEffect(() => {
    let mPageOptions = Array.from({ length: 5 }, (_, i) => ({
      value: (i + 1) * 20,
      label: `${(i + 1) * 20}`,
    }))
    setPageOptions(mPageOptions)
  }, [])

  useEffect(() => {
    let targetUrl = '/suppliers'
    targetUrl += `?page=${page}&page_size=${pageSize}&`
    api.get(targetUrl).then((res: any) => {
      setQtyPages(Math.ceil(res.count / pageSize))
      setPaginationData({
        count: res.count,
        next: res.next,
        previous: res.previous,
      })
      let supps = res.results.map((supp: any) => {
        let date = new Date(supp.created_at)
        return {
          Nome: supp.name,
          'Total R$': decimalToBRL(supp.total),
          Avaliação: <RatingField rating={supp.rating} interactive={false} />,
          'Executado em': date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }
      })
      setSuppliers(supps)
    })
  }, [page, pageSize])

  return (
    <>
      <PaginatedTable
        title="Fornecedores"
        qtyPages={qtyPages}
        perPage={pageSize}
        currentPage={page}
        pageOptions={pageOptions}
        headers={['Nome', 'Avaliação', 'Total R$']}
        data={suppliers}
        pagination={paginationData}
        setPageOptions={setPageOptions}
        setPageSize={setPageSize}
        setPage={setPage}
      />
    </>
  )
}
