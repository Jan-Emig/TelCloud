import { BrowserWindow, screen } from "electron"
import path from "path";

const explorer_window = () => {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const explorer_win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 600,
        minHeight: 400,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'api_preload.js')
        }
    })

    explorer_win.loadFile('../explorer.html');
} 

export default explorer_window;