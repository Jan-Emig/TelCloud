import { Box, Button, Center, ChakraProvider, FormControl, FormErrorMessage, Heading, Image, Input, Link, Text } from '@chakra-ui/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { FC, FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Helper } from './helpers/helper';

const SignIn: FC = () => {
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [isUserIdError, setIsUserIdError] = useState<boolean>(false);
    const [userIdErrorMessage, setUserIdErrorMessage] = useState<string>('User id is required.');
    const [userId, setUserId] = useState<string>('');
    const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('Password is required.');
    const [password, setPassword] = useState<string>('');
    const [hasInputChanged, setHasInputChanged] = useState<boolean>(false);
    const [heartCounter, setHeartCounter] = useState<number>(0);
    const [hasSignInFailed, setHasSignInFailed] = useState<boolean>(false);
    const [isButtonDisabled, setisButtonDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (heartCounter != 0 && heartCounter % 5 === 0) {
            window.open('./zeta.html', '', 'width=430, height=541');
        }
    }, [heartCounter, setHeartCounter])

    const handleInputChange = (e: FormEvent<HTMLInputElement>, input_field: string) => {
        const value = e.currentTarget.value.trim();
        if (!hasInputChanged) setHasInputChanged(true);

        if (input_field === 'password') {
            if (!value) {
                setPasswordErrorMessage('Password is required.');
                setIsPasswordError(true);
            } else setIsPasswordError(false);
            setPassword(value);
        }
        else if (input_field === 'user-id') {
            if (!value) {
                setUserIdErrorMessage('User id is required.');
                setIsUserIdError(true);
            } else setIsUserIdError(false);
            setUserId(value);
        }
    }


    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            e.currentTarget.blur();
            signIn();
        }
    }

    const signIn = async () => {
        if (!isSigningIn && hasInputChanged && !isPasswordError && !isUserIdError && password && userId) {
            setIsSigningIn(true);
            setisButtonDisabled(true);
            if (hasSignInFailed) setHasSignInFailed(false);

            axios.post(Helper.buildRequestUrl('signin'), { userId, password})
            .then((res: AxiosResponse) => {
                window.api.signIn();
            })
            .catch((err: AxiosError) => {
                const response = err.response;
                const password_input = document.getElementById('password');
                if (password_input) (password_input as HTMLInputElement).value = "";
                setPassword('');
                setIsPasswordError(true);
                
                if (response) {
                    if (response.status === 401) {
                        if (response.data === 'wrong-password') {
                            // setIsPasswordError(true);
                            setPasswordErrorMessage('😶 Something appears to be odd with that password...Maybe a typo?');
                        } else setHasSignInFailed(true);
                    }
                    else if (response.status == 404) {
                        if (response.data === 'no-user') {
                            setIsUserIdError(true);
                            setUserIdErrorMessage('🧐 What?! We could\'nt find any user with this id!');
                        } else setHasSignInFailed(true);
                    }
                    else if (response.status === 400) {
                        // Show server error message for each field, caused by invalid input values
                        // which should have been checked and reported by the client before the request
                        try {
                            if (response.data['userId']) {
                                setIsUserIdError(true);
                                setUserIdErrorMessage(response.data['userId']);
                            }
                            if (response.data['password']) {
                                // setIsPasswordError(true);
                                setPasswordErrorMessage(response.data['password']);
                            }
                        } catch (error: any) { setHasSignInFailed(true); }

                    } else setHasSignInFailed(true);
                }
                setIsSigningIn(false);
                setTimeout(() => setisButtonDisabled(false), 2000);
            });
            
        }
        else {
            if (!userId) setIsUserIdError(true);
            if (!password) setIsPasswordError(true);
        }
    }


    const render = () => {
        return (
            <ChakraProvider>
                <Box mt="10px">
                    <Center>
                        <Image src="./assets/telegram_brand.svg" alt="Telegram" boxSize="45px" mt="10px"></Image>
                    </Center>
                    <Center mt="10px">
                        <Heading>Sign In</Heading>
                    </Center>
                </Box>
                <Center>
                    <Box mt="50px" width="75%">
                        <FormControl isRequired isInvalid={isUserIdError}>
                            <Input 
                                id="user-id"
                                type="text"
                                placeholder="User ID"
                                onChange={(e) => handleInputChange(e, 'user-id')} 
                                onKeyDown={handleInputKeyDown}
                            />
                            <FormErrorMessage>{ userIdErrorMessage }</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={isPasswordError} mt="20px">
                            <Input 
                                id="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => handleInputChange(e, 'password')}
                                onKeyDown={handleInputKeyDown}
                            />
                            <FormErrorMessage>{ passwordErrorMessage }</FormErrorMessage>
                        </FormControl>
                        <Center>
                            <Button
                                colorScheme="blue"
                                mt="40px"
                                leftIcon={<Image src="./assets/login.svg" boxSize="20px" />}
                                loadingText="Searching for the light..."
                                isDisabled={isButtonDisabled}
                                isLoading={isSigningIn}
                                onClick={signIn}
                            >Ready to go!</Button>
                        </Center>
                        <Text
                            width="75%"
                            fontSize="sm"
                            align="center"
                            mt="5px"
                            ml="12.5%"
                            color="red.500"
                            display={(hasSignInFailed) ? 'block' : 'none'}
                        >Oh no 😥 Something went wrong while signing you in. Please try again, we’ll do better next time 😊 !</Text>
                        <Text 
                            fontSize="sm"
                            align="center"
                            mt="10px"
                            opacity="60%"
                            transition="all .15s ease"
                            _hover={{ opacity: '100%' }}
                        >
                            No account yet? <Link>Create one now</Link>.
                        </Text>
                    </Box>
                </Center>
                <Center position="absolute" bottom="15px" width='100%'>
                    <Heading 
                        size="xs"
                        opacity="30%"
                        userSelect="none"
                        _hover={{ opacity: '100%' }}
                    >
                        Made with <Text display="inline" onClick={() => setHeartCounter(heartCounter + 1)}>💙</Text>&nbsp;&nbsp;by <Link href="https://github.com/Jan-Emig" isExternal>Jan-Emig</Link>
                    </Heading>
                </Center>
            </ChakraProvider>
        )
    }

    return render();
};

ReactDOM.render(
    <SignIn />,
    document.getElementById('app')
);