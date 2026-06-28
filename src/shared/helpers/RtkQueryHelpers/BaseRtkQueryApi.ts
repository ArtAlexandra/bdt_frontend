import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_TAGS, BASE_REDUCER_PATH } from './BaseRtkQueryApiTypes';

export const baseRtkQueryApi = createApi({
    reducerPath: BASE_REDUCER_PATH,
    baseQuery: fakeBaseQuery(),
    tagTypes: Object.values(API_TAGS),
    endpoints: () => ({}),
});
