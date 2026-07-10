export type TLogin = {
    email: string;
    password: string;
};

export type TUser = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    name: string;
};

export type TAuthResponse = {
    user: TUser;
    accessToken: string;
    refreshToken: string;
};

export type TRegister = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    isAdmin: boolean;
};
