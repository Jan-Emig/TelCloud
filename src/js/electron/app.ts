import axios, { AxiosError, AxiosResponse } from "axios";
import { Helper } from "../helpers/helper";
import no_connection_window from "./no_connection_window";
import sign_in_window from "./sign_in_window";
const { app } = require('electron');

const internetAvailable = require('internet-available');

app.on('ready', () => {

    internetAvailable({
        timeout: 5000,
        retries: 5
    })
    .then(() => {
        axios.get(Helper.buildRequestUrl('ping'))
        .then((res: AxiosResponse) => {
            if (res.data === 'pong!') {
                sign_in_window();
            } else no_connection_window();
        })
    })
    .catch(no_connection_window);
});