import { AlertTitle, ChakraProvider, Text } from "@chakra-ui/react";
import React from "react";
import { FC } from "react";
import ReactDOM from "react-dom";

/**
 * Explorer window for all uploaded files
 */
const Explorer: FC = () => {
    const render = () => {
        return (
            <ChakraProvider>
                <Text>Hello world!</Text>
            </ChakraProvider>
        )
    }

    return render();
}

ReactDOM.render(
    <Explorer />,
    document.getElementById('app')
)