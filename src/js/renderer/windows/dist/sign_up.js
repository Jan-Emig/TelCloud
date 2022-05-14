"use strict";
exports.__esModule = true;
var react_1 = require("@chakra-ui/react");
var axios_1 = require("axios");
var framer_motion_1 = require("framer-motion");
var react_2 = require("react");
var react_dom_1 = require("react-dom");
var global_helper_1 = require("../../helpers/global_helper");
var form_helper_1 = require("../helpers/form_helper");
var zxcvbn_1 = require("zxcvbn");
window.api.getAppUuid().then(function (uuid) {
    axios_1["default"].defaults.params = {};
    axios_1["default"].defaults.params['app_uuid'] = uuid;
});
var MotionBox = framer_motion_1.motion(react_1.Box);
var MotionInput = framer_motion_1.motion(react_1.Input);
var SignUp = function () {
    var showUsernameScreen = react_2.useState(true)[0];
    var _a = react_2.useState(false), showPasswordScreen = _a[0], setShowPasswordScreen = _a[1];
    var _b = react_2.useState(false), showConfirmPasswordScreen = _b[0], setShowConfirmPasswordScreen = _b[1];
    var _c = react_2.useState(''), username = _c[0], setUsername = _c[1];
    var _d = react_2.useState(''), password = _d[0], setPassword = _d[1];
    var _e = react_2.useState(''), confirmPassword = _e[0], setConfirmPassword = _e[1];
    var _f = react_2.useState(false), hasRequestFailed = _f[0], setHasRequestFailed = _f[1];
    var _g = react_2.useState(false), isNetworkError = _g[0], setIsNetworkError = _g[1];
    var _h = react_2.useState(), usernameCompAnimation = _h[0], setUsernameCompAnimation = _h[1];
    var _j = react_2.useState('initFadeIn'), passwordCompAnimation = _j[0], setPasswordCompAnimation = _j[1];
    var _k = react_2.useState('initFadeIn'), confirmPasswordCompAnimation = _k[0], setConfirmPasswordCompAnimation = _k[1];
    var openSignInWindow = function () { return window.api.showSignInWindow(); };
    // Submit the sign up form to create a new account
    // and redirect the user to the sign in page if the process was successfull.
    var submitForm = function () {
        axios_1["default"].post(global_helper_1["default"].buildRequestUrl('sign-up'), { username: username, password: password })
            .then(function (res) {
            if (res.status === 200 && res.data.length === 0)
                window.api.showSignInWindow(true);
        })["catch"](function (err) {
            console.log(err.message);
        });
    };
    var render = function () {
        return (react_2["default"].createElement(react_1.ChakraProvider, null,
            react_2["default"].createElement(react_1.Box, { mt: "10px" },
                react_2["default"].createElement(react_1.Center, null,
                    react_2["default"].createElement(react_1.Image, { src: "./assets/telegram_brand.svg", alt: "Telegram", boxSize: "45px", mt: "10px" })),
                react_2["default"].createElement(react_1.Center, { mt: "10px" },
                    react_2["default"].createElement(react_1.Heading, null, "Sign Up")),
                react_2["default"].createElement(react_1.Text, { mt: "15px", align: "center", fontSize: "14px", color: "gray.700" },
                    "You are just a few steps away from your",
                    react_2["default"].createElement("br", null),
                    "free, unlimited cloud service!")),
            react_2["default"].createElement(react_1.Center, null,
                react_2["default"].createElement(react_1.Box, { mt: "45px", width: "100%" },
                    react_2["default"].createElement(react_1.Box, { position: "relative", width: "100%" },
                        react_2["default"].createElement(react_1.Center, null,
                            showUsernameScreen &&
                                react_2["default"].createElement(UsernameComp, { setShowPasswordScreen: setShowPasswordScreen, username: username, setUsername: setUsername, hasRequestFailed: hasRequestFailed, setHasRequestFailed: setHasRequestFailed, isNetworkError: isNetworkError, setIsNetworkError: setIsNetworkError, compAnimation: usernameCompAnimation, setCompAnimation: setUsernameCompAnimation, setPasswordCompAnimation: setPasswordCompAnimation }),
                            showPasswordScreen &&
                                react_2["default"].createElement(PasswordComp, { setShowConfirmPasswordScreen: setShowConfirmPasswordScreen, password: password, setPassword: setPassword, compAnimation: passwordCompAnimation, setCompAnimation: setPasswordCompAnimation, setUsernameCompAnimation: setUsernameCompAnimation, setConfirmPasswordCompAnimation: setConfirmPasswordCompAnimation }),
                            showConfirmPasswordScreen &&
                                react_2["default"].createElement(ConfirmPasswordComp, { comfPassword: confirmPassword, setComfPassword: setConfirmPassword, password: password, compAnimation: confirmPasswordCompAnimation, setCompAnimation: setConfirmPasswordCompAnimation, setPasswordCompAnimation: setPasswordCompAnimation, submitForm: submitForm }))),
                    react_2["default"].createElement(react_1.Text, { width: "75%", fontSize: "sm", align: "center", mt: "180px", ml: "12.5%", color: "red.500", display: (isNetworkError) ? 'block' : 'none' }, "Hmm, we couldn't establish a secure connection to our servers \uD83D\uDD0C \u00A0Is your internet up & running?"),
                    react_2["default"].createElement(react_1.Text, { width: "75%", fontSize: "sm", align: "center", mt: "180px", ml: "12.5%", color: "red.500", display: (hasRequestFailed) ? 'block' : 'none' }, "Oh no \uD83D\uDE25 Something went wrong while signing you in. Please try again, we'll do better next time \uD83D\uDE0A !"))),
            react_2["default"].createElement(react_1.Center, null,
                react_2["default"].createElement(react_1.Text, { position: "absolute", bottom: "10px", fontSize: "sm", align: "center", mt: "10px", transition: "all .15s ease", color: "gray.500", background: "white", _hover: { color: 'gray.800' } },
                    "I already have an account. ",
                    react_2["default"].createElement(react_1.Link, { onClick: openSignInWindow }, "Bring me back!")))));
    };
    return render();
};
var UsernameComp = function (_a) {
    var setShowPasswordScreen = _a.setShowPasswordScreen, username = _a.username, setUsername = _a.setUsername, hasRequestFailed = _a.hasRequestFailed, setHasRequestFailed = _a.setHasRequestFailed, isNetworkError = _a.isNetworkError, setIsNetworkError = _a.setIsNetworkError, compAnimation = _a.compAnimation, setCompAnimation = _a.setCompAnimation, setPasswordCompAnimation = _a.setPasswordCompAnimation;
    var _b = react_2.useState(''), usernameErrorMessage = _b[0], setUsernameErrorMessage = _b[1];
    var _c = react_2.useState(false), isUsernameGenerating = _c[0], setIsUsernameGenerating = _c[1];
    var _d = react_2.useState(0), isUsernameFree = _d[0], setIsUsernameFree = _d[1];
    var _e = react_2.useState(false), isRequestActive = _e[0], setIsRequestActive = _e[1];
    var _f = react_2.useState(false), isButtonDisabled = _f[0], setIsButtonDisabled = _f[1];
    react_2.useEffect(function () {
        setIsButtonDisabled(isUsernameFree == -1 || isRequestActive);
    }, [isUsernameFree, isRequestActive]);
    react_2.useEffect(function () {
        if (compAnimation === "fadeIn")
            setIsButtonDisabled(false);
    }, [compAnimation, setCompAnimation]);
    var handleInputChange = function (e) {
        setIsUsernameFree(0);
        if (!hasRequestFailed && !isNetworkError)
            setIsButtonDisabled(false);
        if (e.currentTarget) {
            setUsername(e.currentTarget.value.trim());
        }
    };
    // Request a generated username based upon english words and digits from the server
    var generateUsername = function (e) {
        if (isUsernameGenerating)
            return;
        setIsUsernameGenerating(true);
        axios_1["default"].get(global_helper_1["default"].buildRequestUrl('generate-username'))
            .then(function (res) {
            if (res.data.length) {
                var username_input = document.querySelector('#username');
                if (username_input) {
                    username_input.value = res.data;
                    setUsername(res.data);
                    setIsUsernameFree(1);
                }
            }
        })["finally"](function () {
            setIsUsernameGenerating(false);
        });
    };
    function submitUsername(e) {
        if (e === void 0) { e = undefined; }
        var initNextFormState = function () {
            setIsUsernameFree(1);
            setCompAnimation("fadeOut");
            setShowPasswordScreen(true);
            setPasswordCompAnimation('initFadeIn');
        };
        if (username.length) {
            setIsRequestActive(true);
            if (e)
                e.currentTarget.blur();
            axios_1["default"].get(global_helper_1["default"].buildRequestUrl('check-username'), { params: { username: username } })
                .then(function (res) { return initNextFormState(); })["catch"](function (err) {
                var _a;
                var response = err.response;
                if (response) {
                    var error_msg = '';
                    if (response.status === 400)
                        error_msg = (_a = response.data['username'][0]) !== null && _a !== void 0 ? _a : '';
                    else if (response.status === 409) {
                        error_msg = 'Oh no! This username is already in use 😭';
                    }
                    else if (response.status === 500)
                        setHasRequestFailed(true);
                    setIsUsernameFree(-1);
                    setUsernameErrorMessage(error_msg);
                }
                else if (err.message === 'Network Error')
                    setIsNetworkError(true);
                setTimeout(function () { return setIsRequestActive(false); }, 2000);
            });
            if (isNetworkError)
                setIsNetworkError(false);
            if (hasRequestFailed)
                setHasRequestFailed(false);
        }
    }
    var render = function () {
        return (react_2["default"].createElement(react_1.ChakraProvider, null,
            react_2["default"].createElement(MotionBox, { id: "username_comp", top: "0", right: "50%", width: "75%", transform: "auto", translateX: "50%", position: "absolute", variants: {
                    fadeOut: { right: ['50%', '150%'] },
                    fadeIn: { right: ['150%', '50%'] }
                }, animate: compAnimation, transition: { duration: 0.5, ease: 'easeInOut', delay: (compAnimation == 'fadeOut') ? 0.5 : 0 } },
                react_2["default"].createElement(react_1.Center, null,
                    react_2["default"].createElement(react_1.FormControl, { isRequired: true, isInvalid: isUsernameFree == -1 },
                        react_2["default"].createElement(MotionInput, { id: "username", type: "text", position: "relative", textAlign: "center", placeholder: "Username", defaultValue: username, onChange: function (e) { return handleInputChange(e); }, onKeyDown: function (e) { return form_helper_1["default"].handleFormKeySubmit(e, submitUsername); }, animate: isUsernameFree === -1 ? { left: ['0px', '-20px', '20px', '-20px', '20px', '-20px', '0px'] } : undefined, transition: { duration: 0.5, delay: 0.1 }, borderColor: isUsernameFree == 1
                                ? 'green.500'
                                : (isUsernameFree === -1
                                    ? 'red.500'
                                    : undefined), _hover: {
                                'borderColor': (isUsernameFree == 1
                                    ? 'green.500'
                                    : (isUsernameFree == -1
                                        ? 'red.500'
                                        : undefined))
                            } }),
                        react_2["default"].createElement(react_1.Center, null,
                            react_2["default"].createElement(react_1.FormErrorMessage, null, usernameErrorMessage)),
                        react_2["default"].createElement(react_1.FormHelperText, { textAlign: "center" },
                            "No idea?\u00A0",
                            react_2["default"].createElement(react_1.Link, { opacity: isUsernameGenerating ? 0.5 : undefined, onClick: generateUsername }, "Generate a username")))),
                react_2["default"].createElement(react_1.Center, null,
                    react_2["default"].createElement(react_1.Button, { colorScheme: "blue", mt: "40px", leftIcon: react_2["default"].createElement(react_1.Image, { src: "./assets/arrow_nav_right.svg", alt: "Arrow symbole", boxSize: "25px" }), onClick: function (e) { return submitUsername(); }, disabled: isButtonDisabled }, "What's next?")))));
    };
    return render();
};
var PasswordComp = function (_a) {
    var password = _a.password, setPassword = _a.setPassword, setShowConfirmPasswordScreen = _a.setShowConfirmPasswordScreen, compAnimation = _a.compAnimation, setCompAnimation = _a.setCompAnimation, setUsernameCompAnimation = _a.setUsernameCompAnimation, setConfirmPasswordCompAnimation = _a.setConfirmPasswordCompAnimation;
    var _b = react_2.useState(0), passwordStrength = _b[0], setPasswordStrength = _b[1];
    var _c = react_2.useState(''), passwordErrorMessage = _c[0], setPasswordErrorMessage = _c[1];
    var _d = react_2.useState(0), isPasswordValid = _d[0], setIsPasswordValid = _d[1];
    var _e = react_2.useState(false), isButtonDisabled = _e[0], setIsButtonDisabled = _e[1];
    var passwordInput = react_2.createRef();
    react_2.useEffect(function () {
        setIsButtonDisabled(false);
    }, [compAnimation, setCompAnimation]);
    var handleInputChange = function (e) {
        var pw = e.currentTarget.value;
        setPassword(pw);
        var guesses_log10 = zxcvbn_1["default"](pw).guesses_log10; // Calculate the password's strength on a scale from 1 to 4
        setPasswordStrength(Math.round(guesses_log10));
        if (isPasswordValid === -1)
            setIsPasswordValid(0);
    };
    var submitPassword = function (e) {
        if (e === void 0) { e = undefined; }
        if (password.length < 4) {
            setPasswordErrorMessage('Password must be at least 4 characters');
            setIsPasswordValid(-1);
        }
        else {
            e === null || e === void 0 ? void 0 : e.currentTarget.blur();
            setIsButtonDisabled(true);
            setIsPasswordValid(1);
            setCompAnimation("fadeOut");
            setConfirmPasswordCompAnimation('initFadeIn');
            setShowConfirmPasswordScreen(true);
        }
    };
    var goBackFunction = function () {
        setCompAnimation("fadeBackOut");
        setUsernameCompAnimation('fadeIn');
    };
    var render = function () {
        var pw_strength_msg = '';
        if (passwordStrength == 1 || (passwordStrength < 1 && password.length > 0))
            pw_strength_msg = '😰 That\s quite a weak password, hm?';
        else if (passwordStrength == 2)
            pw_strength_msg = '😵‍💫 Any ideas for a stronger password?';
        else if (passwordStrength == 3)
            pw_strength_msg = '🤔 That\'s quite a good password';
        else if (passwordStrength >= 4)
            pw_strength_msg = 'Awesome password 😊';
        return (react_2["default"].createElement(react_1.ChakraProvider, null,
            react_2["default"].createElement(MotionBox, { id: "password_comp", top: "0", right: "-150%", width: "75%", transform: "auto", translateX: "50%", position: "absolute", variants: {
                    initFadeIn: { right: ['-150%', '50%'] },
                    fadeIn: { right: ['150%', '50%'] },
                    fadeOut: { right: ['50%', '150%'] },
                    fadeBackOut: { right: ['50%', '-150%'] }
                }, animate: compAnimation, onAnimationComplete: (function () { return (compAnimation === 'initFadeIn' || compAnimation === 'fadeIn') && passwordInput.current && passwordInput.current.focus(); }), transition: { duration: 0.5, ease: 'easeInOut', delay: (compAnimation == 'fadeOut' || compAnimation == 'initFadeIn') ? 0.5 : 0 } },
                react_2["default"].createElement(react_1.Center, null,
                    react_2["default"].createElement(react_1.FormControl, { isRequired: true, isInvalid: isPasswordValid === -1 },
                        react_2["default"].createElement(MotionInput, { id: "password", type: "password", position: "relative", textAlign: "center", placeholder: "Password", minLength: 4, onChange: function (e) { return handleInputChange(e); }, onKeyDown: function (e) { return form_helper_1["default"].handleFormKeySubmit(e, submitPassword); }, animate: isPasswordValid === -1 ? { left: ['0px', '-20px', '20px', '-20px', '20px', '-20px', '0px'] } : undefined, transition: { duration: 0.5, delay: 0.1 }, ref: passwordInput, borderColor: isPasswordValid == 1
                                ? 'green.500'
                                : (isPasswordValid === -1
                                    ? 'red.500'
                                    : undefined), _hover: {
                                'borderColor': (isPasswordValid == 1
                                    ? 'green.500'
                                    : (isPasswordValid == -1
                                        ? 'red.500'
                                        : undefined))
                            } }),
                        react_2["default"].createElement(react_1.Center, null,
                            react_2["default"].createElement(react_1.FormErrorMessage, null, passwordErrorMessage)))),
                react_2["default"].createElement(react_1.Center, { marginTop: "10px", width: "95%", marginLeft: "50%", transform: "translateX(-50%)" },
                    react_2["default"].createElement(react_1.Box, { display: "inline-block", width: "25%", height: "10px", background: passwordStrength >= 1 || (passwordStrength < 1 && password.length > 0) ? "linear-gradient(90deg, rgba(245,101,101,1) 20%, rgba(237,137,54,1) 100%)" : undefined, border: "1px", borderRadius: "5px 0 0 5px", borderColor: "gray.200", transition: "all .15s ease" }),
                    react_2["default"].createElement(react_1.Box, { display: "inline-block", width: "25%", height: "10px", marginLeft: "5px", background: passwordStrength >= 2 ? "linear-gradient(90deg, rgba(237,137,54,1) 20%, rgba(236,201,75,1) 100%)" : undefined, border: "1px", borderColor: "gray.200", transition: "all .15s ease" }),
                    react_2["default"].createElement(react_1.Box, { display: "inline-block", width: "25%", height: "10px", marginLeft: "5px", background: passwordStrength >= 3 ? "linear-gradient(90deg, rgba(236,201,75,1) 20%, rgba(72,187,120,1) 100%)" : undefined, border: "1px", borderColor: "gray.200", transition: "all .15s ease" }),
                    react_2["default"].createElement(react_1.Box, { display: "inline-block", width: "25%", height: "10px", marginLeft: "5px", background: passwordStrength >= 4 ? "linear-gradient(90deg, rgba(72,187,120,1) 20%, rgba(47,133,90,1) 100%)" : undefined, border: "1px", borderRadius: "0px 5px 5px 0px", borderColor: "gray.200", transition: "all .15s ease" })),
                react_2["default"].createElement(react_1.Text, { mt: "10px", color: "gray.500", fontSize: "small", align: "center" }, pw_strength_msg),
                react_2["default"].createElement(react_1.Center, null,
                    react_2["default"].createElement(react_1.Button, { colorScheme: "blue", mt: "40px", leftIcon: react_2["default"].createElement(react_1.Image, { src: "./assets/arrow_nav_right.svg", alt: "Arrow symbole", boxSize: "25px" }), onClick: function () { return submitPassword(); }, disabled: isButtonDisabled || isPasswordValid === -1 }, "What's next?")),
                react_2["default"].createElement(react_1.Center, null,
                    react_2["default"].createElement(react_1.Link, { opacity: "0.5", mt: "10px", fontSize: "sm", transition: "all .15s ease", _hover: {
                            'opacity': 1,
                            'color': 'gray.600'
                        }, onClick: function () { return goBackFunction(); } }, "Wait! I changed my mind \uD83E\uDD7A")))));
    };
    return render();
};
var ConfirmPasswordComp = function (_a) {
    var password = _a.password, comfPassword = _a.comfPassword, setComfPassword = _a.setComfPassword, compAnimation = _a.compAnimation, setCompAnimation = _a.setCompAnimation, setPasswordCompAnimation = _a.setPasswordCompAnimation, submitForm = _a.submitForm;
    var _b = react_2.useState(''), passwordErrorMessage = _b[0], setPasswordErrorMessage = _b[1];
    var _c = react_2.useState(0), isPasswordValid = _c[0], setIsPasswordValid = _c[1];
    var _d = react_2.useState(false), isButtonDisabled = _d[0], setIsButtonDisabled = _d[1];
    var passwordInput = react_2.createRef();
    react_2.useEffect(function () {
        setIsButtonDisabled(false);
        setIsPasswordValid(0);
    }, [compAnimation, setCompAnimation]);
    var goBackFunction = function () {
        setPasswordCompAnimation('fadeIn');
        setCompAnimation('fadeBackOut');
    };
    var handleInputChange = function (e) {
        var pw = e.currentTarget.value;
        setComfPassword(pw);
        if (isPasswordValid === -1)
            setIsPasswordValid(0);
    };
    var submitPassword = function (e) {
        if (e === void 0) { e = undefined; }
        if (password != comfPassword) {
            setPasswordErrorMessage('Passwords are not identical');
            setIsPasswordValid(-1);
        }
        else {
            e === null || e === void 0 ? void 0 : e.currentTarget.blur();
            setIsButtonDisabled(true);
            setIsPasswordValid(1);
            submitForm();
        }
    };
    var render = function () {
        return (react_2["default"].createElement(react_1.ChakraProvider, null,
            react_2["default"].createElement(MotionBox, { id: "password_comp", top: "0", right: "-150%", width: "75%", transform: "auto", translateX: "50%", position: "absolute", variants: {
                    initFadeIn: { right: ['-150%', '50%'] },
                    fadeIn: { right: ['150%', '50%'] },
                    fadeOut: { right: ['50%', '150%'] },
                    fadeBackOut: { right: ['50%', '-150%'] }
                }, animate: compAnimation, onAnimationComplete: (function () { return (compAnimation === 'initFadeIn' || compAnimation === 'fadeIn') && passwordInput.current && passwordInput.current.focus(); }), transition: { duration: 0.5, ease: 'easeInOut', delay: (compAnimation == 'fadeOut' || compAnimation == 'initFadeIn') ? 0.5 : 0 } },
                react_2["default"].createElement(react_1.Center, null,
                    react_2["default"].createElement(react_1.FormControl, { isRequired: true, isInvalid: isPasswordValid === -1 },
                        react_2["default"].createElement(MotionInput, { id: "confirm-password", type: "password", position: "relative", textAlign: "center", placeholder: "Confirm Password", minLength: 4, onChange: function (e) { return handleInputChange(e); }, onKeyDown: function (e) { return form_helper_1["default"].handleFormKeySubmit(e, submitPassword); }, animate: isPasswordValid === -1 ? { left: ['0px', '-20px', '20px', '-20px', '20px', '-20px', '0px'] } : undefined, transition: { duration: 0.5, delay: 0.1 }, ref: passwordInput, borderColor: isPasswordValid == 1
                                ? 'green.500'
                                : (isPasswordValid === -1
                                    ? 'red.500'
                                    : undefined), _hover: {
                                'borderColor': (isPasswordValid == 1
                                    ? 'green.500'
                                    : (isPasswordValid == -1
                                        ? 'red.500'
                                        : undefined))
                            } }),
                        react_2["default"].createElement(react_1.Center, null,
                            react_2["default"].createElement(react_1.FormErrorMessage, null, passwordErrorMessage)))),
                react_2["default"].createElement(react_1.Center, null,
                    react_2["default"].createElement(react_1.Button, { colorScheme: "blue", mt: "40px", leftIcon: react_2["default"].createElement(react_1.Image, { src: "./assets/done_all_white.svg", alt: "Done all symbole", boxSize: "25px" }), onClick: function () { return submitPassword(); }, disabled: isButtonDisabled || isPasswordValid === -1 }, "Call it a day")),
                react_2["default"].createElement(react_1.Center, null,
                    react_2["default"].createElement(react_1.Link, { opacity: "0.5", mt: "10px", fontSize: "sm", transition: "all .15s ease", _hover: {
                            'opacity': 1,
                            'color': 'gray.600'
                        }, onClick: function () { return goBackFunction(); } }, "Hold on! I think I use another password \uD83D\uDE48")))));
    };
    return render();
};
react_dom_1["default"].render(react_2["default"].createElement(SignUp, null), document.getElementById('app'));
