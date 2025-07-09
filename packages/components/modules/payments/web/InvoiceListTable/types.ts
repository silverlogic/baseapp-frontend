import { TableCellProps, TableProps, TableRowProps, TypographyProps } from '@mui/material'

import { Invoice } from '../types'

export interface InvoiceListTableProps {
  title?: string
  titleProps?: TypographyProps
  tableProps?: TableProps
  rowProps?: TableRowProps
  cellProps?: TableCellProps
}

export interface InvoiceItemWrapperProps {
  row: Invoice
  rowProps?: TableRowProps
  cellProps?: TableCellProps
  smDown: boolean
}

export interface InvoiceItemTableRowProps {
  row: Invoice
  rowProps?: TableRowProps
  cellProps?: TableCellProps
  formattedDate: string
  amountDue: string
  color: string
}
