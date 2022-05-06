import { Alert, AlertIcon, Box, BoxProps, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { FC, Dispatch, SetStateAction } from "react";

type durationType = 3 | 5;

interface IMotionAlertProps {
    alertType: 'success' | 'error' | 'warning' | 'info',
    alertMessage: string,
    width: string,
    setShowElement: Dispatch<SetStateAction<boolean>>,
    duration?: durationType,
}

const MotionBox = motion<BoxProps>(Box);


/**
 * 
 * React component to display an animated alert.
 * 
 **/
const MotionAlert: FC<IMotionAlertProps> = ({ alertType, alertMessage, width, setShowElement, duration = 3 }) => {

    const getAnimationTimes = (duration: durationType): number[] => {
        switch(duration) {
            case 5:
                return [0, 0.1, 0.15, 0.85, 0.9, 1];
            default:
                return [0, 0.15, 0.2, 0.8, 0.85, 1];
        }
    }

    const render = () => {
        return (
        <Center>
            <MotionBox
                position='absolute'
                bottom="-60px"
                maxWidth={ width }
                dropShadow='sm'
                animate={{ bottom: ['-60px', '55px', '50px', '50px', '55px', '-60px'] }}
                wordBreak="break-word"
                textAlign="center"
                transition={{ duration: duration, times: getAnimationTimes(duration), ease: 'easeInOut' }}
                onAnimationComplete={() => setShowElement(false)}
            >
                <Alert 
                    status={ alertType }
                    rounded='md'
                >
                    <AlertIcon />
                    { alertMessage }
                </Alert>
            </MotionBox>
        </Center>
        );
    }

    return render();
}

export default MotionAlert;