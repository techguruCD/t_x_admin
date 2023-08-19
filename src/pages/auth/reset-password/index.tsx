import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Container from "../../../components/Container";
import './resetpassword.scss'
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";


const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [resetCode, setResetCode] = useState<number>();
    const navigate = useNavigate()

    const handleContinue = () => {
        navigate('/resetpassword')
    }

    const handleChange = {
        email: (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value)
        },
        resetCode: (event: React.ChangeEvent<HTMLInputElement>) => {
            setResetCode(parseInt(event.target.value))
        },
        password: (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value)
        },
        confirmPassword: (event: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(event.target.value)
        }
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
                        <FormField type='authcode' label='Reset code' onChange={handleChange.resetCode} name='resetCode' placeholder="" />
                        <FormField type='password' label='New password' onChange={handleChange.password} name='password' placeholder="" />
                        <FormField type='password' label='Confirm password' onChange={handleChange.confirmPassword} name='confirmPassword' placeholder="" />
                    </div>

                    <Button text="Continue" onClick={handleContinue} />
                </div>
            </div>
        </Container>
    );
};

export default ResetPassword;