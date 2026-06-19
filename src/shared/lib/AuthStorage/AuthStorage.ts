import { storage } from '@bdt/shared/lib/LocalStorage';

export class AuthStorage {
    static setToken(token: string) {
        storage.setItem('accessToken', token);
    }

    static setRefreshToken(token: string) {
        storage.setItem('refreshToken', token);
    }

    static getToken() {
        return storage.getItem<string>('accessToken');
    }

    static getRefreshToken() {
        return storage.getItem<string>('refreshToken');
    }

    static clear() {
        storage.removeItem('accessToken');
        storage.removeItem('refreshToken');
    }
}
