export interface ElectronAPI {
    signIn(): void
}

declare global {
    interface Window {
        api: ElectronAPI,
    }
}