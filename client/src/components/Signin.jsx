import Cookies from 'js-cookie';
import { Box, Flex, VStack, SimpleGrid, Text, Input, InputGroup, Img, Button, useTheme } from '@chakra-ui/react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {

    const theme = useTheme();

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const signIn = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        setLoading(true);

        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER}/user/login`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            let { token, message } = await response.json();

            if (!response.ok) {
                setError(message);
                setLoading(false);
                return;
            }

            const expires = new Date();
            expires.setDate(expires.getDate() + 30);

            if (token) {
                Cookies.set('session', token, { expires });
                window.location.reload();
            }

        } catch (error) {
            setError('Internal Server Error');
        }

        setLoading(false);

    }

    return (
        <Flex h={'100vh'}>

            <VStack w={['100%', '100%', '80%', '100%']}>

                <form onSubmit={signIn} onChange={() => setError('')}>
                    <SimpleGrid
                        w={['98%', 400, '100%', 400]} gap={6}
                        mt={['10vh', '10vh', '13vh', '13vh']} p={6}
                    >

                        <Box>
                            <Img src='/logo.png' h={12} display={['block', 'block', 'none', 'none']} />
                            <Text fontSize={32} fontWeight={600} > Signin </Text>
                            <Text mt={0} p={0} fontWeight={500} opacity={'70%'} fontSize={14}> Stay updated with your inventory </Text>
                        </Box>

                        <InputGroup>
                            <Input variant={'flushed'} size={'lg'} fontSize={16} type='email' name='email' placeholder='Email' _focusVisible={false} required />
                        </InputGroup>

                        <InputGroup>
                            <Input variant={'flushed'} size={'lg'} fontSize={16} type='password' name='password' placeholder='Password' _focusVisible={false} required />
                        </InputGroup>

                        <Box>
                            <Text
                                textAlign={'left'}
                                color={'red'}
                                fontSize={14}
                            >
                                {error}
                            </Text>

                            <Button isLoading={isLoading} w={'full'} type='submit' size={'lg'} my={4}> Signin </Button>
                        </Box>

                        <Text textAlign={'center'} fontSize={'14px'} fontWeight={400} > forgot password? <Link style={{ color: theme.colors.brand.accent }} to={'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=info@ashitservice.com'} target='_blank'> Contact Administration </Link> </Text>

                    </SimpleGrid>
                </form>
            </VStack>

            <VStack display={['none', 'none', 'flex', 'flex']} justifyContent={'center'} bgImage={'/bg.png'} bgRepeat={'no-repeat'} bgSize={'cover'} h={'full'} w={['100%', '100%', '100%', '80%']} borderBottomLeftRadius={200}>
                <Img src='/logo.png' h={32} />
                <Text fontSize={32} fontWeight={600} color={'#fff'} > Inventory </Text>
            </VStack>
        </Flex>
    )
}

export { Signin }
