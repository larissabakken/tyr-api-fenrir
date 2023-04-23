
export interface UserToken {
    accessToken: string;
    user: {
        username: string;
        name?: string;
        email?: string;
    };
}
