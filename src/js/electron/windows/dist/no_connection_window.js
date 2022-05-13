"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var electron_1 = require("electron");
var helper_1 = require("../../helpers/helper");
var internetAvailable = require('internet-available');
var no_connection_window = function (authCheck) {
    var win = new electron_1.BrowserWindow({
        width: 470,
        height: 580,
        minWidth: 250,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('../no_connection.html');
    var reconnect = function () {
        internetAvailable({
            timeout: 5000,
            retries: 5
        })
            .then(function () {
            axios_1["default"].get(helper_1.Helper.buildRequestUrl('ping'))
                .then(function (res) {
                if (res.data === 'pong') {
                    clearInterval(reconnect_interval);
                    win.close();
                    authCheck();
                }
            });
        });
    };
    var reconnect_interval = setInterval(reconnect, 15000);
    reconnect();
};
exports["default"] = no_connection_window;
