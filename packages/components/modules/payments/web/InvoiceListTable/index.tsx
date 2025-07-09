import { useState } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import {
  Box,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import useStripeHook from '../hooks/useStripeHook'
import { Invoice } from '../types'
import InvoiceItemWrapper from './components/InvoiceItemWrapper'
import { InvoiceListTableProps } from './types'

const InvoiceListTable = ({
  title,
  titleProps,
  tableProps,
  rowProps,
  cellProps,
}: InvoiceListTableProps) => {
  const [page, setPage] = useState(1)

  const smDown = useResponsive('down', 'sm')
  const { useListInvoices } = useStripeHook()
  const { data, isLoading, isFetching } = useListInvoices({ page })

  const receipts = data?.results || []

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h4" sx={{ p: 2 }} {...titleProps}>
        {title ?? 'Subscription Receipts'}
      </Typography>
      {isLoading ? (
        <CircularProgress sx={{ margin: 'auto' }} />
      ) : (
        <TableContainer>
          <Table {...tableProps}>
            <TableHead>
              {smDown ? (
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Info</TableCell>
                  <TableCell />
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {isFetching && <CircularProgress sx={{ margin: 'auto' }} />}
              {receipts.length === 0 ? (
                <TableRow {...rowProps}>
                  <TableCell colSpan={5} sx={{ p: 0, paddingX: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      No receipts found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                receipts.map((row: Invoice) => (
                  <InvoiceItemWrapper
                    key={row.id}
                    row={row}
                    rowProps={rowProps}
                    cellProps={cellProps}
                    smDown={smDown}
                  />
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5} sx={{ p: 0, paddingX: 2 }}>
                  <Box display="flex" justifyContent="flex-end" width="100%">
                    <Pagination
                      count={(data?.count ?? 0) / 10}
                      page={page}
                      onChange={(_, value) => setPage(value)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default InvoiceListTable
