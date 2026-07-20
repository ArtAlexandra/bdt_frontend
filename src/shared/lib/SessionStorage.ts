class SessionStorage {
    private isSessionStorageAvailable: boolean;
    private memoryStorage: Record<string, unknown>;

    constructor() {
        this.isSessionStorageAvailable = this.checkSessionStorage();
        this.memoryStorage = {};
    }

    private checkSessionStorage() {
        if (typeof window === 'undefined') {
            if (process.env.NODE_ENV === 'development') {
                console.warn('sessionStorage is not available');
            }
            return false;
        }

        try {
            const testKey = '__test__';

            sessionStorage.setItem(testKey, testKey);
            sessionStorage.removeItem(testKey);

            return true;
        } catch (error) {
            console.warn('sessionStorage is not available:', error);
            return false;
        }
    }

    setItem<T>(key: string, value: T) {
        try {
            if (this.isSessionStorageAvailable) {
                sessionStorage.setItem(key, JSON.stringify(value));
            } else {
                this.memoryStorage[key] = value;
            }
        } catch (error) {
            console.error('Error saving to storage:', error);
            this.memoryStorage[key] = value;
        }
    }

    getItem<T>(key: string): T | null {
        try {
            if (this.isSessionStorageAvailable) {
                const value = sessionStorage.getItem(key);
                return value ? JSON.parse(value) : null;
            }

            return this.memoryStorage[key] as (T | null) ?? null;
        } catch (error) {
            console.error('Error getting from storage:', error);
            return this.memoryStorage[key] as (T | null) ?? null;
        }
    }

    removeItem(key: string) {
        try {
            if (this.isSessionStorageAvailable) {
                sessionStorage.removeItem(key);
            }
            delete this.memoryStorage[key];
        } catch (error) {
            console.error('Error removing from storage:', error);
            delete this.memoryStorage[key];
        }
    }

    clear() {
        try {
            if (this.isSessionStorageAvailable) {
                sessionStorage.clear();
            }
            this.memoryStorage = {};
        } catch (error) {
            console.error('Error clearing storage:', error);
            this.memoryStorage = {};
        }
    }
}

export const storage = new SessionStorage();
