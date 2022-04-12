import axios, { AxiosResponse } from "axios";
import { randomUUID } from 'crypto';
import { Helper } from "../../helpers/helper";

//TODO: Remove hardcoded params and request them fromt he responsible source (db or encrypted file)
let app_uuid = '50ebb47e-8025-40bf-a3fb-b91da2554ba5';
let s_token: string = '';

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
                return true;
            }
        }
        catch (Exception) { }
        return false;
    }

    public static getSessionToken(): string {
        return s_token;
    }
}