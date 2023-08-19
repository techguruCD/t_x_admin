import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../features/auth/authSlice";

interface RootState {
    auth: AuthState
}

// App disptch type
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
type AppDispatch = typeof store.dispatch;

export type {
    RootState,
    AppDispatch
}