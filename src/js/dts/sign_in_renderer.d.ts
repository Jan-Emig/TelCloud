export interface ElectronAPI {
    signIn(token: string): void,
    getAppUuid(): string,
    setSessionToken(token: string): void,
    getSessionToken(): string,
}

declare global {
    interface Window {
        api: ElectronAPI,
    }
}