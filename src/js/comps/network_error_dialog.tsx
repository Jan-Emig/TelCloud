import React, { createRef, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ChakraProvider, Image, useDisclosure } from '@chakra-ui/react';
import * as wifiAnimation from '../../json/wifi_lottie.json';
import Lottie from 'react-lottie-player';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Helper } from '../helpers/helper';

interface INetworkErrorDialog {
    setHasReconnected: Dispatch<SetStateAction<boolean>>
}

/**
 * 
 * React component for notifying the user
 * about the network connection failure (no internet connection)
 */
const NetworkErrorDialog: FC<INetworkErrorDialog> = ({ setHasReconnected }) => {
    const {isOpen, onOpen, onClose } = useDisclosure();
    const [isReconnectDisabled, setIsReconnectDisabled] = useState<boolean>(false);
    const [isReconnecting, setIsReconnecting] = useState<boolean>(false);
    const [isButtonHover, setIsButtonHover] = useState<boolean>(false);
    const cancelRef = createRef<HTMLButtonElement>();

    useEffect(() => {
        onOpen();
    }, [])

    const reconnect = async() => {
        setIsReconnectDisabled(true);
        setIsReconnecting(true);

        let idx = 0;
        const max_attempts = 10;
        
        const reconnect_interval = setInterval(() => {
            // Stop reconnecting if it's already failed five times in a row
            if (idx++ >= max_attempts) {
                clearInterval(reconnect_interval);
                setIsReconnecting(false);
                setTimeout(() => setIsReconnectDisabled(false), (idx === max_attempts + 1) ? 5000 : 2000);
                return;
            }

            if (navigator.onLine) {
                axios.get(
                    Helper.buildRequestUrl('ping'),
                    { validateStatus: (status: number) => status === 200 }
                )
                .then((res: AxiosResponse) => {
                    if (res.data === 'pong') {
                        idx = max_attempts + 1;
                        setHasReconnected(true);
                        onClose();
                    }
                })
                .catch((err: AxiosError) => {
                    const response = err.response;
                    if (response && response.status === 429) idx = max_attempts + 1;
                })
            }
        }, 1500);
    }

    const render = () => {
        return (
            <ChakraProvider>
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={() => {}}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader>🥹 H-Hello world? (Network Error)</AlertDialogHeader>
                        <AlertDialogBody>
                            Hmm...we couldn't establish a connection to our servers. Do you have internet access? 😱
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme="red">Exit App</Button>
                            <Button 
                                ref={cancelRef}
                                onClick={reconnect}
                                disabled={isReconnectDisabled}
                                isLoading={isReconnecting}
                                loadingText={'Reconnecting'}
                                ml='3'
                                onMouseEnter={() => setIsButtonHover(true)}
                                onMouseLeave={() => setIsButtonHover(false)}
                            >
                                <Lottie
                                    loop
                                    animationData={wifiAnimation}
                                    play={isButtonHover}
                                    style={{ width: '35px', height: '35px' }}
                                />
                                Reconnect
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </ChakraProvider>
        )
    }

    return render();
}

export default NetworkErrorDialog;