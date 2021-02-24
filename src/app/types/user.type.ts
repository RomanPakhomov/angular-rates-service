export interface UserModel {
    id: number;
    fullName: string;
    username: string;
    email: string;
    phone: string;
    notifications: boolean;
    options: number[];
}