import axios, { AxiosResponse } from "axios";
import { BrowserWindow } from "electron";
import { Helper } from "../../helpers/helper";
import sign_in_window from "./sign_in_window";

const internetAvailable = require('internet-available');

const no_connection_window = () => {
    const win = new BrowserWindow({
        width: 470,
        height: 580,
        minWidth: 250,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('../no_connection.html');

    const reconnect = () => {
        internetAvailable({
            timeout: 5000,
            retries: 5
        })
        .then(() => {
            axios.get(Helper.buildRequestUrl('ping'))
            .then((res: AxiosResponse) => {
                if (res.data === 'pong') {
                    clearInterval(reconnect_interval);
                    win.close();
                    sign_in_window();
                }
            });
        });
    }

    const reconnect_interval = setInterval(reconnect, 15000);
    reconnect();
}

export default no_connection_window;