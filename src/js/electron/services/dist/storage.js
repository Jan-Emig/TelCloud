"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var electron_1 = require("electron");
var StorageService = /** @class */ (function () {
    function StorageService() {
    }
    StorageService.getCredFile = function (processFunc) {
        try {
            var data = fs_1["default"].readFileSync(this.cred_path, 'utf8');
            processFunc(null, data);
            return true;
        }
        catch (e) { }
        return false;
    };
    StorageService.integrityCeck = function () {
        try {
            var faulty_file = false;
            var data = '';
            try {
                data = fs_1["default"].readFileSync(StorageService.cred_path, 'utf8');
            }
            catch (err) {
                faulty_file = err != null && err.code === 'ENOENT';
            }
            if (!faulty_file) {
                try {
                    // Examine if cred file contains all required attributes by checking the existence
                    // of all attribute's keys
                    var json_data = JSON.parse(data);
                    faulty_file = !json_data.hasOwnProperty('s_token') || !json_data.hasOwnProperty('app_uuid') || !json_data.hasOwnProperty('u_uuid');
                }
                catch (e) {
                    faulty_file = true;
                }
            }
            if (faulty_file) {
                // Create new cred file
                var temp_cred_data = { s_token: null, app_uuid: '', u_uuid: null, username: null };
                fs_1["default"].writeFile(this.cred_path, JSON.stringify(temp_cred_data), function (err) { if (err)
                    throw err; });
            }
            return true;
        }
        catch (e) { }
        return false;
    };
    //TODO: Outsource
    StorageService.cred_path = electron_1.app.getPath('userData') + '/cred.json';
    return StorageService;
}());
exports["default"] = StorageService;
