import axios, { AxiosError, AxiosResponse } from "axios";
import { Helper } from "../helpers/helper";
import crypto from 'crypto';
import AuthService from "./services/auth";
import no_connection_window from "./no_connection_window";
import sign_in_window from "./sign_in_window";
import { ipcMain, IpcMainEvent } from "electron";
import StorageService from "./services/storage";
const { app } = require('electron');

const internetAvailable = require('internet-available');

app.on('ready', () => {

    StorageService.integrityCeck();

    // if (!AuthService.getAppUuid()) {
    //     //TODO: Create new app uuid and store it into the interal database
    //     AuthService.generateAppUuid();
    // }

    // internetAvailable({
    //     timeout: 5000,
    //     retries: 5
    // })
    // .then(() => {
    //     axios.get(Helper.buildRequestUrl('ping'))
    //     .then((res: AxiosResponse) => {
    //         if (res.data === 'pong') {
    //             // Check if user is already signed in (according to the server)
    //             if (AuthService.checkAuthentication()) {
                    
    //             } else sign_in_window();
    //         } else no_connection_window();
    //     })
    //     .catch(() => no_connection_window())
    // })
    // .catch(no_connection_window);

    // /**
    //  * IPC Event Handlers
    //  */
    // ipcMain.handle('app-uuid', async () => {
    //     return AuthService.getAppUuid();
    // })

    // ipcMain.handle('session-token', async () => {
    //     return AuthService.getSessionToken();
    // });
});