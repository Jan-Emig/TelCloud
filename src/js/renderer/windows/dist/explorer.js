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
            react_2["default"].createElement(react_1.Text, null, "Hello world!")));
    };
    return render();
};
react_dom_1["default"].render(react_2["default"].createElement(Explorer, null), document.getElementById('app'));
