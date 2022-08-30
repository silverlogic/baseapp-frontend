import { QueryClient, QueryClientProvider } from 'react-query'

export default function MyApp({ Component, pageProps }: { Component: any; pageProps: object }) {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
