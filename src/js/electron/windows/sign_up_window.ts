import { BrowserWindow } from "electron";

const sign_up_window = () => {
    let sign_up_win = new BrowserWindow({
        width: 470,
        height: 580,
        minWidth: 350,
        webPreferences: {
            nodeIntegration: true
        },
    });

    sign_up_win.loadFile('../sign_up.html');
}

export default sign_up_window;