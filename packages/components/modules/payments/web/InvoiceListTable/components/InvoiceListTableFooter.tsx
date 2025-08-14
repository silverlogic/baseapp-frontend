import { Box, Pagination, TableCell, TableFooter, TableRow } from '@mui/material'

import { InvoiceListTableFooterProps } from '../types'

const InvoiceListTableFooter = ({
  count,
  page,
  onChange,
  footerProps,
}: InvoiceListTableFooterProps) => {
  const itemsPerPage = 30

  return (
    <TableFooter {...footerProps}>
      <TableRow>
        <TableCell colSpan={5} sx={{ p: 0, paddingX: 2 }}>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <Pagination
              count={(count ?? 0) / itemsPerPage}
              page={page}
              onChange={(event, value) => onChange?.(event, value)}
            />
          </Box>
        </TableCell>
      </TableRow>
    </TableFooter>
  )
}

export default InvoiceListTableFooter
