import { createApi, fetchBaseQuery, BaseQueryFn, FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/query/react';
import { API_BASEURL } from '../constants';
import { setCredentials, logOut, BasicAuthTokenPayload, SetCredentialPayload } from '../slices/authSlice';
import { RootState } from '../app/store';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const { getState } = api;
    const token = (getState() as RootState).auth.accessToken;

    const headers = new Headers();
    if (token) {
        headers.set('authorization', `Bearer ${token}`);
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


    const invalidAuthorization = result.error?.data?.message === 'Invalid authorization header'
    const badAuth = invalidAuthorization && result.error?.status === 401
    if (badAuth) {
        const refreshResult = await baseQuery({
            url: '/auth/authtoken',
            method: 'GET'
        }, api, extraOptions) as QueryReturnValue<RefreshResponse, unknown>;
        console.log(refreshResult);

        if (refreshResult.data) {
            const authState = (api.getState() as RootState).auth;
            const { access_token } = refreshResult.data.data;

            const credentials = {
                ...authState, accessToken: access_token,
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
        refresh_token: string;
        // Add other properties
    };
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['User'],
    endpoints: (builder) => ({

    })
})