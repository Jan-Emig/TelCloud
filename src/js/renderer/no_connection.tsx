import { Box, Center, ChakraProvider, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';

/**
 * 
 * Main overlay at the startup of the app if
 * no internet connection could be detected.
 * 
 **/
const NoConnection: FC = () => {

    const render = () => (
        <ChakraProvider>
            <Box mt="10px">
                <Center>
                    <Image src="./assets/telegram_brand.svg" alt="Telegram" boxSize="45px" mt="10px"></Image>
                </Center>
            </Box>
            <Box mt="30px">
                <Center>
                    <Image src="./assets/no_connection.svg" alt="No Connection Image" boxSize="275px"></Image>
                </Center>
                <Center mt="10px">
                    <Heading size="2xl" color="gray.600">Oh no!</Heading>
                </Center>
                <Center>
                    <Text width="250px" align="center" color="gray.500">We could not establish a connection to our servers 😥</Text>
                </Center>
                <Center mt="25px">
                    <Spinner color="gray.500" />
                </Center>
            </Box>
        </ChakraProvider>
    )

    return render();
}


ReactDOM.render(
    <NoConnection />,
    document.getElementById('app')
);