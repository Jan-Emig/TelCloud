"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    signIn: function (token, user_uuid) { return electron_1.ipcRenderer.send('sign-in', token, user_uuid); },
    getAppUuid: function () { return electron_1.ipcRenderer.invoke('app-uuid'); },
    setSessionToken: function (token) { return electron_1.ipcRenderer.send('set-session-token', token); },
    getSessionToken: function () { return electron_1.ipcRenderer.invoke('session-token'); },
    getUsername: function () { return electron_1.ipcRenderer.invoke('get-username'); }
});
