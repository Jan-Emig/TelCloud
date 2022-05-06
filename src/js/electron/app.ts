import axios, { AxiosError, AxiosResponse } from "axios";
import { Helper } from "../helpers/helper";
import crypto from 'crypto';
import AuthService from "./services/auth";
import no_connection_window from "./windows/no_connection_window";
import sign_in_window from "./windows/sign_in_window";
import { BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import StorageService from "./services/storage";
import sign_up_window from "./windows/sign_up_window";
const { app } = require('electron');

const internetAvailable = require('internet-available');

app.on('ready', () => {

    StorageService.integrityCeck();

    if (!AuthService.getAppUuid()) {
        AuthService.generateAppUuid();
    }

    internetAvailable({
        timeout: 5000,
        retries: 5
    })
    .then(() => {
        axios.get(Helper.buildRequestUrl('ping'))
        .then((res: AxiosResponse) => {
            if (res.data === 'pong') {
                // Check if user is already signed in (according to the server)
                AuthService.checkAuthentication((is_authenticated: boolean) => {
                    if (!is_authenticated) sign_in_window();
                });
            } else no_connection_window();
        })
        .catch(() => no_connection_window())
    })
    .catch(no_connection_window);

    /**
     * IPC Event Handlers
     */
    ipcMain.handle('app-uuid', async () => {
        return AuthService.getAppUuid();
    })

    ipcMain.handle('session-token', async () => {
        return AuthService.getSessionToken();
    });
    
    ipcMain.handle('show-sign-in-window', (e: IpcMainInvokeEvent, has_signed_up: boolean = false) => {
        const win = BrowserWindow.fromWebContents(e.sender);
        if (has_signed_up) console.log('User has just signed up!');
        if (win) win.close();
        sign_in_window();
    })

    ipcMain.handle('show-sign-up-window', (e: IpcMainInvokeEvent) => {
        const win = BrowserWindow.fromWebContents(e.sender);
        if (win) win.close();
        sign_up_window();
    })

    ipcMain.handle('sign-in', async(event: IpcMainInvokeEvent, token: string, user_uuid: string, username: string) => {
        if (token) AuthService.setSessionToken(token);
        if (user_uuid) AuthService.setUserUuid(user_uuid);
        if (username) AuthService.setUsername(username);
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        win?.close();
        //TODO: Show file page if the user has been signed in successfully
    })
});