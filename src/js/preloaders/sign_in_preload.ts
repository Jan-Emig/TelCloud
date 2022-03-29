import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    signIn: () => ipcRenderer.send('sign-in'),
});