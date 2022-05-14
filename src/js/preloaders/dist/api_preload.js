"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    signIn: function (token, user_uuid, username) { return electron_1.ipcRenderer.invoke('sign-in', token, user_uuid, username); },
    getAppUuid: function () { return electron_1.ipcRenderer.invoke('app-uuid'); },
    setSessionToken: function (token) { return electron_1.ipcRenderer.invoke('set-session-token', token); },
    getSessionToken: function () { return electron_1.ipcRenderer.invoke('session-token'); },
    getUsername: function () { return electron_1.ipcRenderer.invoke('get-username'); },
    showSignUpWindow: function () { return electron_1.ipcRenderer.invoke('show-sign-up-window'); },
    showSignInWindow: function () { return electron_1.ipcRenderer.invoke('show-sign-in-window'); },
    getData: function (channel) { return electron_1.ipcRenderer.invoke(channel); },
    quitApp: function () { return electron_1.ipcRenderer.invoke('quit-app'); },
    logOut: function () { return electron_1.ipcRenderer.invoke('log-out'); }
});
