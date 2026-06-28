class LocalStorage {
    private isLocalStorageAvailable: boolean;
    private memoryStorage: Record<string, unknown>;

    constructor() {
        this.isLocalStorageAvailable = this.checkLocalStorage();
        this.memoryStorage = {};
    }

    private checkLocalStorage() {
        if (typeof window === 'undefined') {
            if (process.env.NODE_ENV === 'development') {
                console.warn('localStorage is not available');
            }
            return false;
        }

        try {
            const testKey = '__test__';

            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);

            return true;
        } catch (error) {
            console.warn('localStorage is not available:', error);
            return false;
        }
    }

    setItem<T>(key: string, value: T) {
        try {
            if (this.isLocalStorageAvailable) {
                localStorage.setItem(key, JSON.stringify(value));
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
            if (this.isLocalStorageAvailable) {
                const value = localStorage.getItem(key);
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
            if (this.isLocalStorageAvailable) {
                localStorage.removeItem(key);
            }
            delete this.memoryStorage[key];
        } catch (error) {
            console.error('Error removing from storage:', error);
            delete this.memoryStorage[key];
        }
    }

    clear() {
        try {
            if (this.isLocalStorageAvailable) {
                localStorage.clear();
            }
            this.memoryStorage = {};
        } catch (error) {
            console.error('Error clearing storage:', error);
            this.memoryStorage = {};
        }
    }
}

export const storage = new LocalStorage();
