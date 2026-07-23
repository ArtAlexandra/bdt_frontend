import api, { type TMessage } from '@bdt/shared/helpers/FetchHelpers';

import type { TEditUserSchema } from '@bdt/shared/schemas/User';
import type { TUser } from './UserTypes';

export const getUser = (): Promise<TUser> => {
    return api.get('/user/get-my-info');
};

export const editUser = (id: string, data: TEditUserSchema): Promise<TUser> => {
    return api.put(`/user/edit/${id}`, data);
};

export const getUsers = (): Promise<TUser[]> => {
    return api.get('/user/all');
};

export const deleteUser = (id: string): Promise<TMessage> => {
    return api.delete(`/user/${id}`);
};
