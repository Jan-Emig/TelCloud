import { Box, BoxProps, Button, Center, CenterProps, ChakraComponent, ChakraProvider, Container, FormControl, FormErrorMessage, FormHelperText, Heading, Image, Input, InputGroup, InputProps, InputRightElement, Link, Text } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { motion, VariantLabels } from "framer-motion";
import React, { FC, FormEvent, useState, MouseEvent, SetStateAction, Dispatch, KeyboardEvent, useEffect, createRef, useRef, RefObject, ChangeEvent } from "react";
import ReactDOM from "react-dom";
import { Helper } from "../../helpers/helper";
import FormHelper from '../helpers/form_helper';
import zxcvbn from 'zxcvbn';

window.api.getAppUuid().then((uuid: string) => {
    axios.defaults.params = {}
    axios.defaults.params['app_uuid'] = uuid;
})

type CompAnimationStates = 'initFadeIn' | 'fadeIn' | 'fadeOut' | 'fadeOut' | 'fadeBackOut' | undefined;

const MotionBox = motion<BoxProps>(Box);
const MotionInput = motion<InputProps>(Input);

const SignUp: FC = () => {
    const [showUsernameScreen] = useState(true);
    const [showPasswordScreen, setShowPasswordScreen] = useState(false);
    const [showConfirmPasswordScreen, setShowConfirmPasswordScreen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hasRequestFailed, setHasRequestFailed] = useState(false);
    const [isNetworkError, setIsNetworkError] = useState(false);
    const [usernameCompAnimation, setUsernameCompAnimation] = useState<CompAnimationStates>();
    const [passwordCompAnimation, setPasswordCompAnimation] = useState<CompAnimationStates>('initFadeIn');
    const [confirmPasswordCompAnimation, setConfirmPasswordCompAnimation] = useState<CompAnimationStates>('initFadeIn');

    const openSignInWindow = (): Promise<void> => window.api.showSignInWindow();

    // Submit the sign up form to create a new account
    // and redirect the user to the sign in page if the process was successfull.
    const submitForm = () => {
        axios.post(Helper.buildRequestUrl('sign-up'), { username: username, password: password })
        .then((res: AxiosResponse) => {
            if (res.status === 200 && res.data.length === 0) window.api.showSignInWindow(true);
        })
        .catch((err: AxiosError) => {
            console.log(err.message);
        })
    }

    const render = () => { 
        return(
        <ChakraProvider>
            <Box mt="10px">
                <Center>
                    <Image src="./assets/telegram_brand.svg" alt="Telegram" boxSize="45px" mt="10px"></Image>
                </Center>
                <Center mt="10px">
                    <Heading>Sign Up</Heading>
                </Center>
                <Text mt="15px" align="center" fontSize="14px" color="gray.700">You are just a few steps away from your<br />free, unlimited cloud service!</Text>
            </Box>
            <Center>
                <Box mt="45px" width="100%">
                    <Box position="relative" width="100%">
                        <Center>
                            {
                                showUsernameScreen && 
                                    <UsernameComp
                                        setShowPasswordScreen={setShowPasswordScreen}
                                        username={username}
                                        setUsername={setUsername}
                                        hasRequestFailed={hasRequestFailed}
                                        setHasRequestFailed={setHasRequestFailed}
                                        isNetworkError={isNetworkError}
                                        setIsNetworkError={setIsNetworkError}
                                        compAnimation={usernameCompAnimation}
                                        setCompAnimation={setUsernameCompAnimation}
                                        setPasswordCompAnimation={setPasswordCompAnimation}
                                    />
                            }
                            {
                                showPasswordScreen &&
                                    <PasswordComp
                                        setShowConfirmPasswordScreen={setShowConfirmPasswordScreen}
                                        password={password}
                                        setPassword={setPassword}
                                        compAnimation={passwordCompAnimation}   
                                        setCompAnimation={setPasswordCompAnimation}  
                                        setUsernameCompAnimation={setUsernameCompAnimation}   
                                        setConfirmPasswordCompAnimation={setConfirmPasswordCompAnimation}
                                    />
                            }
                            {
                                showConfirmPasswordScreen &&
                                <ConfirmPasswordComp
                                    comfPassword={confirmPassword}
                                    setComfPassword={setConfirmPassword}
                                    password={password}
                                    compAnimation={confirmPasswordCompAnimation}   
                                    setCompAnimation={setConfirmPasswordCompAnimation}                       
                                    setPasswordCompAnimation={setPasswordCompAnimation}
                                    submitForm={submitForm}
                                />
                            }
                        </Center>
                    </Box>
                    <Text
                        width="75%"
                        fontSize="sm"
                        align="center"
                        mt="180px"
                        ml="12.5%"
                        color="red.500"
                        display={(isNetworkError) ? 'block' : 'none'}
                    >Hmm, we couldn't establish a secure connection to our servers 🔌 &nbsp;Is your internet up & running?</Text>
                    <Text
                        width="75%"
                        fontSize="sm"
                        align="center"
                        mt="180px"
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
    setShowPasswordScreen: Dispatch<SetStateAction<boolean>>,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    hasRequestFailed: boolean,
    setHasRequestFailed: Dispatch<SetStateAction<boolean>>,
    isNetworkError: boolean,
    setIsNetworkError: Dispatch<SetStateAction<boolean>>,
    compAnimation: CompAnimationStates,
    setCompAnimation: Dispatch<SetStateAction<CompAnimationStates>>,
    setPasswordCompAnimation: Dispatch<SetStateAction<CompAnimationStates>>,
}

const UsernameComp: FC<IUsernameCompProps> = ({ setShowPasswordScreen, username, setUsername, hasRequestFailed, setHasRequestFailed, isNetworkError, setIsNetworkError, compAnimation, setCompAnimation, setPasswordCompAnimation }) => {
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [isUsernameGenerating, setIsUsernameGenerating] = useState(false);
    const [isUsernameFree, setIsUsernameFree] = useState<-1 | 0 | 1>(0);
    const [isRequestActive, setIsRequestActive] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        setIsButtonDisabled(isUsernameFree == -1 || isRequestActive);
    }, [isUsernameFree, isRequestActive])

    useEffect(() => {
        if (compAnimation === "fadeIn") setIsButtonDisabled(false);
    }, [compAnimation, setCompAnimation])

    const handleInputChange = (e: FormEvent<HTMLInputElement>): void => {
        setIsUsernameFree(0);
        if (!hasRequestFailed && !isNetworkError) setIsButtonDisabled(false);
        if (e.currentTarget) {
            setUsername(e.currentTarget.value.trim());
        }
    }

    // Request a generated username based upon english words and digits from the server
    const generateUsername = (e: MouseEvent<HTMLAnchorElement>): void => {
        if (isUsernameGenerating) return;
        setIsUsernameGenerating(true);
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
        .finally(() => {
            setIsUsernameGenerating(false);
        })
    }

    function submitUsername(e: KeyboardEvent<HTMLInputElement> | undefined = undefined): void {
        const initNextFormState = () => {
            setIsUsernameFree(1);
            setCompAnimation("fadeOut");
            setShowPasswordScreen(true);
            setPasswordCompAnimation('initFadeIn');
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
    setShowConfirmPasswordScreen: Dispatch<SetStateAction<boolean>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    compAnimation: CompAnimationStates,
    setCompAnimation: Dispatch<SetStateAction<CompAnimationStates>>,
    setUsernameCompAnimation: Dispatch<SetStateAction<CompAnimationStates>>,
    setConfirmPasswordCompAnimation: Dispatch<SetStateAction<CompAnimationStates>>,
}

const PasswordComp: FC<IPasswordCompProps> = ({ password, setPassword, setShowConfirmPasswordScreen, compAnimation, setCompAnimation, setUsernameCompAnimation, setConfirmPasswordCompAnimation }) => {
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState<-1|0|1>(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const passwordInput = createRef<HTMLInputElement>();

    useEffect(() => {
        setIsButtonDisabled(false);
    }, [compAnimation, setCompAnimation])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const pw = e.currentTarget.value;
        setPassword(pw);
        const { guesses_log10 } = zxcvbn(pw); // Calculate the password's strength on a scale from 1 to 4
        setPasswordStrength(Math.round(guesses_log10));
        if (isPasswordValid === -1) setIsPasswordValid(0);
    }

    const submitPassword = (e: KeyboardEvent<HTMLInputElement> | undefined = undefined): void => {
        if (password.length < 4) {
            setPasswordErrorMessage('Password must be at least 4 characters')
            setIsPasswordValid(-1);
        } else {
            e?.currentTarget.blur();
            setIsButtonDisabled(true);
            setIsPasswordValid(1);
            setCompAnimation("fadeOut");
            setConfirmPasswordCompAnimation('initFadeIn');
            setShowConfirmPasswordScreen(true);
        }
    }

    const goBackFunction = () => {
        setCompAnimation("fadeBackOut");
        setUsernameCompAnimation('fadeIn');
    }

    const render = () => {
        let pw_strength_msg = '';
        if (passwordStrength == 1 || (passwordStrength < 1 && password.length > 0)) pw_strength_msg = '😰 That\s quite a weak password, hm?';
        else if (passwordStrength == 2) pw_strength_msg = '😵‍💫 Any ideas for a stronger password?';
        else if (passwordStrength == 3) pw_strength_msg = '🤔 That\'s quite a good password';
        else if (passwordStrength >= 4) pw_strength_msg = 'Awesome password 😊'

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
                        fadeOut: { right: ['50%', '150%']},
                        fadeBackOut: { right: ['50%', '-150%']}
                    }}
                    animate={compAnimation}
                    onAnimationComplete={(() => (compAnimation === 'initFadeIn' || compAnimation === 'fadeIn') && passwordInput.current && passwordInput.current.focus())}
                    transition={{ duration: 0.5, ease: 'easeInOut', delay: (compAnimation == 'fadeOut' || compAnimation == 'initFadeIn') ? 0.5 : 0}}
                >
                    <Center>
                        <FormControl isRequired isInvalid={isPasswordValid === -1}>
                            <MotionInput 
                                id="password"
                                type="password"
                                position="relative"
                                textAlign="center"
                                placeholder="Password"
                                minLength={4}
                                onChange={(e) => handleInputChange(e)} 
                                onKeyDown={(e) => FormHelper.handleFormKeySubmit(e, submitPassword)}
                                animate={isPasswordValid === -1 ? { left: ['0px', '-20px', '20px', '-20px', '20px', '-20px', '0px'] } : undefined}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                ref={passwordInput}
                                borderColor={
                                    isPasswordValid == 1 
                                    ? 'green.500' 
                                    : (
                                        isPasswordValid === -1
                                        ? 'red.500'
                                        : undefined
                                    )
                                }
                                _hover={{
                                    'borderColor': (
                                        isPasswordValid == 1
                                        ? 'green.500'
                                        : (
                                            isPasswordValid == -1
                                            ? 'red.500'
                                            : undefined
                                        )
                                    ) 
                                }}
                            />
                            <Center>
                                <FormErrorMessage>{ passwordErrorMessage }</FormErrorMessage>
                            </Center>
                        </FormControl>
                    </Center>
                    <Center marginTop="10px" width="95%" marginLeft="50%" transform="translateX(-50%)">
                        <Box
                            display="inline-block"
                            width="25%"
                            height="10px"
                            background={passwordStrength >= 1 || (passwordStrength < 1 && password.length > 0) ? "linear-gradient(90deg, rgba(245,101,101,1) 20%, rgba(237,137,54,1) 100%)" : undefined}
                            border="1px"
                            borderRadius="5px 0 0 5px"
                            borderColor="gray.200"
                            transition="all .15s ease"
                        />
                        <Box
                            display="inline-block"
                            width="25%"
                            height="10px"
                            marginLeft="5px"
                            background={passwordStrength >= 2 ? "linear-gradient(90deg, rgba(237,137,54,1) 20%, rgba(236,201,75,1) 100%)" : undefined}
                            border="1px"
                            borderColor="gray.200"
                            transition="all .15s ease"
                        />
                        <Box
                            display="inline-block"
                            width="25%"
                            height="10px"
                            marginLeft="5px"
                            background={passwordStrength >= 3 ? "linear-gradient(90deg, rgba(236,201,75,1) 20%, rgba(72,187,120,1) 100%)" : undefined}
                            border="1px"
                            borderColor="gray.200"
                            transition="all .15s ease"
                        />
                        <Box
                            display="inline-block"
                            width="25%"
                            height="10px"
                            marginLeft="5px"
                            background={passwordStrength >= 4 ? "linear-gradient(90deg, rgba(72,187,120,1) 20%, rgba(47,133,90,1) 100%)" : undefined}
                            border="1px"
                            borderRadius="0px 5px 5px 0px"
                            borderColor="gray.200"
                            transition="all .15s ease"
                        />
                    </Center>
                    <Text mt="10px" color="gray.500" fontSize="small" align="center">{ pw_strength_msg }</Text>
                    <Center>
                        <Button
                            colorScheme="blue"
                            mt="40px"
                            leftIcon={<Image src="./assets/arrow_nav_right.svg" alt="Arrow symbole" boxSize="25px" />}
                            onClick={() => submitPassword()}
                            disabled={isButtonDisabled || isPasswordValid === -1}
                        >What's next?</Button>
                    </Center>
                    <Center>
                    <Link
                        opacity="0.5"
                        mt="10px"
                        fontSize="sm"
                        transition="all .15s ease"
                        _hover={{
                            'opacity': 1,
                            'color': 'gray.600'
                        }}
                        onClick={() => goBackFunction()}
                    >
                        Wait! I changed my mind 🥺
                    </Link>
                </Center>
                </MotionBox>
            </ChakraProvider>
        )
    }

    return render();
}

interface IConfirmPasswordCompProps {
    comfPassword: string,
    password: string,
    setComfPassword: Dispatch<SetStateAction<string>>,
    compAnimation: CompAnimationStates,
    setCompAnimation: Dispatch<SetStateAction<CompAnimationStates>>,
    setPasswordCompAnimation: Dispatch<SetStateAction<CompAnimationStates>>,
    submitForm: Function
}

const ConfirmPasswordComp: FC<IConfirmPasswordCompProps> = ({ password, comfPassword, setComfPassword, compAnimation, setCompAnimation, setPasswordCompAnimation, submitForm }) => {
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState<-1|0|1>(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const passwordInput = createRef<HTMLInputElement>();

    useEffect(() => {
        setIsButtonDisabled(false);
        setIsPasswordValid(0);
    }, [compAnimation, setCompAnimation])

    const goBackFunction = () => {
        setPasswordCompAnimation('fadeIn');
        setCompAnimation('fadeBackOut');
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const pw = e.currentTarget.value;
        setComfPassword(pw);
        if (isPasswordValid === -1) setIsPasswordValid(0);
    }

    const submitPassword = (e: KeyboardEvent<HTMLInputElement> | undefined = undefined): void => {
        if (password != comfPassword) {
            setPasswordErrorMessage('Passwords are not identical')
            setIsPasswordValid(-1);
        } else {
            e?.currentTarget.blur();
            setIsButtonDisabled(true);
            setIsPasswordValid(1);
            submitForm();
        }
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
                        fadeOut: { right: ['50%', '150%']},
                        fadeBackOut: { right: ['50%', '-150%']}
                    }}
                    animate={compAnimation}
                    onAnimationComplete={(() => (compAnimation === 'initFadeIn' || compAnimation === 'fadeIn') && passwordInput.current && passwordInput.current.focus())}
                    transition={{ duration: 0.5, ease: 'easeInOut', delay: (compAnimation == 'fadeOut' || compAnimation == 'initFadeIn') ? 0.5 : 0}}
                >
                    <Center>
                        <FormControl isRequired isInvalid={isPasswordValid === -1}>
                            <MotionInput 
                                id="confirm-password"
                                type="password"
                                position="relative"
                                textAlign="center"
                                placeholder="Confirm Password"
                                minLength={4}
                                onChange={(e) => handleInputChange(e)} 
                                onKeyDown={(e) => FormHelper.handleFormKeySubmit(e, submitPassword)}
                                animate={isPasswordValid === -1 ? { left: ['0px', '-20px', '20px', '-20px', '20px', '-20px', '0px'] } : undefined}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                ref={passwordInput}
                                borderColor={
                                    isPasswordValid == 1 
                                    ? 'green.500' 
                                    : (
                                        isPasswordValid === -1
                                        ? 'red.500'
                                        : undefined
                                    )
                                }
                                _hover={{
                                    'borderColor': (
                                        isPasswordValid == 1
                                        ? 'green.500'
                                        : (
                                            isPasswordValid == -1
                                            ? 'red.500'
                                            : undefined
                                        )
                                    ) 
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
                            leftIcon={<Image src="./assets/done_all_white.svg" alt="Done all symbole" boxSize="25px" />}
                            onClick={() => submitPassword()}
                            disabled={isButtonDisabled || isPasswordValid === -1}
                        >Call it a day</Button>
                    </Center>
                    <Center>
                        <Link
                            opacity="0.5"
                            mt="10px"
                            fontSize="sm"
                            transition="all .15s ease"
                            _hover={{
                                'opacity': 1,
                                'color': 'gray.600'
                            }}
                            onClick={() => goBackFunction()}
                        >
                            Hold on! I think I use another password 🙈
                        </Link>
                    </Center>
                </MotionBox>
            </ChakraProvider>
        )
    }

    return render();
}

ReactDOM.render(<SignUp />, document.getElementById('app'));