import sign_in_window from "./sign_in_window";
const { app } = require('electron');

app.on('ready', () => {
    sign_in_window();
});