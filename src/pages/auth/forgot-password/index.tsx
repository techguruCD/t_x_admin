import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Container from "../../../components/Container";
import './forgotpassword.scss'
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";
import { useDispatch} from "react-redux";
import { useForgotPasswordMutation } from "../../../api/authApi";
import { validateEmail } from "../../../utils/validator";
import { toast } from 'react-toastify'
import { setCredentials } from "../../../slices/authSlice";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [forgotPassword, { isSuccess, error, data: forgotPasswordSuccessResponse }] = useForgotPasswordMutation()

    useEffect(() => {
        if (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((error as any).error) toast.error((error as any).error);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const apiError = error as any;
            const badRequestError =
                apiError.status && apiError.status < 500 && apiError.data?.message;
            if (badRequestError) toast.error(apiError.data?.message);
            else toast.error("An error occured");
        }

        if (isSuccess && forgotPasswordSuccessResponse) {
            toast.success("Success, Password reset code sent to your email");

            const credentials = {
                passwordResetToken: forgotPasswordSuccessResponse.data.access_token,
                user: forgotPasswordSuccessResponse.data.user,
                credentialType: 'passwordReset' as const
            }
            dispatch(setCredentials(credentials))
        }

        setEmail('');
    }, [navigate, dispatch, isSuccess, error, forgotPasswordSuccessResponse])


    const handleContinue = async () => {
        const validatorResponse = validateEmail(email)
        if (validatorResponse.errors) {
            toast.error(validatorResponse.errors.email)
            return
        }

        if (!email) {
            toast.error('Please enter your email')
            return
        }

        await forgotPassword({ email }).unwrap()
    }

        return (
        <Container>
            <div className="forgotpassword_container">
                <div className="content_modal">
                    <div className="forgotpassword_container_header">
                        <h1>Forgot Password</h1>
                        <p>Please provide the email address associated with your account</p>
                    </div>
                    <div className='forgotpassword_form'>
                        <FormField type='text' label='Email' name="email" />
                    </div>

                    <Button text="Continue" onClick={handleContinue} />
                </div>
            </div>
        </Container>
    );
};

export default ForgotPassword;