import fs from 'fs';
import { app } from 'electron';
import ICredentialFile from '../../renderer/types/ICredentialFile';
import { randomUUID } from 'crypto';

export default class StorageService {

    //TODO: Outsource
    public static readonly cred_path = app.getPath('userData') + '/cred.json';

    /**
     * DEPCRECATED, ASYNCHRONOUS METHOD TO GET THE LOCAL CRED FILE
     */
    public static getCredFile(processFunc: { (err: NodeJS.ErrnoException | null, data: string): void }): boolean {
        try {
            const data = fs.readFileSync(this.cred_path, 'utf8');
            processFunc(null, data);
            return true;
        }
        catch (e) {}
        return false;
    }

    /**
     * Checks the app's integrity by investigating the cred file's content and structure
     * This method automatically creates a new valid cred file if it's detected a faulty file
     * @return {boolean} was_successfull
     */
    public static integrityCeck(): boolean {
        try {
            let faulty_file = false;
            let data = '';
            try {
                data = fs.readFileSync(StorageService.cred_path, 'utf8');
            }
            catch (err: any) { faulty_file = err != null && err.code === 'ENOENT' }
            if (!faulty_file) {
                try {
                    // Examine if cred file contains all required attributes by checking the existence
                    // of all attribute's keys
                    const json_data = JSON.parse(data);
                    faulty_file = !json_data.hasOwnProperty('s_token') || !json_data.hasOwnProperty('app_uuid') || !json_data.hasOwnProperty('u_uuid');
                }
                catch (e) { faulty_file = true; }
            }
            if (faulty_file) {
                // Create new cred file
                let temp_cred_data: ICredentialFile = { s_token: null, app_uuid: '', u_uuid: null, username: null };
                temp_cred_data.app_uuid = randomUUID();
                fs.writeFileSync(this.cred_path, JSON.stringify(temp_cred_data));
            }
            return true;
        }
        catch (e) {}
        return false;
    }
}