import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useRefreshTokenQuery } from '../api/authApi'
import { setAuth } from '../slices/authSlice'

function useRefreshToken() {
    const dispatch = useDispatch()
    
}

export default useRefreshToken