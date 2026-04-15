import { ChangeEvent, useEffect, useState } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'

import useStripeHook from '../hooks/useStripeHook'
import { Invoice } from '../types'
import InvoiceItemWrapper from './InvoiceItemWrapper'
import InvoiceListTableFooter from './InvoiceListTableFooter'
import InvoiceListTableHeader from './InvoiceListTableHeader'
import { InvoiceListTableProps } from './types'

const InvoiceListTable = ({
  title,
  titleProps,
  tableProps,
  headerProps,
  rowProps,
  cellProps,
  footerProps,
  onChange,
  entityId,
}: InvoiceListTableProps) => {
  const [page, setPage] = useState(1)

  const smDown = useResponsive('down', 'sm')
  const { useListInvoices } = useStripeHook()
  const { data, isLoading, isFetching } = useListInvoices({ page, entityId })

  useEffect(() => {
    setPage(1)
  }, [entityId])

  const receipts = data?.results ?? []
  const isResultsEmpty = receipts.length === 0
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h4" {...titleProps}>
        {title ?? 'Subscription Receipts'}
      </Typography>
      {isLoading ? (
        <CircularProgress sx={{ margin: 'auto' }} />
      ) : (
        <TableContainer>
          <Table {...tableProps}>
            <InvoiceListTableHeader smDown={smDown} {...headerProps} />
            <TableBody>
              {isFetching && (
                <TableRow>
                  <TableCell colSpan={smDown ? 3 : 5} sx={{ textAlign: 'center' }}>
                    <CircularProgress sx={{ margin: 'auto' }} />
                  </TableCell>
                </TableRow>
              )}
              {isResultsEmpty ? (
                <TableRow {...rowProps}>
                  <TableCell colSpan={smDown ? 3 : 5} sx={{ p: 4 }}>
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
            <InvoiceListTableFooter
              count={data?.count}
              page={page}
              onChange={(event: ChangeEvent<unknown>, pageNumber: number) => {
                setPage(pageNumber)
                onChange?.(event, pageNumber)
              }}
              footerProps={footerProps}
            />
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default InvoiceListTable
