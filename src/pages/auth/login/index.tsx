import { useState } from "react";
import Container from "../../../components/Container";
import { Link } from "react-router-dom";
import './login.scss'
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

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

                    {/* <div className="forgot_password">
                        <Link
                            to="/forgotpassword"
                            className="link"
                        > Forgot password? </Link>
                    </div> */}

                    <Button text="Submit" />

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

export default Signup;