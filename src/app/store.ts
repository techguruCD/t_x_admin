import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../slices/authSlice";
import { apiSlice } from "../api/api";

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