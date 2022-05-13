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
var axios_1 = require("axios");
var helper_1 = require("../helpers/helper");
var auth_1 = require("./services/auth");
var no_connection_window_1 = require("./windows/no_connection_window");
var sign_in_window_1 = require("./windows/sign_in_window");
var electron_1 = require("electron");
var storage_1 = require("./services/storage");
var sign_up_window_1 = require("./windows/sign_up_window");
var explorer_window_1 = require("./windows/explorer_window");
var app = require('electron').app;
var internetAvailable = require('internet-available');
app.on('ready', function () {
    storage_1["default"].integrityCeck();
    if (!auth_1["default"].getAppUuid()) {
        auth_1["default"].generateAppUuid();
    }
    var authCheck = function () {
        auth_1["default"].checkAuthentication(function (is_authenticated) {
            if (!is_authenticated)
                sign_in_window_1["default"]();
            else
                explorer_window_1["default"]();
        });
    };
    internetAvailable({
        timeout: 5000,
        retries: 5
    })
        .then(function () {
        axios_1["default"].get(helper_1.Helper.buildRequestUrl('ping'))
            .then(function (res) {
            if (res.data === 'pong') {
                // Check if user is already signed in (according to the server)
                authCheck();
            }
            else
                no_connection_window_1["default"](authCheck);
        })["catch"](function () { return no_connection_window_1["default"](authCheck); });
    })["catch"](no_connection_window_1["default"]);
    /**
     * IPC Event Handlers
     */
    electron_1.ipcMain.handle('app-uuid', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, auth_1["default"].getAppUuid()];
        });
    }); });
    electron_1.ipcMain.handle('session-token', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, auth_1["default"].getSessionToken()];
        });
    }); });
    electron_1.ipcMain.handle('show-sign-in-window', function (e, has_signed_up) {
        if (has_signed_up === void 0) { has_signed_up = false; }
        var win = electron_1.BrowserWindow.fromWebContents(e.sender);
        if (has_signed_up)
            console.log('User has just signed up!');
        if (win)
            win.close();
        sign_in_window_1["default"](has_signed_up);
    });
    electron_1.ipcMain.handle('show-sign-up-window', function (e) {
        var win = electron_1.BrowserWindow.fromWebContents(e.sender);
        if (win)
            win.close();
        sign_up_window_1["default"]();
    });
    electron_1.ipcMain.handle('sign-in', function (event, token, user_uuid, username) { return __awaiter(void 0, void 0, void 0, function () {
        var webContents, win;
        return __generator(this, function (_a) {
            if (token)
                auth_1["default"].setSessionToken(token);
            if (user_uuid)
                auth_1["default"].setUserUuid(user_uuid);
            if (username)
                auth_1["default"].setUsername(username);
            webContents = event.sender;
            win = electron_1.BrowserWindow.fromWebContents(webContents);
            win === null || win === void 0 ? void 0 : win.close();
            explorer_window_1["default"]();
            return [2 /*return*/];
        });
    }); });
});
