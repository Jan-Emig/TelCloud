const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
    let sign_in_win = new BrowserWindow({
        width: 390,
        height: 501,
        webPreferences: {
            nodeIntegration: true
        }
    });

    sign_in_win.loadFile('../sign_in.html');
});