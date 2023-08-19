import { API_BASEURL } from '../constants';
import {
    UserLoginData,
    SignupResponse,
    UserSignupData,
    VerifyEmailResponse,
    VerifyEmailRequestParams
} from './types/authApi.types';
import { apiSlice } from './api';

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
        }),
        verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequestParams>({
            query: (credentials: VerifyEmailRequestParams) => ({
                url: AUTH_URL + '/verifyemail',
                method: 'POST',
                body: { verification_code: credentials.verification_code },
                headers: { Authorization: `Bearer ${credentials.access_token}` }
            })
        })
    })
})

export type { UserSignupData, UserLoginData }
export const { useLoginMutation, useSignupMutation } = authApiSlice;