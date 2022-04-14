import { contextBridge, ipcRenderer } from 'electron';
import AuthService from '../electron/services/auth';

contextBridge.exposeInMainWorld('api', {
    signIn: (token: string, user_uuid: string, username: string) => ipcRenderer.send('sign-in', token, user_uuid, username),
    getAppUuid: () => ipcRenderer.invoke('app-uuid'),
    setSessionToken: (token: string) => ipcRenderer.send('set-session-token', token),
    getSessionToken: () => ipcRenderer.invoke('session-token'),
    getUsername: () => ipcRenderer.invoke('get-username'),
});