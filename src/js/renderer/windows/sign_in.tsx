import { Box, Button, Center, ChakraProvider, FormControl, FormErrorMessage, Heading, Image, Input, InputGroup, InputRightElement, Link, Text } from '@chakra-ui/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { FC, FormEvent, KeyboardEvent, useEffect, useState, MouseEvent, ChangeEventHandler } from 'react';
import ReactDOM from 'react-dom';
import NetworkErrorDialog from '../comps/network_error_dialog';
import Helper from '../../helpers/global_helper';
import MotionAlert from '../comps/motion_alert';
import Lottie from 'react-lottie-player';
import FormHelper from '../helpers/form_helper';
import { ipcMain } from 'electron/main';

window.api.getAppUuid().then((uuid: string) => {
    axios.defaults.params = {}
    axios.defaults.params['app_uuid'] = uuid;
})

/**
 * 
 * Main overlay for signing into the main app
 * 
 */
const SignIn: FC = () => {
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [isUsernameError, setIsUsernameError] = useState<boolean>(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('User id is required.');
    const [password, setPassword] = useState<string>('');
    const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('Password is required.');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [hasInputChanged, setHasInputChanged] = useState<boolean>(false);
    const [heartCounter, setHeartCounter] = useState<number>(0);
    const [hasSignInFailed, setHasSignInFailed] = useState<boolean>(false);
    const [isSignInLimited, setisSignInLimited] = useState<boolean>(false);
    const [isButtonDisabled, setisButtonDisabled] = useState<boolean>(false);
    const [isNetworkError, setIsNetworkError] = useState<boolean>(false);
    const [isNetworkErrorDialogRequested, setIsNetworkErrorDialogRequested] = useState<boolean>(false);
    const [hasReconnected, setHasReconnected] = useState<boolean>(false);
    const [hasSignedUp, setHasSignedUp] = useState<boolean>(false);

    useEffect(() => {
        window.api.getUsername()
        .then((username: string) => {
            if (username) {
                const input = document.getElementById('username');
                if (input && !(input as HTMLInputElement).value) {
                    (input as HTMLInputElement).value = username;
                    setUsername(username);
                }
            }
        });

        window.api.getData('has-signed-up')
        .then((answ: any) => {
            if (answ === true) setHasSignedUp(true);
        })

    }, [])

    useEffect(() => {
        if (heartCounter != 0 && heartCounter % 5 === 0) {
            window.open('./zeta.html', '', 'width=430, height=541');
        }
    }, [heartCounter, setHeartCounter])

    const handleInputChange = (e: FormEvent<HTMLInputElement>, input_field: 'username' | 'password') => {
        const value = e.currentTarget.value.trim();
        if (!hasInputChanged) setHasInputChanged(true);

        if (input_field === 'password') {
            if (!value) {
                setPasswordErrorMessage('Password is required.');
                setIsPasswordError(true);
            } else setIsPasswordError(false);
            setPassword(value);
        }
        else if (input_field === 'username') {
            if (!value) {
                setUsernameErrorMessage('User id is required.');
                setIsUsernameError(true);
            } else setIsUsernameError(false);
            setUsername(value);
        }
    }


    const signIn = async () => {
        if (!isSigningIn && hasInputChanged && !isPasswordError && !isUsernameError && password && username) {

            if (!navigator.onLine) {
                // Abort process if no active internet connection could be detected
                setIsNetworkErrorDialogRequested(true);
                return;
            }

            setIsSigningIn(true);
            setisButtonDisabled(true);
            if (hasSignInFailed) setHasSignInFailed(false);

            axios.post(Helper.buildRequestUrl('signin'), { username, password})
            .then((res: AxiosResponse) => {
                const res_data = res.data;
                if (res_data?.s_token.length > 0 && res_data?.u_uuid.length > 0) {
                    window.api.signIn(res_data.s_token, res_data.u_uuid, res_data.username);
                }
            })
            .catch((err: AxiosError) => {
                const response = err.response;
                const password_input = document.getElementById('password');
                if (password_input) (password_input as HTMLInputElement).value = "";
                setPassword('');
                setIsPasswordError(true);
                
                if (response) {
                    if (isNetworkError) setIsNetworkError(false);
                    if (response.status === 401) {
                        if (response.data === 'wrong-password') {
                            setPasswordErrorMessage('???? Something appears to be odd with that password...Maybe a typo?');
                        } else setHasSignInFailed(true);
                    }
                    else if (response.status == 404) {
                        if (response.data === 'no-user') {
                            setIsUsernameError(true);
                            setUsernameErrorMessage('???? What?! We couldn\'t find any user with this name!');
                        } else setHasSignInFailed(true);
                    }
                    else if (response.status === 400) {
                        // Show server error message for each field, caused by invalid input values
                        // which should have been checked and reported by the client before the request
                        try {
                            if (response.data['username']) {
                                setIsUsernameError(true);
                                setUsernameErrorMessage(response.data['username']);
                            }
                            if (response.data['password']) {
                                setPasswordErrorMessage(response.data['password']);
                            } else throw new Error;
                        } catch (error: any) { setHasSignInFailed(true); }

                    } else if (response.status === 429) {
                        setisSignInLimited(true);
                    } else setHasSignInFailed(true);
                } else {
                    if (err.message === 'Network Error') setIsNetworkError(true);
                    else {
                        setHasSignInFailed(true);
                        if (isNetworkError) setIsNetworkError(false);
                    }
                }
                setIsSigningIn(false);
                setTimeout(() => setisButtonDisabled(false), 2000);
            });
            
        }
        else {
            if (!username) setIsUsernameError(true);
            if (!password) setIsPasswordError(true);
        }
    }

    const openSignUpWindow = (e: MouseEvent<HTMLAnchorElement>) => window.api.showSignUpWindow();

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
                        <FormControl isRequired isInvalid={isUsernameError}>
                            <Input 
                                id="username"
                                type="text"
                                placeholder="Username"
                                onChange={(e: any) => handleInputChange(e, 'username')} 
                                onKeyDown={(e: any) => FormHelper.handleFormKeySubmit(e, signIn)}
                            />
                            <FormErrorMessage>{ usernameErrorMessage }</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={isPasswordError} mt="20px">
                            <InputGroup>
                                <Input 
                                    id="password"
                                    type={(showPassword) ? 'text' : "password"}
                                    placeholder="Password"
                                    onChange={(e: any) => handleInputChange(e, 'password')}
                                    onKeyDown={(e: any) => FormHelper.handleFormKeySubmit(e, signIn)}
                                />
                                <InputRightElement>
                                    <Button height="30px" width="30px" mr="10px" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword
                                            ? <Image src="./assets/visibility_on_black.png" alt="Open eyes" width="25px" height="25px" maxWidth="none" />
                                            : <Image src="./assets/visibility_off_black.png" alt="Open eyes" width="25px" height="25px" maxWidth="none" />
                                        }
                                        
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{ passwordErrorMessage }</FormErrorMessage>
                        </FormControl>
                        <Center>
                            <Button
                                colorScheme="blue"
                                mt="40px"
                                leftIcon={
                                    <Image src="./assets/login.svg" alt="Log In symbole" boxSize="25px" />
                                }
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
                            display={(isNetworkError) ? 'block' : 'none'}
                        >Hmm, we couldn't establish a secure connection to our server ???? Is your internet up & running?</Text>
                        <Text
                            width="75%"
                            fontSize="sm"
                            align="center"
                            mt="5px"
                            ml="12.5%"
                            color="red.500"
                            display={(hasSignInFailed) ? 'block' : 'none'}
                        >Oh no ???? Something went wrong while signing you in. Please try again, we'll do better next time ???? !</Text>
                        <Text
                            width="75%"
                            fontSize="sm"
                            align="center"
                            mt="5px"
                            ml="12.5%"
                            color="red.500"
                            display={(isSignInLimited) ? 'block' : 'none'}
                        >That was hot ????! Please wait a moment until you try signing in again. We'll extinguish the button in the meantime...</Text>
                        <Text 
                            fontSize="sm"
                            align="center"
                            mt="10px"
                            opacity="60%"
                            transition="all .15s ease"
                            color="gray.800"
                            _hover={{ opacity: '100%' }}
                        >
                            No account yet? <Link onClick={openSignUpWindow}>Create one now</Link>.
                        </Text>
                    </Box>
                </Center>
                <Center position="absolute" bottom="15px" width='100%'>
                    <Heading 
                        size="xs"
                        opacity="30%"
                        userSelect="none"
                        transition="all .15s ease"
                        _hover={{ opacity: '100%' }}
                    >
                        Made with <Text display="inline" onClick={() => setHeartCounter(heartCounter + 1)}>????</Text>&nbsp;&nbsp;by <Link href="https://github.com/Jan-Emig" isExternal>Jan-Emig</Link>
                    </Heading>
                </Center>
                { 
                    isNetworkErrorDialogRequested && false && <NetworkErrorDialog setHasReconnected={setHasReconnected} setIsNetworkErrorDialogRequested={setIsNetworkErrorDialogRequested} />
                }
                { 
                    hasReconnected &&
                        <MotionAlert 
                            alertType='success'
                            alertMessage='Successfully reconnected. Fire on!' 
                            width='330px'
                            setShowElement={setHasReconnected}
                        /> 
                }
                {
                    hasSignedUp &&
                    <MotionAlert
                        alertType='success'
                        alertMessage='Successfully signed up. Welcome onboard ????'
                        width='400px'
                        setShowElement={setHasSignedUp}
                        duration={3}
                    />
                }
            </ChakraProvider>
        )
    }

    return render();
};

ReactDOM.render(
    <SignIn />,
    document.getElementById('app')
);  