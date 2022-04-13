import axios, { AxiosResponse } from "axios";
import fs from 'fs';
import { randomUUID } from 'crypto';
import { Helper } from "../../helpers/helper";
import { AppConstants } from '../helpers/app_constants';
import { app } from "electron";

//TODO: Remove hardcoded params and request them fromt he responsible source (db or encrypted file)
let app_uuid = '50ebb47e-8025-40bf-a3fb-b91da2554ba5';
let s_token: string = '';

interface JsonTest {
    s_token: string;
    app: string;
    uname: string;
}

export default class AuthService {


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

    public static setAppUuid() {
        app_uuid = randomUUID();
    }

    public static getAppUuid(): string {
        //TODO: Outsoure data to database or encrypted file
        return app_uuid;
    }

    public static setSessionToken(token: string): boolean {
        //TODO: outsource session token to database or encrypted file
        token = token.trim();
        try {
            if (token.length === 64) {
                s_token = token;
                const cred_path = app.getPath('userData') + '/cred.json'
                fs.readFile(cred_path, 'utf8', (err, data) => {
                    let cred_data: JsonTest = { s_token: '', app: '', uname: '' };

                    if (err && err.code === 'ENOENT') cred_data.app = this.getAppUuid(); // Create new cred file if it doesn't exist'
                    else if (err) throw err;
                    else cred_data = JSON.parse(data);

                    cred_data.s_token = s_token;
                    fs.writeFile(cred_path, JSON.stringify(cred_data), (err) => { if (err) throw err; });
                });
                return true;
            }
        }
        catch (e) {
            console.log(e);
         }
        return false;
    }

    public static getSessionToken(): string {
        return s_token;
    }
}