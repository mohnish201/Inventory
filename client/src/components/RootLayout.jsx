import { Box, Flex, Stack } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Toaster } from 'react-hot-toast';

const RootLayout = ({ children }) => {
    return (
        <Box h={'100vh'}>
            <Toaster />
            <Navbar />
            <Flex pt={14} h={'100vh'} >
                <Sidebar />
                <Stack w={'100%'} overflow={'auto'}>
                    {children}
                </Stack>

            </Flex>
        </Box>
    )
}


export { RootLayout };