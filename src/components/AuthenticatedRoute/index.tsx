import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

const AuthenticatedRoutes = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth)

    return (
        isLoggedIn ? <Outlet /> : <Navigate to='/login' replace={true} />
    )
}

export default AuthenticatedRoutes