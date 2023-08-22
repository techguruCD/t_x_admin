import { API_BASEURL } from '../constants';
import {
    UserLoginData,
    LoginResponse,
    SignupResponse,
    UserSignupData,
    VerifyEmailResponse,
    VerifyEmailRequestParams,
    RetryVerifyEmailResponse,
    RetryVerifyEmailRequestParams,
    ForgotPasswordResponse,
    ForgotPasswordRequestParams,
    ResetPasswordResponse,
    ResetPasswordRequestParams
} from './types/authApi.types';
import { apiSlice } from './api';

const AUTH_URL = API_BASEURL + '/auth';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, UserLoginData>({
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
                body: {
                    firstname: credentials.firstname,
                    lastname: credentials.lastname,
                    email: credentials.email.toLowerCase(),
                    password: credentials.password
                }
            }),
        }),
        verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequestParams>({
            query: (credentials: VerifyEmailRequestParams) => ({
                url: AUTH_URL + '/verifyemail',
                method: 'POST',
                body: { verification_code: credentials.verification_code },
                headers: { Authorization: `Bearer ${credentials.access_token}` }
            })
        }),
        retryVerifyEmail: builder.mutation<RetryVerifyEmailResponse, RetryVerifyEmailRequestParams>({
            query: (credentials: RetryVerifyEmailRequestParams) => ({
                url: AUTH_URL + `/verificationemail?email=${credentials.email.toLowerCase()}`,
                method: 'GET'
            })
        }),
        forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequestParams>({
            query: (credentials: ForgotPasswordRequestParams) => ({
                url: AUTH_URL + '/forgotpassword',
                method: 'POST',
                body: { email: credentials.email.toLowerCase() }
            })
        }),
        resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequestParams>({
            query: (credentials: ResetPasswordRequestParams) => ({
                url: AUTH_URL + '/resetpassword',
                method: 'PATCH',
                body: {
                    new_password: credentials.new_password,
                    password_reset_code: credentials.password_reset_code
                },
                headers: { Authorization: `Bearer ${credentials.access_token}` }
            })
        }),
        refreshToken: builder.query<LoginResponse, []>({
            query: () => ({
                url: AUTH_URL + '/authtoken',
                method: 'GET',
            })
        }),
        logOut: builder.mutation<void, []>({
            query: () => ({
                url: AUTH_URL + '/logout',
                method: 'POST',
            })
        })
    })
})

export type { UserSignupData, UserLoginData }
export const {
    useLoginMutation,
    useSignupMutation,
    useVerifyEmailMutation,
    useRetryVerifyEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useLogOutMutation,
    useRefreshTokenQuery,
} = authApiSlice;