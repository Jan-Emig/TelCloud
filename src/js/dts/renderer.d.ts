export interface ElectronAPI {
    signIn(): void,
    getAppUuid(): string
}

declare global {
    interface Window {
        api: ElectronAPI,
    }
}