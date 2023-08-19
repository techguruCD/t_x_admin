import { API_BASEURL } from '../constants';
import { apiSlice } from './apiSlice';

const AUTH_URL = API_BASEURL + '/auth';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: AUTH_URL + '/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['User']
        }),
    })
})

export const { useLoginMutation } = userApiSlice;