import type { TRegistrationSchema } from '@bdt/shared/schemas/Auth';

export const DEFAULT_VALUES: TRegistrationSchema = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
};
