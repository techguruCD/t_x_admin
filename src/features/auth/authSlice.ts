import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import authService, { UserSignupData } from "./authService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user") as string);

interface AuthState {
    user: any,
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    errorMessage: string,
    message: string
}
const initalState: AuthState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
    message: "",
};

export const signup = createAsyncThunk(
    "auth/signup",
    async (user: UserSignupData, { rejectWithValue }) => {
        try {
            return await authService.signup(user);
        } catch (error: any) {
            const message = error.response.data.message;
            return rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: initalState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.user = action.payload.user
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload as string;
                state.message = action.payload as string;
            });

    },
});

export const { reset } = authSlice.actions;
export type { AuthState }
export default authSlice.reducer;
