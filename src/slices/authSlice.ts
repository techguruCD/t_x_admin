import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BasicAuthTokenPayload {
    credentialType: 'basic',
    accessToken: string,
    refreshToken: string
}
interface EmailVerificationAuthTokenPayload {
    credentialType: 'emailVerification',
    emailVerificationToken: string
}
interface PasswordResetAuthTokenPayload {
    credentialType: 'passwordReset',
    passwordResetAccessToken: string
}
type AuthTokenPayload = BasicAuthTokenPayload | EmailVerificationAuthTokenPayload | PasswordResetAuthTokenPayload

type SetCredentialPayload = {
    user: User,
} & AuthTokenPayload

interface User {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}
const user: User = JSON.parse(localStorage.getItem("user") as string);

interface AuthState {
    user: User | null,
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    emailVerificationToken?: string,
    passwordResetToken?: string,
    accessToken?: string,
    refreshToken?: string,
}
const initialState: AuthState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    emailVerificationToken: undefined,
    accessToken: undefined,
    refreshToken: undefined
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.accessToken = undefined
            state.refreshToken = undefined
            state.emailVerificationToken = undefined
            state.passwordResetToken = undefined
        },
        setCredentials: (state, action: PayloadAction<SetCredentialPayload>) => {
            state.user = action.payload.user;

            switch (action.payload.credentialType) {
                case 'basic':
                    state.accessToken = action.payload.accessToken
                    state.refreshToken = action.payload.refreshToken
                    break;
                case 'emailVerification':
                    state.emailVerificationToken = action.payload.emailVerificationToken
                    break;
                case 'passwordReset':
                    break;
            }

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
