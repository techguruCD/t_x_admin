import { UserInfoFromApi } from "../../api/types/userApi.types"
import { AdInfoFromApi } from "../../api/types/adApi.types"

interface UserTableHeader {
    Header: string,
    Footer: string,
    accessor: keyof UserInfoFromApi,
}

export type { UserTableHeader, UserInfoFromApi }
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
    }
]


export type { AdInfoFromApi }
export const ADS_COLUMNS = [
    {
        Header: "ID",
        Footer: "ID",
        accessor: "_id"
    },
    {
        Header: "Name",
        Footer: "Name",
        accessor: "name",
    },
    {
        Header: "URL",
        Footer: "URL",
        accessor: "url",
    },
    {
        Header: "Status",
        Footer: "Status",
        accessor: "status",
    },
    {
        Header: "Expiry",
        Footer: "Expiry",
        accessor: "expiry",
    }
]