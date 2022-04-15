import { Box, Button, Center, ChakraProvider, FormControl, FormErrorMessage, FormHelperText, Heading, Image, Input, InputGroup, InputRightElement, Link, Text } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { FC, FormEvent, useState, MouseEvent, SetStateAction, Dispatch } from "react";
import ReactDOM from "react-dom";
import { Helper } from "../../helpers/helper";
import FormHelper from '../helpers/form_helper';

window.api.getAppUuid().then((uuid: string) => {
    axios.defaults.params = {}
    axios.defaults.params['app_uuid'] = uuid;
})

const SignUp: FC = () => {
    const [showUsernameScreen, setShowUsernameScree] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isButtonDisabled, setisButtonDisabled] = useState(false);
    const [isSigningUp, setIsIsSigningUp] = useState(false);

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
                <Box mt="75px" width="75%">
                    {
                        showUsernameScreen && <UsernameComp username={username} setUsername={setUsername} />
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
                    <Text 
                        fontSize="sm"
                        align="center"
                        mt="10px"
                        opacity="60%"
                        transition="all .15s ease"
                        color="gray.800"
                        _hover={{ opacity: '100%' }}
                    >
                        I already have an account. <Link onClick={openSignInWindow}>Bring me back!</Link>.
                    </Text> */}
                    <Center>
                    </Center>
                </Box>
            </Center>
        </ChakraProvider>
    )

    return render();
}

interface IUsernameProps {
    username: string,
    setUsername: Dispatch<SetStateAction<string>>
}

const UsernameComp: FC<IUsernameProps> = ({ username, setUsername }) => {
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [isUsernameGenerating, setIsUsernameGenerating] = useState(false);

    const handleInputChange = (e: FormEvent<HTMLInputElement>): void => {
        if (e.currentTarget) {
            const new_username = e.currentTarget.value.trim();
        }
    }

    const generateUsername = (e: MouseEvent<HTMLAnchorElement>) => {
        if (isUsernameGenerating) return;
        axios.get(Helper.buildRequestUrl('generate-username'))
        .then((res: AxiosResponse) => {
            if (res.data.length) {
                const username = document.getElementById('username');
                if (username) (username as HTMLInputElement).value = res.data;
            }
        })
        .catch((err: AxiosError) => {

        })
    }

    const checkUsername = () => {
        
    }

    const render = () => {
        return (
        <ChakraProvider>
            <Center>
            <FormControl isRequired isInvalid={isUsernameError}>
                <Input 
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => handleInputChange(e)} 
                    onKeyDown={(e) => FormHelper.handleFormKeySubmit(e, checkUsername)}
                    textAlign="center"
                />
                <FormErrorMessage>{ usernameErrorMessage }</FormErrorMessage>
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
                    leftIcon={
                        <Image src="./assets/arrow_nav_right.svg" alt="Arrow symbole" boxSize="25px" />
                    }
                >What's next?</Button>
            </Center>
        </ChakraProvider>
        );
    }

    return render();
}

ReactDOM.render(<SignUp />, document.getElementById('app'));