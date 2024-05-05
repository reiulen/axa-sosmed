import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { themeChakra } from './utils/chakraTheme'

function App({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ChakraProvider>
        <ChakraProvider theme={themeChakra}>
          {children}
        </ChakraProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
