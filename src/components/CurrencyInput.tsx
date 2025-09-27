// CurrencyInput.tsx
import React from 'react'
import { CFormLabel } from '@coreui/react/src/components/form/CFormLabel'

interface CurrencyInput {
  id: string
  label: string
  value: number | null // valor em centavos (ex: 12345 = R$ 123,45)
  onChange?: (value: number | null) => void
  placeholder?: string
}

const CurrencyInput: React.FC<CurrencyInput> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
}) => {
  // Formata centavos -> "R$ 1.234,56"
  const format = (cents: number | null): string => {
    if (cents == null || isNaN(cents)) return ''
    const n = cents / 100
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(n)
  }

  // Converte string digitada -> centavos (number)
  const parseToCents = (str: string): number | null => {
    if (!str) return null
    const digits = str.replace(/\D/g, '')
    if (!digits) return null
    return parseInt(digits, 10)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const cents = parseToCents(raw)
    onChange?.(cents)
  }

  const display = format(value)

  return (
    <div>
      <CFormLabel htmlFor={id}>{label}</CFormLabel>
      <input
        className="form-control"
        type="text"
        value={display}
        onChange={handleChange}
        placeholder={placeholder ?? 'R$ 0,00'}
        inputMode="numeric"
      />
    </div>
  )
}

export default CurrencyInput
