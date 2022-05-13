"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path_1 = require("path");
var explorer_window = function () {
    var _a = electron_1.screen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
    var explorer_win = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 600,
        minHeight: 400,
        webPreferences: {
            nodeIntegration: true,
            preload: path_1["default"].join(__dirname, 'api_preload.js')
        }
    });
    explorer_win.loadFile('../explorer.html');
};
exports["default"] = explorer_window;
