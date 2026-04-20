const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

export const formatCurrencyInr = (value) => {
  if (!Number.isFinite(value)) {
    return inrFormatter.format(0)
  }

  return inrFormatter.format(value)
}
