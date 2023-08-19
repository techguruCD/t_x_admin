import { useState } from "react";
import Container from "../../../components/Container";
import { Link } from "react-router-dom";
import { COLORS } from "../../../constants";
import './signup.scss'
import Button from "../../../components/Button";

interface FormFieldProps {
    label: string;
    type: string;
    placeholder: string;
}
const FormField = (props: FormFieldProps) => {
    const {
        label,
        type,
        placeholder,
    } = props

    return (
        <div className="form_field">
            <label className="form_field_label" htmlFor={label}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
}

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

                    <div className="forgot_password">
                        <Link
                            to="/forgotpassword"
                            style={{
                                color: COLORS.PRIMARY.DEFAULT,
                                fontSize: "16px",
                                fontWeight: 500,
                                lineHeight: "17px",
                            }}> Forgot password? </Link>
                    </div>

                    <Button text="Submit"/>
                </div>
            </div>
        </Container>
    );
};

export default Signup;