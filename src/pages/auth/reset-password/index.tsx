import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Container from "../../../components/Container";
import './resetpassword.scss'
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate()

    const handleContinue = () => {
        navigate('/resetpassword')
    }
    return (
        <Container>
            <div className="resetpassword_container">
                <div className="content_modal">
                    <div className="resetpassword_container_header">
                        <h1>Confirm password reset</h1>
                        <p> Input the password reset code sent to your email</p>
                    </div>
                    <div className='resetpassword_form'>
                        <FormField type='authcode' label='Reset code' placeholder="" />
                        <FormField type='password' label='New password' placeholder="" />
                        <FormField type='password' label='Confirm password' placeholder="" />
                    </div>

                    <Button text="Continue" onClick={handleContinue} />
                </div>
            </div>
        </Container>
    );
};

export default ResetPassword;