import React, { useEffect, useState } from 'react'
import api from '@/services/baseApi'
import { decimalToBRL } from '@/utilities/currency'
import PaginatedTable from '@/components/table/PaginatedTable'
import Decimal from 'decimal.js'

export default function Goals() {
  const [goals, setGoals] = useState([])
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
    let targetUrl = '/goals'
    targetUrl += `?page=${page}&page_size=${pageSize}&`
    api.get(targetUrl).then((res: any) => {
      setQtyPages(Math.ceil(res.count / pageSize))
      setPaginationData({
        count: res.count,
        next: res.next,
        previous: res.previous,
      })
      let mGoals = res.results.map((goal: any) => {
        let date = new Date(goal.created_at)
        // let moneyLeft = new Decimal(goal.total).minus(new Decimal(goal.budget))
        return {
          Título: goal.title,
          Total: decimalToBRL(goal.total),
          Orçamento: decimalToBRL(goal.value),
          // Progresso: goal.progress,
          // Faltando: decimalToBRL(moneyLeft.toNumber()),
          // 'Total R$': decimalToBRL(goal.total),
          // Orçamento: decimalToBRL(goal.budget),
          'Executado em': date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }
      })
      setGoals(mGoals)
    })
  }, [page, pageSize])

  return (
    <>
      <PaginatedTable
        title="Objetivos"
        qtyPages={qtyPages}
        perPage={pageSize}
        currentPage={page}
        pageOptions={pageOptions}
        headers={['Título', 'Total', 'Orçamento']}
        data={goals}
        pagination={paginationData}
        setPageOptions={setPageOptions}
        setPageSize={setPageSize}
        setPage={setPage}
      />
    </>
  )
}
