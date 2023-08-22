import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import useRefreshToken from '../../hooks/useRefreshToken'
import { useRefreshTokenQuery } from '../../api/authApi'
import Spinner from '../Spinner'
import { setAuth } from '../../slices/authSlice'


const AuthenticatedRoutes = () => {
    const { isLoggedIn, user } = useSelector((state: RootState) => state.auth)
    const { data, isSuccess, isError, isLoading } = useRefreshTokenQuery(null)
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log({
        //     data,
        //     isSuccess,
        //     isError,
        //     isLoading
        // })
        if (data) {
            // console.log('dispatching')
            const { access_token } = data.data
            dispatch(setAuth({
                accessToken: access_token
            }))
        }
    }, [data, isLoading, isSuccess, isError, isLoggedIn, dispatch])

    return (
        <>
            <Outlet />
            {
                // (!isLoading && isLoggedIn)
                    // ? (<Outlet />)
                    // : (<Navigate to='/login' replace={true} />)
            }
        </>
    )
}

export default AuthenticatedRoutes