import { useEffect, useState } from "react";
import Container from "../../../components/Container";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import './login.scss'
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";
import { useLoginMutation } from "../../../api/authApi";
import { RootState } from "../../../app/store";
import { setCredentials } from "../../../slices/authSlice";
import { toast } from "react-toastify";
import { validateLoginData } from "../../../utils/validator";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isSuccess, isError, error }] = useLoginMutation()
    const { accessToken, user } = useSelector((state: RootState) => state.auth)


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    }

    useEffect(() => {
        if (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((error as any).error) toast.error((error as any).error);

            const apiError = error as any;
            const badRequestError =
                apiError.status && apiError.status < 500 && apiError.data?.message;
            if (badRequestError) toast.error(apiError.data?.message);
            else toast.error("An error occured");
        }

        if (user && accessToken) {
            navigate('/dashboard')
        }

        if (isSuccess && user) {
            navigate('/dashboard')
        }
    }, [isSuccess, dispatch, navigate, accessToken, user, error])

    const handleSubmit = async () => {
        // Validate input
        const validatorResponse = validateLoginData({ email, password })

        if (!validatorResponse.isValid) {
            const { errors } = validatorResponse

            if (errors.email) toast.error(errors.email);
            if (errors.password) toast.error(errors.password);

            setEmail("")
            setPassword("")
            
            return;
        }

        const loginResponse = await login({ email, password }).unwrap()
        const credentials = {
            accessToken: loginResponse.data.access_token,
            refreshToken: loginResponse.data.refresh_token,
            user: loginResponse.data.user,
            credentialType: 'basic' as const
        }

        dispatch(setCredentials(credentials))
    }

    const alreadyAuthenticate = user && accessToken
    if (alreadyAuthenticate) navigate('/dashboard')

    return (
        <Container>
            <div className="login_container">
                <div className="content_modal">
                    <div className="login_container_header">
                        <h1>Login</h1>
                    </div>
                    <div className='login_form'>
                        <FormField
                            type='text' label='Email'
                            placeholder="" name="email"
                            onChange={onChange} />
                        <FormField
                            type='password' label='Password'
                            placeholder="" name="password"
                            onChange={onChange} />
                    </div>

                    <div className="forgot_password">
                        <Link
                            to="/forgotpassword"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                        > Forgot password? </Link>
                    </div>

                    <Button text="Submit" onClick={handleSubmit} />
                    <div className="signup_prompt">
                        <p>Don't have an account? &nbsp;
                            <Link
                                to="/signup"
                                className="link"
                            >Signup</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Login;