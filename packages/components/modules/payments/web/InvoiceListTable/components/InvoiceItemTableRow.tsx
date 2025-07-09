import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Chip, IconButton, TableCell, TableRow, Typography } from '@mui/material'

import { InvoiceItemTableRowProps } from '../types'

const InvoiceItemTableRow = ({
  row,
  rowProps,
  cellProps,
  formattedDate,
  amountDue,
  color,
}: InvoiceItemTableRowProps) => (
  <TableRow key={row.id} {...rowProps}>
    <TableCell {...cellProps}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {row.lines?.[0]?.description ?? ''}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formattedDate}
        </Typography>
      </Box>
    </TableCell>
    <TableCell {...cellProps}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'flex-end',
        }}
      >
        <Chip label={row.status} color={color} variant="soft" size="small" />
        <Typography variant="body2">{amountDue ? `$${amountDue}` : '-'}</Typography>
      </Box>
    </TableCell>
    <TableCell {...cellProps}>
      <IconButton
        onClick={() => {
          window.open(row.hostedInvoiceUrl, '_blank')
        }}
        disabled={!row.hostedInvoiceUrl}
      >
        <ChevronIcon position="right" />
      </IconButton>
    </TableCell>
  </TableRow>
)

export default InvoiceItemTableRow
