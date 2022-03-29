import { Box, Center, ChakraProvider, Container, Heading, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';

const Zeta: FC = () => {

    const render = () => {
        return (
            <ChakraProvider>
                <Container width="430px" height="541px" background="gray.700" color="gray.500">
                    <Center>
                        <Heading size="xl" mt="70px">ZETA</Heading>
                    </Center>
                    <Center width="75%" ml="12.5%">
                        <Heading size="sm" as="p" mt="55px" style={{ textAlign:"center" }} >“In the light, we read the inventions of others; in the darkness we invent our own stories.”</Heading>
                    </Center>
                    <Center>
                        <Text opacity="75%">-Alberto Manguel</Text>
                    </Center>
                </Container>
            </ChakraProvider>
        );
    }

    return render();
}

ReactDOM.render(<Zeta />, document.getElementById('app'));