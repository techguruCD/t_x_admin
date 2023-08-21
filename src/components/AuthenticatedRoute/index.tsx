import { Outlet, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import useRefreshToken from '../../hooks/useRefreshToken'
import { useRefreshTokenQuery } from '../../api/authApi'
import { useEffect } from 'react'


const AuthenticatedRoutes = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth)
    const { data, isSuccess, isError, isLoading } = useRefreshTokenQuery(null)
    const { isLoggedIn } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
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
    }, [data, isLoading, isSuccess, isError, isLoggedIn, dispatch])


    return (
        isLoggedIn ? <Outlet /> : <Navigate to='/login' replace={true} />
    )
}

export default AuthenticatedRoutes