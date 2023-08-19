import { useState } from "react";
import Container from "../../../components/Container";
import './forgotpassword.scss'
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    return (
        <Container>
            <div className="forgotpassword_container">
                <div className="content_modal">
                    <div className="forgotpassword_container_header">
                        <h1>Forgot Password</h1>
                        <p>Please provide the email address associated with your account</p>
                    </div>
                    <div className='forgotpassword_form'>
                        <FormField type='text' label='Email' placeholder="" />
                    </div>

                    <Button text="Continue" />
                </div>
            </div>
        </Container>
    );
};

export default ForgotPassword;