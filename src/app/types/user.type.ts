export enum notifycationTypeId{ 
    email = 'email',
    phone = 'phone'
}

export interface UserModel {
    id: number;
    fullName: string;
    userName: string;
    email: string;
    phone: string;
    notifications: boolean;
    notificationsType: notifycationTypeId;
    options: number[];
}