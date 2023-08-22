import { toast } from 'react-toastify'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'

export function handleError(error: FetchBaseQueryError | SerializedError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const apiError = error as any
    if (apiError.error) toast.error(apiError.error)

    const badRequestError = apiError.status && (apiError.status < 500) && apiError.data?.message
    if (badRequestError) toast.error(apiError.data?.message)
    else toast.error('An error occured')
}