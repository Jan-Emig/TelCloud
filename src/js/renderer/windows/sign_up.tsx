import { Box, Button, Center, ChakraProvider, FormControl, FormErrorMessage, FormHelperText, Heading, Image, Input, InputGroup, InputRightElement, Link, Text } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { FC, FormEvent, useState, MouseEvent, SetStateAction, Dispatch, KeyboardEvent, useEffect } from "react";
import ReactDOM from "react-dom";
import { Helper } from "../../helpers/helper";
import FormHelper from '../helpers/form_helper';

window.api.getAppUuid().then((uuid: string) => {
    axios.defaults.params = {}
    axios.defaults.params['app_uuid'] = uuid;
})

const SignUp: FC = () => {
    const [showUsernameScreen, setShowUsernameScreen] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isSigningUp, setIsIsSigningUp] = useState(false);
    const [hasRequestFailed, setHasRequestFailed] = useState(false);
    const [isNetworkError, setIsNetworkError] = useState(false);
    const [buttonIcon, setButtonIcon] = useState(<></>);
    const [buttonText, setButtonText] = useState('What\'s next?');
    const [buttonAction, setButtonAction] = useState<{(): void}>();

    const handleInputChange = (e: FormEvent<HTMLInputElement>, input_field: 'username' | 'password' | 'confirm_password') => {

    }

    const signUp = () => {

    }

    const openSignInWindow = () => {}

    const render = () => (
        <ChakraProvider>
            <Box mt="10px">
                <Center>
                    <Image src="./assets/telegram_brand.svg" alt="Telegram" boxSize="45px" mt="10px"></Image>
                </Center>
                <Center mt="10px">
                    <Heading>Sign Up</Heading>
                </Center>
                <Text mt="15px" align="center" fontSize="14px" color="gray.700">You are just one step away from your<br />free, unlimited cloud service!</Text>
            </Box>
            <Center>
                <Box mt="45px" width="75%">
                    {
                        showUsernameScreen && 
                            <UsernameComp
                                setShowUsernameScreen={setShowUsernameScreen}
                                username={username}
                                setUsername={setUsername}
                                hasRequestFailed={hasRequestFailed}
                                setHasRequestFailed={setHasRequestFailed}
                                isNetworkError={isNetworkError}
                                setIsNetworkError={setIsNetworkError}
                                setButtonText={setButtonText}
                                setButtonIcon={setButtonIcon}
                                setIsButtonDisabled={setIsButtonDisabled}
                                setButtonAction={setButtonAction}
                            />
                    }
                    {/* <FormControl isRequired isInvalid={isPasswordError} mt="20px">
                        <InputGroup>
                            <Input 
                                id="password"
                                type={(showPassword) ? 'text' : "password"}
                                placeholder="Password"
                                onChange={(e) => handleInputChange(e, 'password')}
                                onKeyDown={(e) => FormHelper.handleFormKeySubmit(e, signUp)}
                            />
                            <InputRightElement>
                                <Button onClick={() => setShowPassword(!showPassword)}>
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
                    <FormControl isRequired isInvalid={isPasswordError} mt="20px">
                    <InputGroup>
                        <Input 
                            id="confirm_password"
                            type={(showConfirmPassword) ? 'text' : "password"}
                            placeholder="Confirm Password"
                            onChange={(e) => handleInputChange(e, 'confirm_password')}
                            onKeyDown={(e) => FormHelper.handleFormKeySubmit(e, signUp)}
                        />
                        <InputRightElement>
                            <Button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {
                                    showConfirmPassword
                                    ? <Image src="./assets/visibility_on_black.png" alt="Open eyes" width="25px" height="25px" maxWidth="none" />
                                    : <Image src="./assets/visibility_off_black.png" alt="Open eyes" width="25px" height="25px" maxWidth="none" />
                                }
                                
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{ confirmPasswordErrorMessage }</FormErrorMessage>
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
                            isLoading={isSigningUp}
                            onClick={signUp}
                        >Ready to go!</Button>
                    </Center>
                     */}
                     <Center>
                        <Button
                            colorScheme="blue"
                            mt="40px"
                            leftIcon={buttonIcon}
                            onClick={() => buttonAction}
                            disabled={isButtonDisabled}
                        >{buttonText}</Button>
                     </Center>
                    <Text
                        width="75%"
                        fontSize="sm"
                        align="center"
                        mt="5px"
                        ml="12.5%"
                        color="red.500"
                        display={(isNetworkError) ? 'block' : 'none'}
                    >Hmm, we couldn't establish a secure connection to our servers 🔌 &nbsp;Is your internet up & running?</Text>
                    <Text
                        width="75%"
                        fontSize="sm"
                        align="center"
                        mt="5px"
                        ml="12.5%"
                        color="red.500"
                        display={(hasRequestFailed) ? 'block' : 'none'}
                    >Oh no 😥 Something went wrong while signing you in. Please try again, we'll do better next time 😊 !</Text>
                </Box>
            </Center>
            <Center>
                <Text 
                    position="absolute"
                    bottom="10px"
                    fontSize="sm"
                    align="center"
                    mt="10px"
                    transition="all .15s ease"
                    color="gray.500"
                    background="white"
                    _hover={{ color: 'gray.800' }}
                >
                    I already have an account. <Link onClick={openSignInWindow}>Bring me back!</Link>
                </Text>
            </Center>
        </ChakraProvider>
    )

    return render();
}

interface IUsernameProps {
    setShowUsernameScreen: Dispatch<SetStateAction<boolean>>,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    hasRequestFailed: boolean,
    setHasRequestFailed: Dispatch<SetStateAction<boolean>>,
    isNetworkError: boolean,
    setIsNetworkError: Dispatch<SetStateAction<boolean>>,
    setButtonText: Dispatch<SetStateAction<string>>,
    setButtonIcon: Dispatch<SetStateAction<JSX.Element>>,
    setIsButtonDisabled: Dispatch<SetStateAction<boolean>>,
    setButtonAction: Dispatch<SetStateAction<{(): void} | undefined>>,
}

const UsernameComp: FC<IUsernameProps> = ({ setShowUsernameScreen, username, setUsername, hasRequestFailed, setHasRequestFailed, isNetworkError, setIsNetworkError, setButtonText, setButtonIcon, setIsButtonDisabled, setButtonAction }) => {
    // const [isUsernameError, setIsUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [isUsernameGenerating, setIsUsernameGenerating] = useState(false);
    const [isUsernameFree, setIsUsernameFree] = useState<-1 | 0 | 1>(0);
    const [isRequestActive, setIsRequestActive] = useState(false);

    useEffect(() => {
        setButtonIcon(<Image src="./assets/arrow_nav_right.svg" alt="Arrow symbole" boxSize="25px" />);
        setButtonText('What\s next?');
        setButtonAction(submitUsername);
    }, [])

    useEffect(() => {
        setIsButtonDisabled(isUsernameFree == -1 || isRequestActive);
    }, [isUsernameFree, isRequestActive])

    const handleInputChange = (e: FormEvent<HTMLInputElement>): void => {
        setIsUsernameFree(0);
        if (!hasRequestFailed && !isNetworkError) setIsButtonDisabled(false);
        if (e.currentTarget) {
            setUsername(e.currentTarget.value.trim());
        }
    }

    const generateUsername = (e: MouseEvent<HTMLAnchorElement>) => {
        if (isUsernameGenerating) return;
        axios.get(Helper.buildRequestUrl('generate-username'))
        .then((res: AxiosResponse) => {
            if (res.data.length) {
                const username = document.getElementById('username');
                if (username) (username as HTMLInputElement).value = res.data;
                setIsUsernameFree(1);
            }
        })
    }

    function submitUsername(): void;
    function submitUsername(e: KeyboardEvent<HTMLInputElement> | undefined = undefined): void {
        if (username.length) {
            setIsRequestActive(true);
            if (e) e.currentTarget.blur();
            axios.get(Helper.buildRequestUrl('check-username'), { params: { username: username } })
            .then((res: AxiosResponse) => {
                setIsUsernameFree(1);
                setIsRequestActive(false);
                fadeCompOut();
            })
            .catch((err: AxiosError) => {
                const response = err.response;
                if (response) {
                    let error_msg = '';
                    switch (response.status) {
                        case 404:
                            error_msg = '🧐 Hmm...are you sure you entered an username?';
                            break;
                        case 409:
                            error_msg = 'Oh no! This username is already in use 😭';
                            setIsUsernameFree(-1);
                            break;
                        case 500:
                            setHasRequestFailed(true);
                    }
                    setUsernameErrorMessage(error_msg);
                } else if (err.message === 'Network Error') setIsNetworkError(true);
                setTimeout(() => setIsRequestActive(false), 2000);
            })
            if (isNetworkError) setIsNetworkError(false);
            if (hasRequestFailed) setHasRequestFailed(false);
        }
    }

    const fadeCompOut = () => {
        setShowUsernameScreen(false);
    }

    const render = () => {
        return (
        <ChakraProvider>
            <Center>
            <FormControl isRequired isInvalid={isUsernameFree == -1}>
                <Input 
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => handleInputChange(e)} 
                    onKeyDown={(e) => FormHelper.handleFormKeySubmit(e, submitUsername)}
                    textAlign="center"
                    borderColor={
                        isUsernameFree == 1 
                        ? 'green.500' 
                        : (
                            isUsernameFree === -1
                            ? 'red.500'
                            : undefined
                        )
                    }
                    _hover={{
                         'borderColor': (
                             isUsernameFree == 1
                             ? 'green.500'
                             : (
                                 isUsernameFree == -1
                                 ? 'red.500'
                                 : undefined
                             )
                        ) 
                    }}
                />
                <Center>
                    <FormErrorMessage textAlign="center">{ usernameErrorMessage }</FormErrorMessage>
                </Center>
                <FormHelperText textAlign="center">
                    No idea?&nbsp;
                    <Link
                        opacity={isUsernameGenerating ? 0.5 : undefined}
                        onClick={generateUsername}
                    >Generate a username</Link>
                    </FormHelperText>
            </FormControl>      
            </Center>
        </ChakraProvider>
        );
    }

    return render();
}

ReactDOM.render(<SignUp />, document.getElementById('app'));