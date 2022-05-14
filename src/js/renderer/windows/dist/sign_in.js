"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("@chakra-ui/react");
var axios_1 = require("axios");
var react_2 = require("react");
var react_dom_1 = require("react-dom");
var network_error_dialog_1 = require("../comps/network_error_dialog");
var global_helper_1 = require("../../helpers/global_helper");
var motion_alert_1 = require("../comps/motion_alert");
var form_helper_1 = require("../helpers/form_helper");
window.api.getAppUuid().then(function (uuid) {
    axios_1["default"].defaults.params = {};
    axios_1["default"].defaults.params['app_uuid'] = uuid;
});
/**
 *
 * Main overlay for signing into the main app
 *
 */
var SignIn = function () {
    var _a = react_2.useState(false), isSigningIn = _a[0], setIsSigningIn = _a[1];
    var _b = react_2.useState(''), username = _b[0], setUsername = _b[1];
    var _c = react_2.useState(false), isUsernameError = _c[0], setIsUsernameError = _c[1];
    var _d = react_2.useState('User id is required.'), usernameErrorMessage = _d[0], setUsernameErrorMessage = _d[1];
    var _e = react_2.useState(''), password = _e[0], setPassword = _e[1];
    var _f = react_2.useState(false), isPasswordError = _f[0], setIsPasswordError = _f[1];
    var _g = react_2.useState('Password is required.'), passwordErrorMessage = _g[0], setPasswordErrorMessage = _g[1];
    var _h = react_2.useState(false), showPassword = _h[0], setShowPassword = _h[1];
    var _j = react_2.useState(false), hasInputChanged = _j[0], setHasInputChanged = _j[1];
    var _k = react_2.useState(0), heartCounter = _k[0], setHeartCounter = _k[1];
    var _l = react_2.useState(false), hasSignInFailed = _l[0], setHasSignInFailed = _l[1];
    var _m = react_2.useState(false), isSignInLimited = _m[0], setisSignInLimited = _m[1];
    var _o = react_2.useState(false), isButtonDisabled = _o[0], setisButtonDisabled = _o[1];
    var _p = react_2.useState(false), isNetworkError = _p[0], setIsNetworkError = _p[1];
    var _q = react_2.useState(false), isNetworkErrorDialogRequested = _q[0], setIsNetworkErrorDialogRequested = _q[1];
    var _r = react_2.useState(false), hasReconnected = _r[0], setHasReconnected = _r[1];
    var _s = react_2.useState(false), hasSignedUp = _s[0], setHasSignedUp = _s[1];
    react_2.useEffect(function () {
        window.api.getUsername()
            .then(function (username) {
            if (username) {
                var input = document.getElementById('username');
                if (input && !input.value) {
                    input.value = username;
                    setUsername(username);
                }
            }
        });
        window.api.getData('has-signed-up')
            .then(function (answ) {
            if (answ === true)
                setHasSignedUp(true);
        });
    }, []);
    react_2.useEffect(function () {
        if (heartCounter != 0 && heartCounter % 5 === 0) {
            window.open('./zeta.html', '', 'width=430, height=541');
        }
    }, [heartCounter, setHeartCounter]);
    var handleInputChange = function (e, input_field) {
        var value = e.currentTarget.value.trim();
        if (!hasInputChanged)
            setHasInputChanged(true);
        if (input_field === 'password') {
            if (!value) {
                setPasswordErrorMessage('Password is required.');
                setIsPasswordError(true);
            }
            else
                setIsPasswordError(false);
            setPassword(value);
        }
        else if (input_field === 'username') {
            if (!value) {
                setUsernameErrorMessage('User id is required.');
                setIsUsernameError(true);
            }
            else
                setIsUsernameError(false);
            setUsername(value);
        }
    };
    var signIn = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!isSigningIn && hasInputChanged && !isPasswordError && !isUsernameError && password && username) {
                if (!navigator.onLine) {
                    // Abort process if no active internet connection could be detected
                    setIsNetworkErrorDialogRequested(true);
                    return [2 /*return*/];
                }
                setIsSigningIn(true);
                setisButtonDisabled(true);
                if (hasSignInFailed)
                    setHasSignInFailed(false);
                axios_1["default"].post(global_helper_1["default"].buildRequestUrl('signin'), { username: username, password: password })
                    .then(function (res) {
                    var res_data = res.data;
                    if ((res_data === null || res_data === void 0 ? void 0 : res_data.s_token.length) > 0 && (res_data === null || res_data === void 0 ? void 0 : res_data.u_uuid.length) > 0) {
                        window.api.signIn(res_data.s_token, res_data.u_uuid, res_data.username);
                    }
                })["catch"](function (err) {
                    var response = err.response;
                    var password_input = document.getElementById('password');
                    if (password_input)
                        password_input.value = "";
                    setPassword('');
                    setIsPasswordError(true);
                    if (response) {
                        if (isNetworkError)
                            setIsNetworkError(false);
                        if (response.status === 401) {
                            if (response.data === 'wrong-password') {
                                setPasswordErrorMessage('😶 Something appears to be odd with that password...Maybe a typo?');
                            }
                            else
                                setHasSignInFailed(true);
                        }
                        else if (response.status == 404) {
                            if (response.data === 'no-user') {
                                setIsUsernameError(true);
                                setUsernameErrorMessage('🧐 What?! We couldn\'t find any user with this name!');
                            }
                            else
                                setHasSignInFailed(true);
                        }
                        else if (response.status === 400) {
                            // Show server error message for each field, caused by invalid input values
                            // which should have been checked and reported by the client before the request
                            try {
                                if (response.data['username']) {
                                    setIsUsernameError(true);
                                    setUsernameErrorMessage(response.data['username']);
                                }
                                if (response.data['password']) {
                                    setPasswordErrorMessage(response.data['password']);
                                }
                                else
                                    throw new Error;
                            }
                            catch (error) {
                                setHasSignInFailed(true);
                            }
                        }
                        else if (response.status === 429) {
                            setisSignInLimited(true);
                        }
                        else
                            setHasSignInFailed(true);
                    }
                    else {
                        if (err.message === 'Network Error')
                            setIsNetworkError(true);
                        else {
                            setHasSignInFailed(true);
                            if (isNetworkError)
                                setIsNetworkError(false);
                        }
                    }
                    setIsSigningIn(false);
                    setTimeout(function () { return setisButtonDisabled(false); }, 2000);
                });
            }
            else {
                if (!username)
                    setIsUsernameError(true);
                if (!password)
                    setIsPasswordError(true);
            }
            return [2 /*return*/];
        });
    }); };
    var openSignUpWindow = function (e) { return window.api.showSignUpWindow(); };
    var render = function () {
        return (react_2["default"].createElement(react_1.ChakraProvider, null,
            react_2["default"].createElement(react_1.Box, { mt: "10px" },
                react_2["default"].createElement(react_1.Center, null,
                    react_2["default"].createElement(react_1.Image, { src: "./assets/telegram_brand.svg", alt: "Telegram", boxSize: "45px", mt: "10px" })),
                react_2["default"].createElement(react_1.Center, { mt: "10px" },
                    react_2["default"].createElement(react_1.Heading, null, "Sign In"))),
            react_2["default"].createElement(react_1.Center, null,
                react_2["default"].createElement(react_1.Box, { mt: "50px", width: "75%" },
                    react_2["default"].createElement(react_1.FormControl, { isRequired: true, isInvalid: isUsernameError },
                        react_2["default"].createElement(react_1.Input, { id: "username", type: "text", placeholder: "Username", onChange: function (e) { return handleInputChange(e, 'username'); }, onKeyDown: function (e) { return form_helper_1["default"].handleFormKeySubmit(e, signIn); } }),
                        react_2["default"].createElement(react_1.FormErrorMessage, null, usernameErrorMessage)),
                    react_2["default"].createElement(react_1.FormControl, { isRequired: true, isInvalid: isPasswordError, mt: "20px" },
                        react_2["default"].createElement(react_1.InputGroup, null,
                            react_2["default"].createElement(react_1.Input, { id: "password", type: (showPassword) ? 'text' : "password", placeholder: "Password", onChange: function (e) { return handleInputChange(e, 'password'); }, onKeyDown: function (e) { return form_helper_1["default"].handleFormKeySubmit(e, signIn); } }),
                            react_2["default"].createElement(react_1.InputRightElement, null,
                                react_2["default"].createElement(react_1.Button, { height: "30px", width: "30px", mr: "10px", onClick: function () { return setShowPassword(!showPassword); } }, showPassword
                                    ? react_2["default"].createElement(react_1.Image, { src: "./assets/visibility_on_black.png", alt: "Open eyes", width: "25px", height: "25px", maxWidth: "none" })
                                    : react_2["default"].createElement(react_1.Image, { src: "./assets/visibility_off_black.png", alt: "Open eyes", width: "25px", height: "25px", maxWidth: "none" })))),
                        react_2["default"].createElement(react_1.FormErrorMessage, null, passwordErrorMessage)),
                    react_2["default"].createElement(react_1.Center, null,
                        react_2["default"].createElement(react_1.Button, { colorScheme: "blue", mt: "40px", leftIcon: react_2["default"].createElement(react_1.Image, { src: "./assets/login.svg", alt: "Log In symbole", boxSize: "25px" }), loadingText: "Searching for the light...", isDisabled: isButtonDisabled, isLoading: isSigningIn, onClick: signIn }, "Ready to go!")),
                    react_2["default"].createElement(react_1.Text, { width: "75%", fontSize: "sm", align: "center", mt: "5px", ml: "12.5%", color: "red.500", display: (isNetworkError) ? 'block' : 'none' }, "Hmm, we couldn't establish a secure connection to our server \uD83D\uDD0C Is your internet up & running?"),
                    react_2["default"].createElement(react_1.Text, { width: "75%", fontSize: "sm", align: "center", mt: "5px", ml: "12.5%", color: "red.500", display: (hasSignInFailed) ? 'block' : 'none' }, "Oh no \uD83D\uDE25 Something went wrong while signing you in. Please try again, we'll do better next time \uD83D\uDE0A !"),
                    react_2["default"].createElement(react_1.Text, { width: "75%", fontSize: "sm", align: "center", mt: "5px", ml: "12.5%", color: "red.500", display: (isSignInLimited) ? 'block' : 'none' }, "That was hot \uD83D\uDD25! Please wait a moment until you try signing in again. We'll extinguish the button in the meantime..."),
                    react_2["default"].createElement(react_1.Text, { fontSize: "sm", align: "center", mt: "10px", opacity: "60%", transition: "all .15s ease", color: "gray.800", _hover: { opacity: '100%' } },
                        "No account yet? ",
                        react_2["default"].createElement(react_1.Link, { onClick: openSignUpWindow }, "Create one now"),
                        "."))),
            react_2["default"].createElement(react_1.Center, { position: "absolute", bottom: "15px", width: '100%' },
                react_2["default"].createElement(react_1.Heading, { size: "xs", opacity: "30%", userSelect: "none", transition: "all .15s ease", _hover: { opacity: '100%' } },
                    "Made with ",
                    react_2["default"].createElement(react_1.Text, { display: "inline", onClick: function () { return setHeartCounter(heartCounter + 1); } }, "\uD83D\uDC99"),
                    "\u00A0\u00A0by ",
                    react_2["default"].createElement(react_1.Link, { href: "https://github.com/Jan-Emig", isExternal: true }, "Jan-Emig"))),
            isNetworkErrorDialogRequested && false && react_2["default"].createElement(network_error_dialog_1["default"], { setHasReconnected: setHasReconnected, setIsNetworkErrorDialogRequested: setIsNetworkErrorDialogRequested }),
            hasReconnected &&
                react_2["default"].createElement(motion_alert_1["default"], { alertType: 'success', alertMessage: 'Successfully reconnected. Fire on!', width: '330px', setShowElement: setHasReconnected }),
            hasSignedUp &&
                react_2["default"].createElement(motion_alert_1["default"], { alertType: 'success', alertMessage: 'Successfully signed up. Welcome onboard \uD83E\uDD73', width: '400px', setShowElement: setHasSignedUp, duration: 3 })));
    };
    return render();
};
react_dom_1["default"].render(react_2["default"].createElement(SignIn, null), document.getElementById('app'));
