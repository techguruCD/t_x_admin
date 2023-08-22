import { API_BASEURL } from "../constants";
import { apiSlice } from './api'
import {
    GetAdInfoResponse,
    GetAdInfoRequestParams,
    GetAdsResponse,
} from './types/adApi.types'

const USER_URL = API_BASEURL + '/ads'

export const adApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdInfo: builder.query<GetAdInfoResponse, GetAdInfoRequestParams>({
            query: (credentials: GetAdInfoRequestParams) => {
                let query_url = '/adinfo'

                const { url, expiry, date, name, status } = credentials

                if (url) query_url += `?url=${url}`
                if (name) query_url += `?name=${name}`
                if (expiry) query_url += `?expiry=${expiry}`
                if (date) query_url += `?date=${date}`
                if (status) query_url += `?status=${status}`

                return {
                    url: USER_URL + query_url,
                    method: 'GET',
                }
            }
        }),
        getAds: builder.query<GetAdsResponse, any>({
            query: () => ({
                url: USER_URL,
                method: 'GET'
            })
        }),
    })
})

export const { useGetAdInfoQuery, useGetAdsQuery } = adApiSlice

