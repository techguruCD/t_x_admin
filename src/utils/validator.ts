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