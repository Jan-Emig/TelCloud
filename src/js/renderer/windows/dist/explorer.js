"use strict";
exports.__esModule = true;
var react_1 = require("@chakra-ui/react");
var react_2 = require("react");
var react_dom_1 = require("react-dom");
/**
 * Explorer window for all uploaded files
 */
var Explorer = function () {
    var render = function () {
        return (react_2["default"].createElement(react_1.ChakraProvider, null,
            react_2["default"].createElement(ExplorerHeader, null)));
    };
    return render();
};
/**
* Header section of explorer window
*/
var ExplorerHeader = function (_a) {
    var _b = react_2.useState(false), isFriesMenuHover = _b[0], setIsFriesMenuHover = _b[1];
    var _c = react_2.useState(false), isMenuShown = _c[0], setIsMenuShown = _c[1];
    var burgerMenuRef = react_2.createRef();
    var render = function () {
        return (react_2["default"].createElement(react_2["default"].Fragment, null,
            react_2["default"].createElement(react_1.Box, { id: "header", padding: "20px", verticalAlign: "middle" },
                react_2["default"].createElement(react_1.Box, { float: "left", ml: "10px" },
                    react_2["default"].createElement(react_1.Image, { src: "./assets/telegram_brand.svg", alt: "Telegram", boxSize: "45px" })),
                react_2["default"].createElement(react_1.Box, { float: "right", mr: "50px" },
                    react_2["default"].createElement(react_1.Box, { ref: burgerMenuRef, id: "header-burger-menu", backgroundColor: "gray.100", borderRadius: "10px", width: "300px", height: "45px", boxShadow: "0px 0px 10px -6px rgba(0,0,0,0.25)", padding: "7px 10px 10px 10px" },
                        react_2["default"].createElement(react_1.HStack, { spacing: "10px", display: "inline-block", verticalAlign: "middle" },
                            react_2["default"].createElement(react_1.Input, { display: "inline-block", verticalAlign: "middle", width: "180px", height: "30px", placeholder: "Search file", backgroundColor: "white", fontSize: "sm", paddingLeft: "5px", paddingRight: "5px", border: "none", _focus: {
                                    border: "none"
                                } }),
                            react_2["default"].createElement(react_1.Button, { borderRadius: "full", colorScheme: "blue", padding: "2.5px", width: "25px", height: "25px", minWidth: "none" },
                                react_2["default"].createElement(react_1.Image, { src: "./assets/refresh_white.svg", alt: "Upload file", boxSize: "20px" })),
                            react_2["default"].createElement(react_1.Button, { borderRadius: "full", colorScheme: "blue", padding: "2.5px", width: "25px", height: "25px", minWidth: "none" },
                                react_2["default"].createElement(react_1.Image, { src: "./assets/upload_white.svg", alt: "Upload file", boxSize: "20px" })),
                            react_2["default"].createElement(react_1.VStack, { width: "20px", spacing: "4px", cursor: "pointer", display: "inline-flex", verticalAlign: "middle", transition: "all .15s ease", alignItems: "end", onMouseEnter: function () { return setIsFriesMenuHover(true); }, onMouseLeave: function () { return !isMenuShown && setIsFriesMenuHover(false); } },
                                react_2["default"].createElement(react_1.Box, { width: isFriesMenuHover ? "20px" : "15px", height: "3px", backgroundColor: "blue.500", borderRadius: "3px", transition: "all .15s ease" }),
                                react_2["default"].createElement(react_1.Box, { width: isFriesMenuHover ? "15px" : "20px", height: "3px", backgroundColor: "blue.500", borderRadius: "3px", transition: "all .15s ease" }),
                                react_2["default"].createElement(react_1.Box, { width: isFriesMenuHover ? "20px" : "15px", height: "3px", backgroundColor: "blue.500", borderRadius: "3px", transition: "all .15s ease" })))))),
            isMenuShown && react_2["default"].createElement(ExplorerHeaderMenu, null)));
    };
    return render();
};
var ExplorerHeaderMenu = function (_a) {
    var render = function () {
        return (react_2["default"].createElement(react_1.Box, { position: "absolute" }));
    };
    return render();
};
react_dom_1["default"].render(react_2["default"].createElement(Explorer, null), document.getElementById('app'));
