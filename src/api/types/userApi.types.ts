/* eslint-disable @typescript-eslint/no-explicit-any */
interface UserInfoFromApi {
    _id: string;
    userId: string;
    __v: number;
    createdAt: string,
    emailId: string,
    photoUrl: string
    refCode: string;
    referrer: string;
    updatedAt: string;
    username: string;
    discordUsername: string | undefined,
    twitterUsername: string | undefined,
    walletAddress: string | undefined;
    id: string
}

interface SuccessResponse {
    success: true;
    message: string;
    data: any;
}

interface GetUserInfoRequestParams {
    user_id?: string;
    user_name?: string;
    email_id?: string;
    twitter_username?: string;
    discord_username?: string;
    wallet_address?: string;
    ref_code?: string;
    referrer?: string;
    access_token: string;
}
interface GetUserInfoResponse extends SuccessResponse {
    data: {
        user: UserInfoFromApi;
    }
}

interface GetUsersRequestParams {
    access_token: string
}
interface GetUsersResponse extends SuccessResponse {
    data: {
        users: UserInfoFromApi[]
    }
}

export type {
    UserInfoFromApi,
    GetUserInfoRequestParams,
    GetUserInfoResponse,
    GetUsersRequestParams,
    GetUsersResponse
}