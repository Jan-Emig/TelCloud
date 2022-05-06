import { BrowserWindow, ipcMain, IpcMainInvokeEvent, shell } from "electron";
import AuthService from "../services/auth";
import path from "path";

const sign_in_window = (has_signed_up: boolean = false) => {
    let sign_in_win = new BrowserWindow({
        width: 470,
        height: 580,
        minWidth: 350,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'api_preload.js')
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

    ipcMain.handle('set-session-token', async(event: IpcMainInvokeEvent, token: string) => AuthService.setSessionToken(token))

    ipcMain.handle('get-username', async() => AuthService.getUsername());

    ipcMain.handle('has-signed-up', async() => has_signed_up);

}

export default sign_in_window;