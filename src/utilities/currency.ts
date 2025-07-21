import Decimal from 'decimal.js'

export function decimalToBRL(value: string | number, minFraction = 2): string {
  const decimal = new Decimal(value)
  const number = decimal.toNumber()

  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: minFraction,
    maximumFractionDigits: minFraction,
  }).format(number)
}
