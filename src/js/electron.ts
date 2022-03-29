import { IpcMainEvent } from "electron";

const { app, BrowserWindow, ipcMain } = require('electron');
const shell = require('electron').shell;
const path = require('path');

app.on('ready', () => {
    let sign_in_win = new BrowserWindow({
        width: 430,
        height: 541,
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

    ipcMain.on('sign-in', async(event: IpcMainEvent, ... args: any[]) => {
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        win?.close();
    })

    // ipcMain.on('ajax-ipc', async (event: any, ...args: any[]) => {
    //     const promise = new Promise((resolve, reject) => {
    //         axios.post(buildRequestUrl('api/signin'))
    //         .then((res: AxiosResponse) => {
    //             console.log(res.data);
    //             event.reply(res.data);
    //         })
    //         .catch ((err: AxiosError) => {
    //             console.log(err.message);
    //         })
    //     })
    //     return promise;
    // })
});