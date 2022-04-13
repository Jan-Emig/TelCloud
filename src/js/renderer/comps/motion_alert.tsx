import { Alert, AlertIcon, Box, BoxProps, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { FC, Dispatch, SetStateAction } from "react";

interface IMotionAlertProps {
    alertType: 'success' | 'error' | 'warning' | 'info',
    alertMessage: string,
    width: string,
    setShowElement: Dispatch<SetStateAction<boolean>>
}

const MotionBox = motion<BoxProps>(Box);


/**
 * 
 * React component to display an animated alert.
 * 
 **/
const MotionAlert: FC<IMotionAlertProps> = ({ alertType, alertMessage, width, setShowElement }) => {

    const render = () => {
        return (
        <Center>
            <MotionBox
                position='absolute'
                bottom="-60px"
                width={ width }
                dropShadow='sm'
                animate={{ bottom: ['-60px', '55px', '50px', '50px', '55px', '-60px'] }}
                transition={{ duration: 3, times: [0, 0.15, 0.2, 0.8, 0.85, 1], ease: 'easeInOut' }}
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