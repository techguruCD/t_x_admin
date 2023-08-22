import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../slices/authSlice";
import dashboardReducer, { DashboardState } from "../slices/dashboardSlice";
import { apiSlice } from "../api/api";

interface RootState {
    auth: AuthState;
    dashboard: DashboardState;
}

// App disptch type
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        dashboard: dashboardReducer
        // reducerPath: apiSlice.reducerPath
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware),
    devTools: false
});
type AppDispatch = typeof store.dispatch;

export type {
    RootState,
    AppDispatch
}