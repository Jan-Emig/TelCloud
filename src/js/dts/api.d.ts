export interface ElectronAPI {
    signIn(token: string, user_uuid: string, username: string): void,
    setSessionToken(token: string): void,
    getSessionToken(): Promise<string>,
    getUsername(): Promise<string>,
    getAppPath(dir: string): Promise<string>,
    getAppUuid(): Promise<string>,
    showSignUpWindow(): Promise<void>,
    showSignInWindow(): Promise<void>,
}

declare global {
    interface Window {
        api: ElectronAPI,
    }
}