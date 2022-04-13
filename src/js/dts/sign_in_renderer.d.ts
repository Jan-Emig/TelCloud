export interface ElectronAPI {
    signIn(token: string, user_uuid: string): void,
    getAppUuid(): Promise<string>,
    setSessionToken(token: string): void,
    getSessionToken(): Promise<string>,
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