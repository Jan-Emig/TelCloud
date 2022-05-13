import { Box, Button, ChakraComponent, ChakraProvider, Container, HStack, Image, Input, VStack } from "@chakra-ui/react";
import React, { createRef, Ref, RefObject, useRef, useState } from "react";
import { FC } from "react";
import ReactDOM from "react-dom";

/**
 * Explorer window for all uploaded files
 */
const Explorer: FC = () => {
    const render = () => {
        return (
            <ChakraProvider>
                <ExplorerHeader />
            </ChakraProvider>
        )
    }

    return render();
}

/**
* Header section of explorer window
*/
const ExplorerHeader: FC = ({}) => {
    const [isFriesMenuHover, setIsFriesMenuHover] = useState(false);
    const [isMenuShown, setIsMenuShown] = useState(false);
    const burgerMenuRef = createRef<HTMLDivElement>();

    const render = () => {
        return (
            <>
                <Box
                    id="header"
                    padding="20px"
                    verticalAlign="middle"
                >
                    <Box float="left" ml="10px">
                        <Image src="./assets/telegram_brand.svg" alt="Telegram" boxSize="45px"></Image>
                    </Box>
                    <Box float="right" mr="50px">
                        <Box
                            ref={burgerMenuRef}
                            id="header-burger-menu"
                            backgroundColor="gray.100"
                            borderRadius="10px"
                            width="300px"
                            height="45px"
                            boxShadow="0px 0px 10px -6px rgba(0,0,0,0.25)"
                            padding="7px 10px 10px 10px"
                        >
                            <HStack spacing="10px" display="inline-block" verticalAlign="middle">
                                <Input
                                    display="inline-block"
                                    verticalAlign="middle"
                                    width="180px"
                                    height="30px"
                                    placeholder="Search file"
                                    backgroundColor="white"
                                    fontSize="sm"
                                    paddingLeft="5px"
                                    paddingRight="5px"
                                    border="none"
                                    _focus={{
                                        border:  "none"
                                    }}
                                />
                                <Button
                                    borderRadius="full"
                                    colorScheme="blue"
                                    padding="2.5px"
                                    width="25px"
                                    height="25px"
                                    minWidth="none"
                                >
                                    <Image src="./assets/refresh_white.svg" alt="Upload file" boxSize="20px" />
                                </Button>
                                <Button
                                    borderRadius="full"
                                    colorScheme="blue"
                                    padding="2.5px"
                                    width="25px"
                                    height="25px"
                                    minWidth="none"
                                >
                                    <Image src="./assets/upload_white.svg" alt="Upload file" boxSize="20px" />
                                </Button>
                                <VStack 
                                    width="20px"
                                    spacing="4px"
                                    cursor="pointer"
                                    display="inline-flex"
                                    verticalAlign="middle"
                                    transition="all .15s ease"
                                    alignItems="end"
                                    onMouseEnter={() => setIsFriesMenuHover(true)}
                                    onMouseLeave={() => !isMenuShown && setIsFriesMenuHover(false)}
                                >
                                    <Box
                                        width={isFriesMenuHover ? "20px" : "15px"}
                                        height="3px"
                                        backgroundColor="blue.500"
                                        borderRadius="3px"
                                        transition="all .15s ease"
                                    />
                                    <Box
                                        width={isFriesMenuHover ? "15px" : "20px"}
                                        height="3px"
                                        backgroundColor="blue.500"
                                        borderRadius="3px"
                                        transition="all .15s ease"
                                    />
                                    <Box
                                        width={isFriesMenuHover ? "20px" : "15px"}
                                        height="3px"
                                        backgroundColor="blue.500"
                                        borderRadius="3px"
                                        transition="all .15s ease"
                                    />
                                </VStack>
                            </HStack>
                        </Box>
                    </Box>
                </Box>
                {
                    isMenuShown && <ExplorerHeaderMenu />
                }
            </>
        );
    }

    return render();
}

/**
 * Menu for explorer's header section
 */

interface IExplorerHeaderMenu {
}

const ExplorerHeaderMenu: FC = ({ }) => {

    const render = () => {
        return (
            <Box
                position="absolute"
            >

            </Box>
        );
    }

    return render();
}




ReactDOM.render(
    <Explorer />,
    document.getElementById('app')
)