import { API_BASEURL } from '../constants';
import { apiSlice } from './api';

interface UserSignupData {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

interface UserLoginData {
    email: string,
    password: string
}

interface SignupResponse {
    success: boolean;
    message: string;
    data: {
        user: {
            firstname: string;
            lastname: string;
            email: string;
            role: string;
            _id: string;
            id: string;
            createdAt: string;
            updatedAt: string;
        };
        access_token: string;
    };
}
const AUTH_URL = API_BASEURL + '/auth';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials: UserLoginData) => ({
                url: AUTH_URL + '/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['User']
        }),
        signup: builder.mutation<SignupResponse, UserSignupData>({
            query: (credentials: UserSignupData) => ({
                url: AUTH_URL + '/signup',
                method: 'POST',
                body: credentials
            }),
        })
    })
})

export type { UserSignupData, UserLoginData }
export const { useLoginMutation, useSignupMutation } = authApiSlice;