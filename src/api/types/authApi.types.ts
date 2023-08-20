/* eslint-disable @typescript-eslint/no-explicit-any */
interface UserDataInResponse {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    _id: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

interface SuccessResponse {
    success: true;
    message: string;
    data: any;
}

export interface UserLoginData {
    email: string;
    password: string;
}
export interface LoginResponse extends SuccessResponse {
    data: {
        user: UserDataInResponse ;
        access_token: string;
        refresh_token: string;
    };
}

export interface UserSignupData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}
export interface SignupResponse extends SuccessResponse {
    data: {
        user: UserDataInResponse;
        access_token: string;
    };
}

export interface VerifyEmailRequestParams {
    verification_code: number;
    access_token: string;
}
export interface VerifyEmailResponse extends SuccessResponse {
    data: {
        user: UserDataInResponse;
    };
}

export interface RetryVerifyEmailRequestParams {
    email: string;
}
export interface RetryVerifyEmailResponse extends SuccessResponse {
    data: {
        user: UserDataInResponse;
        access_token: string
    };
}
