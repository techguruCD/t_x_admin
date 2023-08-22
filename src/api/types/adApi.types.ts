/* eslint-disable @typescript-eslint/no-explicit-any */
interface AdInfoFromApi {
    _id: string;
    name: string;
    url: string;
    status: string;
    expiry: string;
    image: string;
    createdAt: string,
    updatedAt: string;
}

interface SuccessResponse {
    success: true;
    message: string;
    data: any;
}

interface GetAdInfoRequestParams {
    url?: string;
    expiry?: string;
    date?: string;
    name?: string;
    status?: string;
}
interface GetAdInfoResponse extends SuccessResponse {
    data: {
        ad: AdInfoFromApi;
    }
}

interface GetAdsResponse extends SuccessResponse {
    data: {
        ads: AdInfoFromApi[]
    }
}

export type {
    AdInfoFromApi,
    GetAdInfoRequestParams,
    GetAdInfoResponse,
    GetAdsResponse
}