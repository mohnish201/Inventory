import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../configs/theme.config';

const ChakraUiProvider = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            {children}
        </ChakraProvider>
    )
}


export default ChakraUiProvider;