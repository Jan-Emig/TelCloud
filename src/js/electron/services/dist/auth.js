"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var fs_1 = require("fs");
var crypto_1 = require("crypto");
var validator_1 = require("validator");
var helper_1 = require("../../helpers/helper");
var storage_1 = require("./storage");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.checkAuthentication = function (callback) {
        var _this = this;
        axios_1["default"].get(helper_1.Helper.buildRequestUrl('auth-check'), {
            params: {
                s_token: this.getSessionToken(),
                app_uuid: this.getAppUuid(),
                u_uuid: this.getUserUuid()
            }
        })
            .then(function (res) {
            if (res.status === 200 && res.data.length) {
                var s_token = res.data;
                _this.setSessionToken(s_token);
                callback(true);
            }
        })["catch"](function () { return callback(false); });
    };
    /**
     * Synchronously generates a new app uuid and simultaneously creates a new cred file if neccessary
     * @returns string (app uuid)
     */
    AuthService.generateAppUuid = function () {
        try {
            var temp_cred_data = { s_token: null, app_uuid: '', u_uuid: null, username: null };
            var data = '';
            var json_data = { s_token: null, app_uuid: '', u_uuid: null, username: null };
            try {
                data = fs_1["default"].readFileSync(storage_1["default"].cred_path, 'utf8');
                json_data = JSON.parse(data);
            }
            catch (err) {
                if (err && err.code === 'ENOENT')
                    temp_cred_data.app_uuid = crypto_1.randomUUID(); // Create new cred file if it doesn't exist'
            }
            json_data.app_uuid = temp_cred_data.app_uuid;
            fs_1["default"].writeFileSync(storage_1["default"].cred_path, JSON.stringify(json_data));
            return temp_cred_data.app_uuid;
        }
        catch (e) {
            throw new Error('App id could not be set.');
        }
    };
    /**
     * Synchronously reads the app uuid from the existing cred file or generates one if needed
     * @return {string} app uuid
     */
    AuthService.getAppUuid = function () {
        var uuid = '';
        try {
            var data = fs_1["default"].readFileSync(storage_1["default"].cred_path, 'utf8');
            var json_data = JSON.parse(data);
            uuid = (!json_data.app_uuid) ? this.generateAppUuid() : json_data.app_uuid;
        }
        catch (e) {
            throw new Error('App id could not be read');
        }
        return uuid;
    };
    /**
     * Synchronously sets a new session token and stores it in the local cred loadFile
     * @param  {string} session token
     * @return {boolean} was_successfull
     */
    AuthService.setSessionToken = function (token) {
        token = token.trim();
        try {
            if (token.length === 64) {
                var data = fs_1["default"].readFileSync(storage_1["default"].cred_path, 'utf8');
                var temp_cred_data = { s_token: null, app_uuid: '', u_uuid: null, username: null };
                var json_data = JSON.parse(data);
                temp_cred_data.s_token = token;
                temp_cred_data.app_uuid = json_data.app_uuid;
                temp_cred_data.u_uuid = json_data.u_uuid;
                fs_1["default"].writeFileSync(storage_1["default"].cred_path, JSON.stringify(temp_cred_data));
                return true;
            }
        }
        catch (e) { }
        return false;
    };
    /**
     * Synchronously Reads the current session token fromt the local cred file
     * @return {string|null} session_token
     **/
    AuthService.getSessionToken = function () {
        try {
            var data = fs_1["default"].readFileSync(storage_1["default"].cred_path, 'utf8');
            var cred_data = JSON.parse(data);
            var s_token = cred_data.s_token;
            return s_token;
        }
        catch (e) { }
        return null;
    };
    /**
     * Synchronously reads the current user uuid from the local cred file
     * @return {string|null} user_uuid
     */
    AuthService.getUserUuid = function () {
        try {
            var data = fs_1["default"].readFileSync(storage_1["default"].cred_path, 'utf8');
            var cred_data = JSON.parse(data);
            return cred_data.u_uuid;
        }
        catch (e) { }
        return null;
    };
    /**
     * Synchronously sets the new user uuid and stores it in the local cred file
     * @param {string} user_uuid
     * @return {boolean} was_successfull
     */
    AuthService.setUserUuid = function (uuid) {
        if (validator_1["default"].isUUID(uuid)) {
            try {
                var data = fs_1["default"].readFileSync(storage_1["default"].cred_path, 'utf8');
                var cred_data = JSON.parse(data);
                cred_data.u_uuid = uuid;
                fs_1["default"].writeFileSync(storage_1["default"].cred_path, JSON.stringify(cred_data));
                return true;
            }
            catch (e) { }
        }
        return false;
    };
    /**
     * Synchronously reads the stored username from the local cred file
     * @return {string|null} username
     */
    AuthService.getUsername = function () {
        try {
            var data = fs_1["default"].readFileSync(storage_1["default"].cred_path, 'utf8');
            var cred_data = JSON.parse(data);
            return cred_data.username;
        }
        catch (e) { }
        return null;
    };
    /**
     * Sets the new username and stores it in the local cred file
     * @param {string} username
     * @return {boolean} was_successfull
     */
    AuthService.setUsername = function (username) {
        if (username.length > 0) {
            try {
                var data = fs_1["default"].readFileSync(storage_1["default"].cred_path, 'utf8');
                var cred_data = JSON.parse(data);
                cred_data.username = username.trim();
                fs_1["default"].writeFileSync(storage_1["default"].cred_path, JSON.stringify(cred_data));
                return true;
            }
            catch (e) { }
        }
        return false;
    };
    return AuthService;
}());
exports["default"] = AuthService;
