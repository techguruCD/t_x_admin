import { API_BASEURL } from "../constants";
import { apiSlice } from './api'
import { EndpointDefinitions } from '@reduxjs/toolkit/dist/query/react'
import {
    GetUserInfoResponse,
    GetUserInfoRequestParams,
    GetUsersResponse,
} from './types/userApi.types'

const USER_URL = API_BASEURL + '/user'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserInfo: builder.query<GetUserInfoResponse, GetUserInfoRequestParams>({
            query: (credentials: GetUserInfoRequestParams) => {
                let query_url = '/userinfo'

                const { user_id, user_name, email_id, twitter_username,
                    discord_username, wallet_address, ref_code, referrer,
                } = credentials

                if (user_id) query_url += `?user_id=${user_id}`
                if (user_name) query_url += `?user_name=${user_name}`
                if (email_id) query_url += `?email_id=${email_id}`
                if (twitter_username) query_url += `?twitter_username=${twitter_username}`
                if (discord_username) query_url += `?discord_username=${discord_username}`
                if (wallet_address) query_url += `?wallet_address=${wallet_address}`
                if (ref_code) query_url += `?ref_code=${ref_code}`
                if (referrer) query_url += `?referrer=${referrer}`

                return {
                    url: USER_URL + query_url,
                    method: 'GET',
                }
            }
        }),
        getUsers: builder.query<GetUsersResponse, null>({
            query: () => ({
                url: USER_URL,
                method: 'GET'
            })
        }),
    })
})

export const { useGetUserInfoQuery, useGetUsersQuery } = userApiSlice

