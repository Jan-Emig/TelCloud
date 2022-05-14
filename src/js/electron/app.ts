import axios, { AxiosError, AxiosResponse } from "axios";
import Helper from "../helpers/global_helper";
import crypto from 'crypto';
import AuthService from "./services/auth";
import no_connection_window from "./windows/no_connection_window";
import sign_in_window from "./windows/sign_in_window";
import { BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import StorageService from "./services/storage";
import sign_up_window from "./windows/sign_up_window";
import explorer_window from "./windows/explorer_window";
const { app } = require('electron');

const internetAvailable = require('internet-available');

app.on('ready', () => {

    StorageService.integrityCeck();

    if (!AuthService.getAppUuid()) {
        AuthService.generateAppUuid();
    }

    const authCheck = () => {
        AuthService.checkAuthentication((is_authenticated: boolean) => {
            if (!is_authenticated) sign_in_window();
            else explorer_window();
        });
    }

    internetAvailable({
        timeout: 5000,
        retries: 5
    })
    .then(() => {
        axios.get(Helper.buildRequestUrl('ping'))
        .then((res: AxiosResponse) => {
            if (res.data === 'pong') authCheck(); //Check if user is already signed in (according to the server)
            else no_connection_window(authCheck);
        })
        .catch(() => no_connection_window(authCheck));
    })
    .catch(() => no_connection_window(authCheck));

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
        sign_in_window(has_signed_up);
        if (win) win.close();
    })

    ipcMain.handle('show-sign-up-window', (e: IpcMainInvokeEvent) => {
        const win = BrowserWindow.fromWebContents(e.sender);
        sign_up_window();
        if (win) win.close();
    })

    ipcMain.handle('sign-in', async(event: IpcMainInvokeEvent, token: string, user_uuid: string, username: string) => {
        if (token) AuthService.setSessionToken(token);
        if (user_uuid) AuthService.setUserUuid(user_uuid);
        if (username) AuthService.setUsername(username);
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        explorer_window();
        win?.close();
    })

    ipcMain.handleOnce('quit-app', async() => {
        app.quit()
    })

    ipcMain.handle('log-out', async(event: IpcMainInvokeEvent) => {
        AuthService.logOut(() => {
            const webContents = event.sender;
            const win = BrowserWindow.fromWebContents(webContents);
            win?.close();
            sign_in_window();
        })
    })
});