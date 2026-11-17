import {
  formatInvoiceDescription,
  formatInvoiceLine,
  getInvoiceStatusLabel,
  truncateText,
} from '../InvoiceListTable/utils'

describe('formatInvoiceLine', () => {
  it('prefixes the quantity of a one-time purchase line', () => {
    expect(
      formatInvoiceLine({
        description: 'Coffee mug',
        amount: 3000,
        quantity: 2,
        type: 'invoiceitem',
      }),
    ).toBe('2 × Coffee mug')
  })

  it('keeps a subscription line, which Stripe already wrote with its quantity', () => {
    const description = '1 × Pro (at $10.00 / month)'
    expect(
      formatInvoiceLine({ description, amount: 1000, quantity: 1, type: 'subscription' }),
    ).toBe(description)
  })

  it('keeps a subscription line whose product has a unit label', () => {
    const description = '1 seat × Pro (at $10.00 / month)'
    expect(
      formatInvoiceLine({ description, amount: 1000, quantity: 1, type: 'subscription' }),
    ).toBe(description)
  })

  it('leaves a line without quantity as it is', () => {
    expect(formatInvoiceLine({ description: 'Proration', amount: 100 })).toBe('Proration')
  })
})

describe('formatInvoiceDescription', () => {
  it('lists every line of the invoice', () => {
    expect(
      formatInvoiceDescription([
        { description: 'QA One-time A', amount: 1000, quantity: 1 },
        { description: 'QA One-time B', amount: 900, quantity: 2 },
      ]),
    ).toBe('1 × QA One-time A, 2 × QA One-time B')
  })

  it('is empty without lines', () => {
    expect(formatInvoiceDescription(undefined)).toBe('')
    expect(formatInvoiceDescription([{ description: '', amount: 0 }])).toBe('')
  })
})

describe('truncateText', () => {
  it('keeps text within the limit', () => {
    expect(truncateText('short', 10)).toBe('short')
    expect(truncateText('exactly10!', 10)).toBe('exactly10!')
  })

  it('cuts longer text and ends it with an ellipsis', () => {
    expect(truncateText('1 × A, 2 × B, 3 × C', 12)).toBe('1 × A, 2 × B…')
    expect(truncateText('word and more', 5)).toBe('word…')
  })
})

describe('getInvoiceStatusLabel', () => {
  it('shows a void invoice as canceled', () => {
    expect(getInvoiceStatusLabel('void')).toBe('canceled')
  })

  it("keeps Stripe's other statuses", () => {
    expect(getInvoiceStatusLabel('paid')).toBe('paid')
    expect(getInvoiceStatusLabel('open')).toBe('open')
  })
})
