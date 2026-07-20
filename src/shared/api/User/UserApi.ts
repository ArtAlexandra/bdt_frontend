import api, { type TMessage } from '@bdt/shared/helpers/FetchHelpers';

import type { TUser } from './UserTypes';

export const getUser = (): Promise<TUser> => {
    return api.get('/user/get-my-info');
};

export const logout = (data: { refreshToken: string }): Promise<TMessage> => {
    return api.post('/auth/logout', data);
};
