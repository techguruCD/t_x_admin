import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../features/authSlice";
import { apiSlice } from "../features/apiSlice";

interface RootState {
    auth: AuthState
}

// App disptch type
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        // reducerPath: apiSlice.reducerPath
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware),
});
type AppDispatch = typeof store.dispatch;

export type {
    RootState,
    AppDispatch
}