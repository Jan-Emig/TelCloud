import axios, { AxiosError, AxiosResponse } from "axios";
import { Helper } from "../helpers/helper";

export default class Auth {
    public static checkAuthentication(): boolean {
        // OLD AUTHENTICATION CHECK
        // axios.get(Helper.buildRequestUrl('auth-check'))
        // .then((res: AxiosResponse) => {
        //     if (res.status === 200 && res.data.length == 'OK') return true;
        // })
        // .catch();
        // return false;
        axios.get(Helper.buildRequestUrl('auth-check'), { params: { app_uuid: this.getAppUuid() }})
        .then((res: AxiosResponse) => {
            if (res.status === 200 && res.data.length) {
                return res.data;
            }
        })
        .catch();
        return false;
    }

    public static getAppUuid(): string {
        //TODO: Outsoure data to database or encrypted file
        let app_uuid = '50ebb47e-8025-40bf-a3fb-b91da2554ba5';
        return app_uuid;
    }
}