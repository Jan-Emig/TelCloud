import { Constants } from "./constants";

export default class GlobalHelper {

    /**
     * Builds an absolute path for outgoing requests
     * @param  {string} url
     * @returns {string}
     */
    public static buildRequestUrl(url: string): string { return Constants.SERVER_URL + url; }

}