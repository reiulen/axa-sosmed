import { ChakraProvider } from '@chakra-ui/react'
import { themeChakra } from '@/utils/chakraTheme'
import RouteApps from '@/routes/Index'
import AlertDialogConfirmation from './components/Alert/AlertDialogConfirmation'

function App() {
  return (
    <ChakraProvider>
      <ChakraProvider theme={themeChakra}>
        <RouteApps />
        <AlertDialogConfirmation />
      </ChakraProvider>
    </ChakraProvider>
  )
}

export default App
