import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Container from "../../../components/Container";
import './verifyemail.scss'
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";

const VerifyEmail = () => {
    const [emailverificationCode, setEmailverificationCode] = useState<number>();
    const navigate = useNavigate()

    const handleContinue = () => {
        navigate('/verifyemail')
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailverificationCode(parseInt(event.target.value))
    }

    return (
        <Container>
            <div className="verifyemail_container">
                <div className="content_modal">
                    <div className="verifyemail_container_header">
                        <h1>Verify email</h1>
                        <p> Input the email verification code sent to your email</p>
                    </div>
                    <div className='verifyemail_form'>
                        <FormField
                            type='authcode' label='Reset code'
                            onChange={onChange} name='emailverificationCode'
                            placeholder="" />
                    </div>

                    <Button text="Continue" onClick={handleContinue} />
                </div>
            </div>
        </Container>
    );
};

export default VerifyEmail;