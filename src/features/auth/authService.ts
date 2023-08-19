import axios from 'axios'
const API_URL = 'http://localhost:3000'

interface UserSignupData {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

const signup = async (userData: UserSignupData) => {
    const response = await axios.post(API_URL + '/auth/signup', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

export default {
    signup
}
export type {
    UserSignupData
}