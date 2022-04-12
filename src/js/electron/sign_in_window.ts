import { BrowserWindow, ipcMain, IpcMainEvent, shell } from "electron";
import AuthService from "./services/auth";
const path = require('path');

const sign_in_window = () => {
    let sign_in_win = new BrowserWindow({
        width: 470,
        height: 580,
        minWidth: 350,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'sign_in_preload.js')
        },
    });
    
    sign_in_win.loadFile('../sign_in.html');
    sign_in_win.webContents.setWindowOpenHandler(({ url } : { url: string })  => {
        if (url.startsWith('https://github.com/')) {
            shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    })

    ipcMain.on('sign-in', async(event: IpcMainEvent, token: string) => {
        if (token) AuthService.setSessionToken(token);
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        win?.close();
    })

    ipcMain.on('set-session-token', async(event: IpcMainEvent, token: string) => {
        AuthService.setSessionToken(token);
    })
}

export default sign_in_window;