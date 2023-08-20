/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "../../../components/Container";
import "./verifyemail.scss";
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";
import { toast } from "react-toastify";
import {
    useVerifyEmailMutation,
    useRetryVerifyEmailMutation,
} from "../../../api/authApi";
import Spinner from "../../../components/Spinner";
import { setCredentials } from "../../../slices/authSlice";
import { RootState } from "../../../app/store";

const VerifyEmail = () => {
    const [emailverificationCode, setEmailverificationCode] = useState<
        number | null
    >();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { emailVerificationAccessToken, user } = useSelector(
        (state: RootState) => state.auth
    );
    const [verifyEmail, { isLoading, isSuccess, error }] = useVerifyEmailMutation();
    const [
        resendVerificationEmail,
        {
            isSuccess: resendVerEmailIsSuccess,
            error: resendVerEmailResponseError,
            data: resendVerEmailResponseData,
        },
    ] = useRetryVerifyEmailMutation();

    // For verify email
    useEffect(() => {
        if (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((error as any).error) toast.error((error as any).error);

            const apiError = error as any;
            const badRequestError =
                apiError.status && apiError.status < 500 && apiError.data?.message;
            if (badRequestError) toast.error(apiError.data?.message);
            else toast.error("An error occured");

            setEmailverificationCode(null);
        }

        if (isSuccess) {
            toast.success("Email verified successfully");
            return navigate("/login");
        }
    }, [isSuccess, error, navigate]);

    // For resend verification email
    useEffect(() => {
        if (resendVerEmailResponseError) {
            if ((resendVerEmailResponseError as any).error)
                toast.error((resendVerEmailResponseError as any).error);

            const apiError = resendVerEmailResponseError as any;
            const badRequestError =
                apiError.status && apiError.status < 500 && apiError.data?.message;
            if (badRequestError) toast.error(apiError.data?.message);
            else toast.error("An error occured");
        }

        const resentVerificationEmailSuccessfully = resendVerEmailIsSuccess && user && resendVerEmailResponseData
        if (resentVerificationEmailSuccessfully) {
            toast.success("Email verification code sent successfully");
            const updatedCredentials = {
                user,
                credentialType: 'emailVerification' as const,
                emailVerificationAccessToken: resendVerEmailResponseData.data.access_token,
            };

            dispatch(setCredentials(updatedCredentials));
        }

        setEmailverificationCode(null);
    }, [
        resendVerEmailIsSuccess,
        resendVerEmailResponseError,
        resendVerEmailResponseData,
        user,
        dispatch
    ]);

    const handleContinue = async () => {
        if (!emailverificationCode) {
            return toast.error("Please input the email verification code");
        }

        if (!emailVerificationAccessToken) {
            return toast.error("Please login to continue");
        }

        await verifyEmail({
            verification_code: emailverificationCode,
            access_token: emailVerificationAccessToken,
        }).unwrap();
    };

    const handleResendCode = async () => {
        if (!user) {
            return toast.error("Please login to continue");
        }

        console.log(user);

        await resendVerificationEmail({ email: user.email }).unwrap();
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailverificationCode(parseInt(event.target.value));
    };

    if (!emailVerificationAccessToken) {
        navigate("/login");
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Container>
            <div className="verifyemail_container">
                <div className="content_modal">
                    <div className="verifyemail_container_header">
                        <h1>Verify email</h1>
                        <p> Input the email verification code sent to your email</p>
                    </div>
                    <div className="verifyemail_form">
                        <FormField
                            type="authcode"
                            label="Verification code"
                            onChange={onChange}
                            name="emailverificationCode"
                            placeholder=""
                        />
                    </div>

                    <Button text="Resend code" onClick={handleResendCode} />
                    <Button text="Continue" onClick={handleContinue} />
                </div>
            </div>
        </Container>
    );
};

export default VerifyEmail;
