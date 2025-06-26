import { TableCellProps, TableProps, TableRowProps, TypographyProps } from '@mui/material'

export interface InvoiceListTableProps {
  title?: string
  titleProps?: TypographyProps
  tableProps?: TableProps
  rowProps?: TableRowProps
  cellProps?: TableCellProps
}
