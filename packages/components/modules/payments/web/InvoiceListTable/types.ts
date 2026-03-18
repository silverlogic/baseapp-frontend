import { ChangeEvent } from 'react'

import {
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TypographyProps,
} from '@mui/material'

import { Invoice } from '../types'

export interface InvoiceListTableProps {
  title?: string
  titleProps?: TypographyProps
  tableProps?: TableProps
  rowProps?: TableRowProps
  cellProps?: TableCellProps
  headerProps?: TableHeadProps
  footerProps?: TableFooterProps
  entityId?: string
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
  color: 'success' | 'error' | 'warning'
}

export interface InvoiceListTableFooterProps {
  count?: number
  page: number
  onChange?: (event: ChangeEvent<unknown>, page: number) => void
  footerProps?: TableFooterProps
}

export interface InvoiceListTableHeaderProps {
  smDown: boolean
  headerProps?: TableHeadProps
}
