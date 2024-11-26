import { notFound } from 'next/navigation'

export const handlePageRequestError = (error: any) => {
  if (
    error.code === '404' ||
    error?.response?.status === 404 ||
    error?.response?.data?.message === 'not found'
  ) {
    return notFound()
  }
  console.error(error) // eslint-disable-line no-console
  throw new Error('Internal Error')
}
