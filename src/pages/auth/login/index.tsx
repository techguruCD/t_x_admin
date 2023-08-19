import { useState } from "react";
import Container from "../../../components/Container";
import { Link, useNavigate } from "react-router-dom";
import './login.scss'
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    
    const handleSubmit = () => {
        // TODO: Validate login parameters
        navigate('/dashboard')
    }

    return (
        <Container>
            <div className="login_container">
                <div className="content_modal">
                    <div className="login_container_header">
                        <h1>Login</h1>
                    </div>
                    <div className='login_form'>
                        <FormField type='text' label='Email' placeholder="" />
                        <FormField type='password' label='Password' placeholder="" />
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