import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    signIn: (token: string, user_uuid: string, username: string) => ipcRenderer.invoke('sign-in', token, user_uuid, username),
    getAppUuid: () => ipcRenderer.invoke('app-uuid'),
    setSessionToken: (token: string) => ipcRenderer.invoke('set-session-token', token),
    getSessionToken: () => ipcRenderer.invoke('session-token'),
    getUsername: () => ipcRenderer.invoke('get-username'),
});