import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Container from "../../../components/Container";
import './verifyemail.scss'
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";
import { toast } from "react-toastify";
import { useVerifyEmailMutation } from "../../../api/authApi";
import { RootState } from "../../../app/store";
import Spinner from "../../../components/Spinner";

const VerifyEmail = () => {
    const [emailverificationCode, setEmailverificationCode] = useState<number | null>();
    const navigate = useNavigate()

    const { emailVerificationAccessToken } = useSelector((state: RootState) => state.auth)
    const [verifyEmail, { isLoading, isSuccess, error }] = useVerifyEmailMutation()

    useEffect(() => {
        if (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((error as any).error) toast.error((error as any).error)

            const badRequestError = (error.status != 500) && (error as any).data.message
            if (badRequestError) toast.error((error as any).data.message)
            else toast.error('An error occured')

            setEmailverificationCode(null)
        }

        if (isSuccess) {
            toast.success('Email verified successfully')
            navigate('/login')
        }
    }, [isSuccess, error])

    const handleContinue = async () => {
        if (!emailverificationCode) {
            return toast.error('Please input the email verification code')
        }

        if (!emailVerificationAccessToken) {
            return toast.error('Please login to continue')
        }

        await verifyEmail({
            verification_code: emailverificationCode,
            access_token: emailVerificationAccessToken
        }).unwrap()
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailverificationCode(parseInt(event.target.value))
    }

    if (!emailVerificationAccessToken) {
        navigate('/login')
    }

    if (isLoading){
        return <Spinner />
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