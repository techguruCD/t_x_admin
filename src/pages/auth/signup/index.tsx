import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { setCredentials, reset } from '../../../slices/authSlice'
import { useSignupMutation } from '../../../api/authApi'
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";
import './signup.scss'
import { AppDispatch } from "../../../app/store";
import Spinner from "../../../components/Spinner";
import { validateSignupData } from "../../../utils/validator";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { firstName, lastName, email, password, confirmPassword } = formData
    const [signup, { isLoading, isSuccess, error }] = useSignupMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((error as any).error) toast.error((error as any).error)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const apiError = error as any
            const badRequestError = apiError.status && (apiError.status < 500) && apiError.data?.message
            if (badRequestError) toast.error(apiError.data?.message)
            else toast.error('An error occured')

            dispatch(reset())
        }

        if (isSuccess) {
            navigate('/verifyemail')
            toast.success('Success, please check your email to verify your account')
        }

        dispatch(reset())
    }, [error, isSuccess, navigate, dispatch])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const signupData = {
            firstname: firstName,
            lastname: lastName,
            email, password, confirmPassword
        }

        const response = validateSignupData(signupData)
        if (Object.keys(response).length > 0) {
            return toast.error(Object.values(response)[0])
        }

        const signupResponse = await signup(signupData).unwrap()
        const credentials = {
            user: signupResponse.data.user,
            credentialType: 'emailVerification' as const,
            emailVerificationToken: signupResponse.data.access_token
        }
        dispatch(setCredentials(credentials))
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((previousState) => ({
            ...previousState,
            [e.target.name]: e.target.value
        }))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Container>
            <div className="signup_container">
                <div className="content_modal">
                    <div className="signup_container_header">
                        <h1>Signup as Admin</h1>
                    </div>
                    <div className='signup_form'>
                        <FormField type='text' label='First name' name='firstName' onChange={onChange} />
                        <FormField type='text' label='Last name' name='lastName' onChange={onChange} />
                        <FormField type='text' label='Email' name='email' onChange={onChange} />
                        <FormField type='password' label='Password' name='password' onChange={onChange} />
                        <FormField type='password' label='Confirm password' name='confirmPassword' onChange={onChange} />
                    </div>

                    <Button text="Submit" onClick={handleSubmit} />

                    <div className="login_prompt">
                        <p>Already have an account? &nbsp;
                            <Link
                                to="/login"
                                className="link"
                            >Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Signup;