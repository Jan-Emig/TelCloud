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
    var render = function () {
        return (react_2["default"].createElement(react_2["default"].Fragment, null,
            react_2["default"].createElement(react_1.Box, { id: "header", padding: "20px", verticalAlign: "middle" },
                react_2["default"].createElement(react_1.Box, { float: "left", ml: "10px" },
                    react_2["default"].createElement(react_1.Image, { src: "./assets/telegram_brand.svg", alt: "Telegram", boxSize: "45px" })),
                react_2["default"].createElement(react_1.Box, { float: "right", mr: "50px" },
                    react_2["default"].createElement(react_1.Box, { id: "header-burger-menu", backgroundColor: "gray.100", borderRadius: "10px", width: "300px", height: "45px", boxShadow: "0px 0px 10px -6px rgba(0,0,0,0.25)", padding: "7px 10px 10px 10px" },
                        react_2["default"].createElement(react_1.HStack, { spacing: "10px", display: "inline-block", verticalAlign: "middle" },
                            react_2["default"].createElement(react_1.Input, { display: "inline-block", verticalAlign: "middle", width: "180px", height: "30px", placeholder: "Search file", backgroundColor: "white", fontSize: "sm", paddingLeft: "5px", paddingRight: "5px", border: "none", _focus: {
                                    border: "none"
                                } }),
                            react_2["default"].createElement(react_1.Button, { borderRadius: "full", colorScheme: "blue", padding: "2.5px", width: "25px", height: "25px", minWidth: "none" },
                                react_2["default"].createElement(react_1.Image, { src: "./assets/refresh_white.svg", alt: "Upload file", boxSize: "20px" })),
                            react_2["default"].createElement(react_1.Button, { borderRadius: "full", colorScheme: "blue", padding: "2.5px", width: "25px", height: "25px", minWidth: "none" },
                                react_2["default"].createElement(react_1.Image, { src: "./assets/upload_white.svg", alt: "Upload file", boxSize: "20px" })),
                            react_2["default"].createElement(react_1.VStack, { width: "20px", spacing: "4px", cursor: "pointer", display: "inline-flex", verticalAlign: "middle", transition: "all .15s ease", alignItems: "end", onMouseEnter: function () { return setIsFriesMenuHover(true); }, onMouseLeave: function () { return !isMenuShown && setIsFriesMenuHover(false); }, onClick: function () { return setIsMenuShown(true); } },
                                react_2["default"].createElement(react_1.Box, { width: isFriesMenuHover ? "20px" : "15px", height: "3px", backgroundColor: "blue.500", borderRadius: "3px", transition: "all .15s ease" }),
                                react_2["default"].createElement(react_1.Box, { width: isFriesMenuHover ? "15px" : "20px", height: "3px", backgroundColor: "blue.500", borderRadius: "3px", transition: "all .15s ease" }),
                                react_2["default"].createElement(react_1.Box, { width: isFriesMenuHover ? "20px" : "15px", height: "3px", backgroundColor: "blue.500", borderRadius: "3px", transition: "all .15s ease" })))))),
            isMenuShown && react_2["default"].createElement(ExplorerHeaderMenu, { setIsMenuShown: setIsMenuShown })));
    };
    return render();
};
var ExplorerHeaderMenu = function (_a) {
    var setIsMenuShown = _a.setIsMenuShown;
    var menu_items = [
        {
            icon: 'upload_gray_500.svg',
            desc: 'Upload file'
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
            action: function () { return window.api.logOut(); }
        },
        {
            icon: 'logout_red_500.svg',
            desc: 'Quit TelCloud',
            category: 'danger',
            isLastCatItem: true,
            //TODO: Ask the user if he really wants to quit the app when there are active down- or uploads
            action: function () { return window.api.quitApp(); }
        }
    ];
    var render = function () {
        var menu_elmnts = [];
        menu_items.forEach(function (item, i) {
            menu_elmnts.push(react_2["default"].createElement(react_1.Box, { key: i, width: "100%" },
                react_2["default"].createElement(react_1.Box, { padding: "0px 5px", _hover: {
                        backgroundColor: "gray.200"
                    }, cursor: "pointer", borderRadius: "md", onClick: function () {
                        if (item.action) {
                            item.action();
                            setIsMenuShown(false);
                        }
                        ;
                    } },
                    react_2["default"].createElement(react_1.Image, { src: "./assets/" + item.icon, boxSize: "25px", display: "inline-block", verticalAlign: "middle", mr: "10px", opacity: item.action ? 1 : 0.5 }),
                    react_2["default"].createElement(react_1.Text, { display: "inline-block", verticalAlign: "middle", color: item.category === "danger" ? "red.500" : undefined, opacity: item.action ? 1 : 0.5 },
                        item.desc,
                        item.shortcut && item.shortcut.map(function (shortcut) { return react_2["default"].createElement(react_1.Kbd, null, shortcut); }))),
                item.isLastCatItem &&
                    react_2["default"].createElement(react_1.Box, { height: "2px", backgroundColor: "gray.300", mt: "0.5rem" })));
        });
        return (react_2["default"].createElement(react_1.Box, { position: "absolute", right: "30px", top: "80px", width: "200px", padding: "15px", backgroundColor: "gray.100", borderRadius: "md", boxShadow: "sm", onMouseLeave: function () { return setIsMenuShown(false); } },
            react_2["default"].createElement(react_1.VStack, { spacing: 2, alignItems: "start", align: "left" }, menu_elmnts)));
    };
    return render();
};
react_dom_1["default"].render(react_2["default"].createElement(Explorer, null), document.getElementById('app'));
