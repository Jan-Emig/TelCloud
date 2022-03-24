"use strict";
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow;
app.on('ready', function () {
    var sign_in_win = new BrowserWindow({
        width: 390,
        height: 501,
        webPreferences: {
            nodeIntegration: true
        }
    });
    sign_in_win.loadFile('../sign_in.html');
});
