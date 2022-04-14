import axios, { AxiosResponse } from "axios";
import fs from 'fs';
import { randomUUID } from 'crypto';
import validator from 'validator';
import { Helper } from "../../helpers/helper";
import ICredentialFile from "../../renderer/types/ICredentialFile";
import StorageService from "./storage";

//TODO: Remove hardcoded params and request them fromt he responsible source (db or encrypted file)
export default class AuthService {

    public static checkAuthentication(callback: { (is_authenticated: boolean): void }): void {
        axios.get(Helper.buildRequestUrl('auth-check'), { 
            params: { 
                s_token: this.getSessionToken(), 
                app_uuid: this.getAppUuid(),
                u_uuid: this.getUserUuid()
            }
        })
        .then((res: AxiosResponse) => {
            if (res.status === 200 && res.data.length) {
                const s_token = res.data;
                this.setSessionToken(s_token);
                callback(true);
            }
        })
        .catch(() => callback(false));
    }

    /**
     * Synchronously generates a new app uuid and simultaneously creates a new cred file if neccessary
     * @returns string (app uuid)
     */
    public static generateAppUuid(): string {
        try {
            let temp_cred_data: ICredentialFile = { s_token: null, app_uuid: '', u_uuid: null, username: null,};
            let data = '';
            let json_data: ICredentialFile = { s_token: null, app_uuid: '', u_uuid: null, username: null }
            try {
                data = fs.readFileSync(StorageService.cred_path, 'utf8');
                json_data = JSON.parse(data);
            }
            catch (err: any) {
                if (err && err.code === 'ENOENT') temp_cred_data.app_uuid = randomUUID(); // Create new cred file if it doesn't exist'
            }
            json_data.app_uuid = temp_cred_data.app_uuid;
            fs.writeFileSync(StorageService.cred_path, JSON.stringify(json_data))
            return temp_cred_data.app_uuid;
        }
        catch (e) {throw new Error('App id could not be set.')}
    }

    /**
     * Synchronously reads the app uuid from the existing cred file or generates one if needed
     * @return {string} app uuid
     */
    public static getAppUuid(): string {
        //TODO: Outsoure data to database or encrypted file
        let uuid = '';
        try
        {
            const data = fs.readFileSync(StorageService.cred_path, 'utf8');
            const json_data = JSON.parse(data);
            uuid =  (!json_data.app_uuid) ? this.generateAppUuid() : json_data.app_uuid;
        }
        catch (e) { throw new Error('App id could not be read')}
        return uuid;
    }

    /**
     * Synchronously sets a new session token and stores it in the local cred loadFile
     * @param  {string} session token
     * @return {boolean} was_successfull
     */
    public static setSessionToken(token: string): boolean {
        //TODO: outsource session token to database or encrypted file
        token = token.trim();
        try {
            if (token.length === 64) {
                const data = fs.readFileSync(StorageService.cred_path, 'utf8');
                let temp_cred_data: ICredentialFile = { s_token: null, app_uuid: '', u_uuid: null, username: null };
                const json_data = JSON.parse(data);
                temp_cred_data.s_token = token;
                temp_cred_data.app_uuid = json_data.app_uuid;
                temp_cred_data.u_uuid = json_data.u_uuid;
                fs.writeFileSync(StorageService.cred_path, JSON.stringify(temp_cred_data));
                return true;
            }
        }
        catch (e) { }
        return false;
    }

    /**
     * Synchronously Reads the current session token fromt the local cred file
     * @return {string|null} session_token
     **/
    public static getSessionToken(): string | null {
        try {
            const data = fs.readFileSync(StorageService.cred_path, 'utf8');
            const cred_data = JSON.parse(data);
            const s_token = cred_data.s_token;
            return s_token;
        }
        catch (e) {}
        return null;
    }

    /**
     * Synchronously reads the current user uuid from the local cred file
     * @return {string|null} user_uuid
     */
    public static getUserUuid(): string | null {
        try {
            const data = fs.readFileSync(StorageService.cred_path, 'utf8');
            const cred_data = JSON.parse(data);
            return cred_data.u_uuid;
        }
        catch (e) {  }
        return null;
    }

    /**
     * Synchronously sets the new user uuid and stores it in the local cred file
     * @param {string} user_uuid
     * @return {boolean} was_successfull
     */
    public static setUserUuid(uuid: string): boolean {
        if (validator.isUUID(uuid)) {
            try {
                const data = fs.readFileSync(StorageService.cred_path, 'utf8');
                const cred_data = JSON.parse(data);
                cred_data.u_uuid = uuid;
                fs.writeFileSync(StorageService.cred_path, JSON.stringify(cred_data));
                return true;
            }
            catch (e) { }
        }
        return false;
    }

    /**
     * Synchronously reads the stored username from the local cred file
     * @return {string|null} username
     */
    public static getUsername(): string | null {
        try {
            const data = fs.readFileSync(StorageService.cred_path, 'utf8');
            const cred_data = JSON.parse(data);
            return cred_data.username;
        }
        catch (e) {  }
        return null;
    }

    /**
     * Sets the new username and stores it in the local cred file
     * @param {string} username 
     * @return {boolean} was_successfull
     */
    public static setUsername(username: string): boolean {
        if (username.length > 0) {
            try {
                const data = fs.readFileSync(StorageService.cred_path, 'utf8');
                const cred_data = JSON.parse(data);
                cred_data.username = username.trim();
                fs.writeFileSync(StorageService.cred_path, JSON.stringify(cred_data));
                return true;
            }
            catch (e) { }
        }
        return false;
    }
}