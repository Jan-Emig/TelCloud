import { Box, Button, ChakraComponent, ChakraProvider, Container, HStack, Image, Input, VStack, Text, Kbd } from "@chakra-ui/react";
import React, { createRef, Dispatch, MouseEventHandler, Ref, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
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

    const closeMenu = () => {
        const menu_elmnt = document.querySelector<HTMLDivElement>('#header-menu');
        if (menu_elmnt) menu_elmnt.style.opacity = "0";
        setTimeout(() => setIsMenuShown(false), 200);
    }

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
                                    onClick={() => !isMenuShown ? setIsMenuShown(true) : closeMenu()}
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
                    isMenuShown && <ExplorerHeaderMenu setIsMenuShown={setIsMenuShown} closeMenu={closeMenu} />
                }
            </>
        );
    }

    return render();
}

/**
 * Menu for explorer's header section
 */

type HeaderMenuItem = { icon: String, desc: String, shortcut?: string[], action?: Function, category?: 'danger' | 'warn', isLastCatItem?: boolean };

interface IExplorerHeaderMenu {
    setIsMenuShown: Dispatch<SetStateAction<boolean>>,
    closeMenu: { (): void },
}

const ExplorerHeaderMenu: FC<IExplorerHeaderMenu> = ({ setIsMenuShown, closeMenu }) => {
    const [menuOpacity, setMenuOpacity] = useState(0)

    const menu_items: HeaderMenuItem[] = [
        {
            icon: 'upload_gray_500.svg',
            desc: 'Upload file',
        },
        { 
            icon: 'new_folder_gray_500.svg',
            desc: 'New folder',
            isLastCatItem: true
        },
        {
            icon: 'sync_gray_500.svg',
            desc: 'Synchronize',
            isLastCatItem: true
        },
        {
            icon: 'change_user_gray_500.svg',
            desc: 'Change user',
            action: () => window.api.logOut()
        },
        {
            icon: 'logout_red_500.svg',
            desc: 'Quit TelCloud',
            category: 'danger',
            isLastCatItem: true,
            //TODO: Ask the user if he really wants to quit the app when there are active down- or uploads
            action: () => window.api.quitApp()
        }
    ]

    useEffect(() => {
        setMenuOpacity(1);
    }, [])

    const render = () => {
        const menu_elmnts: JSX.Element[] = [];
        menu_items.forEach((item: HeaderMenuItem, i: number) => {
        menu_elmnts.push(
            <Box 
                key={i}
                width="100%"
            >
                <Box
                    padding="0px 5px"
                    _hover={{
                        backgroundColor: "gray.200"
                    }}
                    cursor="pointer"
                    borderRadius="md"
                    onClick={() => {
                        if (item.action) {
                            item.action();
                            setIsMenuShown(false);
                        };
                    }}
                    >
                    <Image 
                        src={"./assets/" + item.icon}
                        boxSize="25px"
                        display="inline-block"
                        verticalAlign="middle"
                        mr="10px"
                        opacity={item.action ? 1 : 0.5}
                    />
                    <Text 
                        display="inline-block"
                        verticalAlign="middle"
                        color={item.category === "danger" ? "red.500" : undefined}
                        opacity={item.action ? 1 : 0.5}
                    >
                        { item.desc }
                        {
                            item.shortcut && item.shortcut.map((shortcut) => <Kbd>{ shortcut }</Kbd>)
                        }
                    </Text>
                </Box>
                    {
                        item.isLastCatItem &&
                        <Box height="2px" backgroundColor="gray.300" mt="0.5rem" />
                    }
            </Box>
        )
        })
        return (
            <Box
                id="header-menu"
                position="absolute"
                right="30px"
                top="80px"
                width="200px"
                padding="15px"
                backgroundColor="gray.100"
                borderRadius="md"
                boxShadow="sm"
                opacity={menuOpacity}
                transition="all .15s ease"
                onMouseLeave={() => closeMenu()}
            >
                <VStack
                    spacing={2}
                    alignItems="start"
                    align="left"
                >
                    {
                        menu_elmnts
                    }
                </VStack>
            </Box>
        );
    }

    return render();
}




ReactDOM.render(
    <Explorer />,
    document.getElementById('app')
)