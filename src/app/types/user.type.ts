export interface UserModel {
    id: number;
    fullName: string;
    userName: string;
    email: string;
    phone: string;
    notifications: boolean;
    options: number[];
}