import { BrowserWindow } from "electron";
import { ipcMain } from "electron";
import path from "path";
import sign_in_window from "./sign_in_window";
// const path = require("path");

const sign_up_window = () => {
    let sign_up_win = new BrowserWindow({
        width: 400,
        height: 550,
        minWidth: 350,
        minHeight: 420,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'api_preload.js')
        },
    });

    sign_up_win.loadFile('../sign_up.html');

    
}

export default sign_up_window;