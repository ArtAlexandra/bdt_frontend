export type TApiError = {
    success: false;
    error: {
        message: string;
        code: number
    }
}
export type TApiSuccess<T = unknown> = {
    success: true;
    data: T;
}

export type TApiResponse<T = unknown> = TApiError | TApiSuccess<T>;

export type TMessage = {
    message: string;
};

export type TPaginated<T> = {
    items: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
};
