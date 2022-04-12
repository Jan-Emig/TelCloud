import { contextBridge, ipcRenderer } from 'electron';
import AuthService from '../electron/services/auth';

contextBridge.exposeInMainWorld('api', {
    signIn: (token: string) => ipcRenderer.send('sign-in', token),
    getAppUuid: AuthService.getAppUuid,
    setSessionToken: (token: string) => ipcRenderer.send('set-session-token', token),
    getSessionToken: AuthService.getSessionToken
});