import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { signup, reset } from '../../../features/auth/authSlice'
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";
import './signup.scss'
import { AppDispatch, RootState } from "../../../app/store";
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

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }
        if (isSuccess || user) {
            navigate('/login')
            toast.success(message)
        }

        dispatch(reset())
    }, [user, isLoading, isError, isSuccess, message, navigate, dispatch])

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        
        dispatch(signup(signupData))
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