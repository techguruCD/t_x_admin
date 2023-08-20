export function passwordValidator(password: string) {
    const minLength = 12;
    const hasNumber = /[0-9]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]+/.test(password);

    if (password.length < minLength) {
        return "Password must be at least 12 characters long.";
    }

    if (!hasNumber) {
        return "Password must contain at least one number.";
    }

    if (!hasUpperCase) {
        return "Password must contain at least one uppercase letter.";
    }

    if (!hasLowerCase) {
        return "Password must contain at least one lowercase letter.";
    }

    if (!hasSymbol) {
        return "Password must contain at least one special symbol.";
    }

    return "valid";
}

export function validateEmail(email: string | undefined) {
    const errors = {} as { email: string };

    if (!email) {
        errors.email = "Email is required";
        return { isValid: false, errors };
    }

    const emailRegExp = /\S+@\S+\.\S+/;
    if (!emailRegExp.test(email)) {
        errors.email = "Email must be a valid email address";
        return { isValid: false, errors };
    }

    return { isValid: true };
}
interface SignupErrors {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}
interface SignupData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const validateSignupData = (data: SignupData): SignupErrors => {
    const errors: SignupErrors = {};

    if (data.firstname.length < 3) {
        errors.firstname = "First name must be at least 3 characters";
    }

    if (data.lastname.length < 1) {
        errors.lastname = "Last name is required";
    }

    const emailRegExp = /\S+@\S+\.\S+/;
    if (!emailRegExp.test(data.email)) {
        errors.email = "Email must be a valid email address";
    }

    const passwordValidatorResult = passwordValidator(data.password);
    if (passwordValidatorResult != 'valid') {
        errors.password = passwordValidatorResult;
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};

type LoginDataValidatorResposne =
    { isValid: true; } |
    {
        errors: {
            email: string;
            password: string;
        };
        isValid: false;
    }
interface LoginData {
    email: string;
    password: string;
}
export const validateLoginData = (data: LoginData): LoginDataValidatorResposne => {
    const errors = {} as { email: string, password: string };

    const emailRegExp = /\S+@\S+\.\S+/;
    if (!emailRegExp.test(data.email)) {
        errors.email = "Email must be a valid email address";
    }

    if (data.password.length < 1) {
        errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
        return { isValid: false, errors };
    }

    return { isValid: true };
}

interface ResetPasswordData {
    passwordResetCode: number | null;
    newPassword: string;
    confirmNewPassword: string;
}
type ResetPasswordErrors = {
    [k in keyof ResetPasswordData]: string;
}
export const validateResetPasswordData = (data: ResetPasswordData) => {
    const { passwordResetCode, newPassword, confirmNewPassword } = data;
    const errors = {} as ResetPasswordErrors;

    if (!passwordResetCode) {
        errors.passwordResetCode = "Password reset code is required";
    }

    if (passwordResetCode && passwordResetCode.toString().length !== 4) {
        errors.passwordResetCode = "Password reset code must be 4 digits long";
    }

    const passwordValidatorResult = passwordValidator(newPassword);
    if (passwordValidatorResult != 'valid') {
        errors.newPassword = passwordValidatorResult;
    }

    if (newPassword !== confirmNewPassword) {
        errors.confirmNewPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
        return { isValid: false as const, errors };
    } else {
        return { isValid: true as const};
    }
}
