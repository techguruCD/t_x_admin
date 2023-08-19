import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASEURL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: API_BASEURL });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
    })
})