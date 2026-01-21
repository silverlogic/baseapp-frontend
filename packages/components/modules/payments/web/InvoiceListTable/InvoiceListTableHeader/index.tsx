import { TableCell, TableHead, TableRow } from '@mui/material'

import { InvoiceListTableHeaderProps } from '../types'

const InvoiceListTableHeader = ({ smDown, headerProps }: InvoiceListTableHeaderProps) => {
  if (smDown) {
    return (
      <TableHead {...headerProps}>
        <TableRow>
          <TableCell>Description</TableCell>
          <TableCell>Info</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
    )
  }

  return (
    <TableHead {...headerProps}>
      <TableRow>
        <TableCell>Description</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Details</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default InvoiceListTableHeader
