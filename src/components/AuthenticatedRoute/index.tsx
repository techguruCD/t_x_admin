import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { useRefreshTokenQuery } from '../../api/authApi'
import Spinner from '../Spinner'
import { setAuth } from '../../slices/authSlice'

const AuthenticatedRoutes = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { isLoggedIn } = useSelector((state: RootState) => state.auth)
    const { error, data } = useRefreshTokenQuery([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            setIsLoading(false)
        }
        if (data) {
            const { access_token } = data.data
            dispatch(setAuth({
                accessToken: access_token
            }))
        } 
    }, [data, error, dispatch])

    if (isLoggedIn) return <Outlet />
    if (isLoading) return <Spinner />
    if (!isLoggedIn || error) return <Navigate to='/login' replace={true} />
}

export default AuthenticatedRoutes