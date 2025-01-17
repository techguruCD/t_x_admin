import { createApi, fetchBaseQuery, BaseQueryFn, FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/query/react';
import { API_BASEURL } from '../constants';
import { setCredentials, logOut, BasicAuthTokenPayload, SetCredentialPayload } from '../slices/authSlice';
import { RootState } from '../app/store';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const { getState } = api;
    let token = (getState() as RootState).auth.accessToken;

    // These routes have thier custom token for authentication
    if (api.endpoint === 'verifyEmail') {
        token = (getState() as RootState).auth.emailVerificationToken
    } else if (api.endpoint === 'resetPassword') {
        token = (getState() as RootState).auth.passwordResetToken
    }

    const headers = new Headers();
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const result = await fetchBaseQuery({
        baseUrl: API_BASEURL,
        credentials: 'include',
        prepareHeaders: () => headers,
    })(args, api, extraOptions);

    return result;
};

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    const invalidAuthorization = (result.error?.data as any)?.message === 'Invalid authorization header'
    const badAuth = invalidAuthorization && result.error?.status === 401
    if (badAuth) {
        const refreshResult = await baseQuery({
            url: '/auth/authtoken',
            method: 'GET'
        }, api, extraOptions) as QueryReturnValue<RefreshResponse, unknown>;

        if (refreshResult.data) {
            const authState = (api.getState() as RootState).auth;
            const { access_token } = refreshResult.data.data;

            const credentials = {
                ...authState, accessToken: access_token,
                isLoggedIn: true,
                credentialType: 'basic',
            } as SetCredentialPayload & BasicAuthTokenPayload;
            api.dispatch(setCredentials(credentials));

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    return result;
}

interface RefreshResponse {
    data: {
        access_token: string;
    };
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['User'],
    endpoints: () => ({})
})