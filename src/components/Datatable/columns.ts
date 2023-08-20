type UserData = {
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

interface Header {
    Header: string,
    Footer: string,
    accessor: keyof UserData,
}

export type { Header, UserData }
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