import { contextBridge, ipcRenderer } from 'electron';
import Auth from '../electron/auth';

contextBridge.exposeInMainWorld('api', {
    signIn: () => ipcRenderer.send('sign-in'),
    getAppUuid: Auth.getAppUuid,
});