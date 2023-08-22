import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useRefreshTokenQuery } from '../api/authApi'
import { setAuth } from '../slices/authSlice'

function useRefreshToken() {
    const dispatch = useDispatch()
    const { isLoggedIn, accessToken } = useSelector((state: RootState) => state.auth)
    const { data, isSuccess, isError, isLoading } = useRefreshTokenQuery(null)

    return useEffect(() => {
        console.log({
            data,
            isSuccess,
            isError,
            isLoading
        })
        if (data && !isLoggedIn) {
            const { access_token } = data.data
            dispatch(setAuth({
                accessToken: access_token
            }))
        }
    }, [data, accessToken, isLoading, isSuccess, isError, isLoggedIn, dispatch])
}

export default useRefreshToken