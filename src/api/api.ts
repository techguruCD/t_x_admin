import { createApi, fetchBaseQuery, BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { API_BASEURL } from '../constants';
import { setCredentials, logOut, BasicAuthTokenPayload, SetCredentialPayload } from '../slices/authSlice';
import { RootState } from '../app/store';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseQuery: BaseQueryFn<unknown, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
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

const baseQueryWithReAuth: BaseQueryFn<unknown, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error?.status === 403) {
        console.log('requesting access token');

        const refreshResult = await baseQuery({
            url: '/authtoken',
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