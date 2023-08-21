import { UserInfoFromApi } from "../../api/types/userApi.types"

interface Header {
    Header: string,
    Footer: string,
    accessor: keyof UserInfoFromApi,
}

export type { Header, UserInfoFromApi }
export const USER_COLUMNS = [
    {
        Header: "ID",
        Footer: "ID",
        accessor: "userId"
    },
    {
        Header: "Username",
        Footer: "Username",
        accessor: "username",
    },
    {
        Header: "Email",
        Footer: "Email",
        accessor: "emailId",
    },
    {
        Header: "Referral code",
        Footer: "Referral code",
        accessor: "refCode",
    },
    {
        Header: "Wallet",
        Footer: "Wallet",
        accessor: "walletAddress",
    }
]