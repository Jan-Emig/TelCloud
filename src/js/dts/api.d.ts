export interface ElectronAPI {
    signIn(token: string, user_uuid: string, username: string): void,
    setSessionToken(token: string): void,
    getSessionToken(): Promise<string>,
    getUsername(): Promise<string>,
    showSignUpWindow(): Promise<void>,
    getAppPath(dir: string): Promise<string>,
    getAppUuid(): Promise<string>
}

declare global {
    interface Window {
        api: ElectronAPI,
    }
}