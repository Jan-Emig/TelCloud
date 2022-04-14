export default interface ICredentialFile {
    s_token: string | null; // Session Token
    app_uuid: string; // App Uuid
    u_uuid: string | null; // User Uuid
    username: string | null;
}