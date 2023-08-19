import { useState } from "react";
import Container from "../../../components/Container";
import { Link } from "react-router-dom";
import './signup.scss'
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    return (
        <Container>
            <div className="signup_container">
                <div className="content_modal">
                    <div className="signup_container_header">
                        <h1>Signup as Admin</h1>
                    </div>
                    <div className='signup_form'>
                        <FormField type='text' label='First name' placeholder="" />
                        <FormField type='text' label='Last name' placeholder="" />
                        <FormField type='text' label='Email' placeholder="" />
                        <FormField type='password' label='Password' placeholder="" />
                        <FormField type='password' label='Confirm password' placeholder="" />
                    </div>

                    {/* <div className="forgot_password">
                        <Link
                            to="/forgotpassword"
                            className="link"
                        > Forgot password? </Link>
                    </div> */}

                    <Button text="Submit" />

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