import { BrowserWindow } from "electron"
import path from "path";

const explorer_window = () => {
    const explorer_win = new BrowserWindow({
        width: 1000,
        height: 600,
        minWidth: 350,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'api_preload.js')
        }
    })

    explorer_win.loadFile('../explorer.html');
} 

export default explorer_window;