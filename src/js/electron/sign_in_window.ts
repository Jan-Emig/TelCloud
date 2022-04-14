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

    ipcMain.on('sign-in', async(event: IpcMainEvent, token: string, user_uuid: string, username: string) => {
        if (token) AuthService.setSessionToken(token);
        if (user_uuid) AuthService.setUserUuid(user_uuid);
        if (username) AuthService.setUsername(username);
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        win?.close();
    })

    ipcMain.on('set-session-token', async(event: IpcMainEvent, token: string) => {
        AuthService.setSessionToken(token);
    })

    ipcMain.handle('get-username', async() => {
        return AuthService.getUsername()
    });
}

export default sign_in_window;