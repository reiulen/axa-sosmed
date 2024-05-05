import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { themeChakra } from '@/utils/chakraTheme'
import RouteApps from '@/routes/Index'
import '@/styles/app.css'

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ChakraProvider>
        <ChakraProvider theme={themeChakra}>
          <RouteApps />
        </ChakraProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
