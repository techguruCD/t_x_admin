import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Get user from local storage
const user: User = JSON.parse(localStorage.getItem("user") as string);

interface AuthState {
    user: User | null,
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    emailVerificationAccessToken?: string,
    accessToken?: string,
    refreshToken?: string,
}
const initialState: AuthState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    emailVerificationAccessToken: undefined,
    accessToken: undefined,
    refreshToken: undefined
};

interface SetCredentialPayload {
    user: User,
    emailVerificationAccessToken: string,
}
interface User {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
        },
        setCredentials: (state, action: PayloadAction<SetCredentialPayload>) => {
            state.user = action.payload.user;
            state.emailVerificationAccessToken = action.payload.emailVerificationAccessToken
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logOut: (state) => {
            state.user = null
            state.accessToken = ''
            state.refreshToken = ''
            localStorage.removeItem("user");
        }
    }
});

export const { reset, setCredentials, logOut } = authSlice.actions;
export type { AuthState }
export default authSlice.reducer;
