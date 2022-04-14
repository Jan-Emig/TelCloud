export interface ElectronAPI {
    signIn(token: string, user_uuid: string, username: string): void,
    getAppUuid(): Promise<string>,
    setSessionToken(token: string): void,
    getSessionToken(): Promise<string>,
    getUsername(): Promise<string>,
}

export interface App {
    getAppPath(dir: string): Promise<string>
}

declare global {
    interface Window {
        api: ElectronAPI,
        app: App
    }
}