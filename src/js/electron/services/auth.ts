import axios, { AxiosResponse } from "axios";
import fs from 'fs';
import { randomUUID } from 'crypto';
import { Helper } from "../../helpers/helper";
import { AppConstants } from '../helpers/app_constants';
import { app } from "electron";
import ICredentialFile from "../../renderer/types/ICredentialFile";
import StorageService from "./storage";

//TODO: Remove hardcoded params and request them fromt he responsible source (db or encrypted file)
export default class AuthService {
    
    private static cred_data: ICredentialFile = {
        s_token: null, 
        app_uuid: '50ebb47e-8025-40bf-a3fb-b91da2554ba5',
        u_uuid: null
    }

    public static checkAuthentication(): boolean {
        axios.get(Helper.buildRequestUrl('auth-check'), { params: { app_uuid: this.getAppUuid() }})
        .then((res: AxiosResponse) => {
            if (res.status === 200 && res.data.length) {
                return res.data;
            }
        })
        .catch();
        return false;
    }

    public static generateAppUuid(): string {
        try {
            StorageService.getCredFile((err, data) => {
                let temp_cred_data: ICredentialFile = { s_token: null, app_uuid: '', u_uuid: null };
                if (err && err.code === 'ENOENT') temp_cred_data.app_uuid = randomUUID(); // Create new cred file if it doesn't exist'
                else if (err) throw err;
                let json_data = JSON.parse(data);
                json_data.app_uuid = temp_cred_data.app_uuid;
                fs.writeFile(StorageService.cred_path, JSON.stringify(this.cred_data), (err) => { if (err) throw err; })
                return temp_cred_data.app_uuid;
            })
        }
        catch (e) {throw new Error('App id could not be set.')}
        return '';
    }

    public static getAppUuid(): string {
        //TODO: Outsoure data to database or encrypted file
        try
        {
            StorageService.getCredFile((err, data) => {
                if (err) throw err;
                const json_data = JSON.parse(data);
                return (!json_data.app_uuid) ? this.generateAppUuid() : json_data.app_uuid;
            });
        }
        catch (e) { throw new Error('App id could not be read')}
        return '';
    }

    public static setSessionToken(token: string): boolean {
        //TODO: outsource session token to database or encrypted file
        token = token.trim();
        try {
            if (token.length === 64) {
                this.cred_data.s_token = token;
                StorageService.getCredFile((err, data) => {
                    let temp_cred_data: ICredentialFile = { s_token: null, app_uuid: '', u_uuid: null };
                    const json_data = JSON.parse(data);
                    temp_cred_data.s_token = json_data.s_token;
                    temp_cred_data.app_uuid = json_data.app_uuid;
                    temp_cred_data.u_uuid = json_data.u_uuid;

                    this.cred_data.s_token = temp_cred_data.s_token;
                    console.log(this.cred_data);
                    fs.writeFile(StorageService.cred_path, JSON.stringify(this.cred_data), (err) => { if (err) throw err; });
                })
                // fs.readFile(cred_path, 'utf8', (err, data) => {
                //     let cred_data: ICredentialFile = { s_token: null, app: '', u_uuid: null };

                //     if (err && err.code === 'ENOENT') cred_data.app = this.getAppUuid(); // Create new cred file if it doesn't exist'
                //     else if (err) throw err;
                //     else cred_data = JSON.parse(data);

                //     cred_data.s_token = s_token;
                //     fs.writeFile(cred_path, JSON.stringify(cred_data), (err) => { if (err) throw err; });
                // });
                return true;
            }
        }
        catch (e) {
            console.log(e);
         }
        return false;
    }

    public static getSessionToken(): string | null {
        try {
            StorageService.getCredFile((err, data) => {
                if (err) throw err;
                const cred_data = JSON.parse(data);
                const s_token = cred_data.s_token;
            })
        }
        catch (e) {}
        return null;
    }

    public static getUserUuid(): string | null {
        try {
            StorageService.getCredFile((err, data) => {
                if (err) throw err;
                const cred_data = JSON.parse(data);
                return cred_data.u_uuid;
            })
                
        }
        catch (e) { console.log(e); }
        return null;
    }

    public static setUserUuid(value: string) {

    }
}