import { Box, BoxProps, Button, Center, CenterProps, ChakraComponent, ChakraProvider, FormControl, FormErrorMessage, FormHelperText, Heading, Image, Input, InputGroup, InputProps, InputRightElement, Link, Text } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { motion, VariantLabels } from "framer-motion";
import React, { FC, FormEvent, useState, MouseEvent, SetStateAction, Dispatch, KeyboardEvent, useEffect, createRef, useRef, RefObject } from "react";
import ReactDOM from "react-dom";
import { Helper } from "../../helpers/helper";
import FormHelper from '../helpers/form_helper';

window.api.getAppUuid().then((uuid: string) => {
    axios.defaults.params = {}
    axios.defaults.params['app_uuid'] = uuid;
})

const MotionBox = motion<BoxProps>(Box);
const MotionInput = motion<InputProps>(Input);
//* Currently, the username can not be stored as a react state within the main component
//* as the state is not accessible within the callbackfunction of the submit button
// const [username, setUsername] = useState('');

const SignUp: FC = () => {
    const [showUsernameScreen, setShowUsernameScreen] = useState(true);
    const [showPasswordScreen, setShowPasswordScreen] = useState(false);
    const [showConfirmPasswordScreen, setShowConfirmPasswordScreen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [hasRequestFailed, setHasRequestFailed] = useState(false);
    const [isNetworkError, setIsNetworkError] = useState(false);

    const openSignInWindow = () => window.api.showSignInWindow();

    const render = () => { return(
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
                <Box mt="45px" width="100%">
                    <Box position="relative" width="100%">
                        <Center>
                            {
                                showUsernameScreen && 
                                    <UsernameComp
                                        setShowUsernameScreen={setShowUsernameScreen}
                                        setShowPasswordScreen={setShowPasswordScreen}
                                        username={username}
                                        setUsername={setUsername}
                                        hasRequestFailed={hasRequestFailed}
                                        setHasRequestFailed={setHasRequestFailed}
                                        isNetworkError={isNetworkError}
                                        setIsNetworkError={setIsNetworkError}
                                    />
                            }
                            {
                                showPasswordScreen &&
                                    <PasswordComp
                                        setShowPasswordScreen={setShowPasswordScreen}
                                        setShowUsernameScreen={setShowUsernameScreen}
                                        setShowConfirmPasswordScreen={setShowConfirmPasswordScreen}
                                        password={password}
                                        setPassword={setPassword}
                                        hasRequestFailed={hasRequestFailed}
                                        setHasRequestFailed={setHasRequestFailed}
                                        isNetworkError={isNetworkError}
                                        setIsNetworkError={setIsNetworkError}
                                    />
                            }
                        </Center>
                    </Box>
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
    )}

    return render();
}

interface IUsernameCompProps {
    setShowUsernameScreen: Dispatch<SetStateAction<boolean>>,
    setShowPasswordScreen: Dispatch<SetStateAction<boolean>>
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    hasRequestFailed: boolean,
    setHasRequestFailed: Dispatch<SetStateAction<boolean>>,
    isNetworkError: boolean,
    setIsNetworkError: Dispatch<SetStateAction<boolean>>,
}

const UsernameComp: FC<IUsernameCompProps> = ({ setShowUsernameScreen, setShowPasswordScreen, username, setUsername, hasRequestFailed, setHasRequestFailed, isNetworkError, setIsNetworkError }) => {
    // const [isUsernameError, setIsUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [isUsernameGenerating, setIsUsernameGenerating] = useState(false);
    const [isUsernameFree, setIsUsernameFree] = useState<-1 | 0 | 1>(0);
    const [isRequestActive, setIsRequestActive] = useState(false);
    const [compAnimation, setCompAnimation] = useState<'fadeIn'|'fadeOut'|undefined>();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
                const username_input = document.querySelector<HTMLInputElement>('#username');
                if (username_input) {
                    username_input.value = res.data;
                    setUsername(res.data);
                    setIsUsernameFree(1);
                }
            }
        })
    }

    // function submitUsername(): void;
    function submitUsername(e: KeyboardEvent<HTMLInputElement> | undefined = undefined): void {
        const initNextFormState = () => {
            setIsUsernameFree(1);
            setCompAnimation("fadeOut");
            setShowPasswordScreen(true);
        };

        if (username.length) {
            setIsRequestActive(true);
            if (e) e.currentTarget.blur();
            axios.get(Helper.buildRequestUrl('check-username'), { params: { username: username } })
            .then((res: AxiosResponse) => initNextFormState())
            .catch((err: AxiosError) => {
                const response = err.response;
                if (response) {
                    let error_msg = '';
                    if (response.status === 400) error_msg = response.data['username'][0] ?? '';
                    else if (response.status === 409) {
                        error_msg = 'Oh no! This username is already in use 😭';
                    } else if (response.status === 500) setHasRequestFailed(true);
                    setIsUsernameFree(-1);
                    setUsernameErrorMessage(error_msg);
                } else if (err.message === 'Network Error') setIsNetworkError(true);
                setTimeout(() => setIsRequestActive(false), 2000);
            })
            if (isNetworkError) setIsNetworkError(false);
            if (hasRequestFailed) setHasRequestFailed(false);
        }
    }

    const render = () => {
        return (
        <ChakraProvider>
            <MotionBox 
                id="username_comp"
                top="0"
                right="50%"
                width="75%"
                transform="auto"
                translateX="50%"
                position="absolute"
                variants={{
                    fadeOut: { right: ['50%', '150%']},
                    fadeIn: { right: ['150%', '50%']}
                }}
                animate={compAnimation}
                transition={{ duration: 0.5, ease: 'easeInOut', delay: (compAnimation == 'fadeOut') ? 0.5 : 0}}
            >
                <Center>
                    <FormControl isRequired isInvalid={isUsernameFree == -1}>
                        <MotionInput 
                            id="username"
                            type="text"
                            position="relative"
                            textAlign="center"
                            placeholder="Username"
                            defaultValue={username}
                            onChange={(e) => handleInputChange(e)} 
                            onKeyDown={(e) => FormHelper.handleFormKeySubmit(e, submitUsername)}
                            animate={isUsernameFree === -1 ? { left: ['0px', '-20px', '20px', '-20px', '20px', '-20px', '0px'] } : undefined}
                            transition={{ duration: 0.5, delay: 0.1 }}
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
                            <FormErrorMessage>{ usernameErrorMessage }</FormErrorMessage>
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
                <Center>
                    <Button
                        colorScheme="blue"
                        mt="40px"
                        leftIcon={<Image src="./assets/arrow_nav_right.svg" alt="Arrow symbole" boxSize="25px" />}
                        onClick={(e) => submitUsername()}
                        disabled={isButtonDisabled}
                    >What's next?</Button>
                </Center>
            </MotionBox>
        </ChakraProvider>
        );
    }

    return render();
}

interface IPasswordCompProps {
    setShowPasswordScreen: Dispatch<SetStateAction<boolean>>,
    setShowUsernameScreen: Dispatch<SetStateAction<boolean>>,
    setShowConfirmPasswordScreen: Dispatch<SetStateAction<boolean>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    hasRequestFailed: boolean,
    setHasRequestFailed: Dispatch<SetStateAction<boolean>>,
    isNetworkError: boolean,
    setIsNetworkError: Dispatch<SetStateAction<boolean>>,
}

const PasswordComp: FC<IPasswordCompProps> = ({ password, setPassword, hasRequestFailed, setHasRequestFailed, isNetworkError, setIsNetworkError, setShowPasswordScreen, setShowUsernameScreen, setShowConfirmPasswordScreen}) => {
    const [compAnimation, setCompAnimation] = useState<'initFadeIn'|'fadeIn'|'fadeOut'|'fadeOut'|undefined>('initFadeIn');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState<-1|0|1>(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const submitPassword = (): void => {

    }

    const render = () => {
        return (
            <ChakraProvider>
                <MotionBox
                    id="password_comp"
                    top="0"
                    right="-150%"
                    width="75%"
                    transform="auto"
                    translateX="50%"
                    position="absolute"
                    variants={{
                        initFadeIn: { right: ['-150%', '50%']},
                        fadeIn: { right: ['150%', '50%'] },
                        fadeOut: { right: ['50%', '150%']}
                    }}
                    animate={compAnimation}
                    transition={{ duration: 0.5, ease: 'easeInOut', delay: (compAnimation == 'fadeOut' || compAnimation == 'initFadeIn') ? 0.5 : 0}}
                >
<Center>
                    <FormControl isRequired isInvalid={isPasswordValid === -1}>
                        <MotionInput 
                            id="username"
                            type="text"
                            position="relative"
                            textAlign="center"
                            placeholder="Username"
                            defaultValue={password}
                            // onChange={(e) => handleInputChange(e)} 
                            onKeyDown={(e) => FormHelper.handleFormKeySubmit(e, submitPassword)}
                            // animate={isUsernameFree === -1 ? { left: ['0px', '-20px', '20px', '-20px', '20px', '-20px', '0px'] } : undefined}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            // borderColor={
                            //     isUsernameFree == 1 
                            //     ? 'green.500' 
                            //     : (
                            //         isUsernameFree === -1
                            //         ? 'red.500'
                            //         : undefined
                            //     )
                            // }
                            _hover={{
                                // 'borderColor': (
                                //     isUsernameFree == 1
                                //     ? 'green.500'
                                //     : (
                                //         isUsernameFree == -1
                                //         ? 'red.500'
                                //         : undefined
                                //     )
                                // ) 
                            }}
                        />
                        <Center>
                            <FormErrorMessage>{ passwordErrorMessage }</FormErrorMessage>
                        </Center>
                    </FormControl>
                </Center>
                <Center>
                    <Button
                        colorScheme="blue"
                        mt="40px"
                        leftIcon={<Image src="./assets/arrow_nav_right.svg" alt="Arrow symbole" boxSize="25px" />}
                        onClick={(e) => submitPassword()}
                        disabled={isButtonDisabled}
                    >What's next?</Button>
                </Center>
                </MotionBox>
            </ChakraProvider>
        )
    }

    return render();
}
ReactDOM.render(<SignUp />, document.getElementById('app'));