import { contextBridge, ipcRenderer } from 'electron';
import AuthService from '../electron/services/auth';

contextBridge.exposeInMainWorld('api', {
    signIn: (token: string, user_uuid: string) => ipcRenderer.send('sign-in', token, user_uuid),
    getAppUuid: () => ipcRenderer.invoke('app-uuid'),
    setSessionToken: (token: string) => ipcRenderer.send('set-session-token', token),
    getSessionToken: () => ipcRenderer.invoke('session-token'),
});