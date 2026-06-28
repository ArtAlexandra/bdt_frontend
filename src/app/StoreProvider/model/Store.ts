import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { baseRtkQueryApi } from '@bdt/shared/helpers/RtkQueryHelpers';

const rootReducer = combineReducers({
    [baseRtkQueryApi.reducerPath]: baseRtkQueryApi.reducer,
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            baseRtkQueryApi.middleware,
        ),
    });
};

// Infer the type of makeStore
export type TAppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<TAppStore['getState']>
export type TAppDispatch = TAppStore['dispatch']
