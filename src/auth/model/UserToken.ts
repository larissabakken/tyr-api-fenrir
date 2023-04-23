
export interface UserToken {
    accessToken: string;
    user: {
        username: string;
        name?: string;
        email?: string;
        sub: string;
        permission: string;
    };
}
