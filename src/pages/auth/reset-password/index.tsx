import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Container from "../../../components/Container";
import './resetpassword.scss'
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";
import { useDispatch, useSelector } from "react-redux";
import { useResetPasswordMutation } from "../../../api/authApi";
import { RootState } from "../../../app/store";
import { validateResetPasswordData } from "../../../utils/validator";
import { toast } from 'react-toastify'
import { reset } from "../../../slices/authSlice";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [passwordResetCode, setPasswordResetCode] = useState<string>('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [resetPassword, { isSuccess: resetPasswordSuccess, error: resetPasswordError }] = useResetPasswordMutation()
    const { passwordResetToken } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (resetPasswordSuccess) {
            toast.success("Success, Password reset successful");
            // setPasswordResetCode('')
            // setNewPassword('')
            // setConfirmPassword('')

            navigate('/login')
            dispatch(reset())
        }

        if (resetPasswordError) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((resetPasswordError as any).error) toast.error((resetPasswordError as any).error);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const apiError = resetPasswordError as any;
            const badRequestError = apiError.status && apiError.status < 500 && apiError.data?.message;
            if (badRequestError) toast.error(apiError.data?.message);
            else toast.error("An error occured");
        }

        setPasswordResetCode('')
        setNewPassword('')
        setConfirmPassword('')
    }, [resetPasswordSuccess, resetPasswordError, navigate, dispatch])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'passwordResetCode':
                setPasswordResetCode(parseInt(e.target.value, 10))
                break;
            case 'password':
                setNewPassword(e.target.value)
                break;
            case 'confirmPassword':
                setConfirmPassword(e.target.value)
                break;
            default:
                break;
        }
    }

    if (!passwordResetToken) {
        navigate('/login')
        return
    }

    const handleContinue = async () => {
        if (!passwordResetCode) {
            return toast.error("Please input a valid password reset code")
        }

        const validatorResponse = validateResetPasswordData({
            passwordResetCode, newPassword, confirmNewPassword: confirmPassword
        })

        if (!validatorResponse.isValid) {
            return toast.error(Object.values(validatorResponse.errors)[0])
        }

        const data = {
            password_reset_code: parseInt(passwordResetCode, 10),
            new_password: newPassword,
            access_token: passwordResetToken
        }
        await resetPassword(data).unwrap()
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
                        <FormField type='authcode' label='Reset code' onChange={onChange} text={passwordResetCode} name='passwordResetCode' placeholder="" />
                        <FormField type='password' label='New password' onChange={onChange} text={newPassword} name='password' placeholder="" />
                        <FormField type='password' label='Confirm password' onChange={onChange} text={confirmPassword} name='confirmPassword' placeholder="" />
                    </div>

                    <Button text="Continue" onClick={handleContinue} />
                </div>
            </div>
        </Container>
    );
};

export default ResetPassword;