interface SuccessResponse {
    success: true;
    message: string;
    data: any;
}
export interface UserSignupData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}
export interface UserLoginData {
    email: string;
    password: string;
}
export interface SignupResponse extends SuccessResponse {
    data: {
        user: {
            firstname: string;
            lastname: string;
            email: string;
            role: string;
            _id: string;
            id: string;
            createdAt: string;
            updatedAt: string;
        };
        access_token: string;
    };
}
export interface VerifyEmailRequestParams {
    verification_code: number;
    access_token: string;
}
export interface VerifyEmailResponse extends SuccessResponse {
    data: {
        user: {
            _id: string;
            firstname: string;
            lastname: string;
            email: string;
            role: string;
            id: string;
            iat: number;
            exp: number;
        };
    };
}
