import api, { type TMessage } from '@bdt/shared/helpers/FetchHelpers';

import type { TAuthResponse, TLogin, TRegister } from './AuthApiTypes';

export const login = (data: TLogin): Promise<TAuthResponse> => {
    return api.post('/auth/login', data);
};

export const register = (data: TRegister): Promise<TAuthResponse> => {
    return api.post('/auth/register', data);
};

export const logout = (data: { refreshToken: string }): Promise<TMessage> => {
    return api.post('/auth/logout', data);
};
