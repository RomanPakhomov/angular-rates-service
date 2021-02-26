import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { notifycationTypeId, UserModel } from "../types/user.type";


@Injectable()
export class UserService {
    //TODO
    private readonly getUsersUrl = 'TODO';
    private readonly saveUserUrl = 'TODO';

    //TODO
    private users: UserModel[] = [
        {
            id: 0,
            fullName: 'Пахомов Роман Романович',
            userName: 'rpakhomov',
            email: 'rpakhomov@gmail.com',
            phone: '79390567708',
            notifications: true,
            notificationsType: notifycationTypeId.email,
            options: [1]
        },
        {
            id: 1,
            fullName: 'Иванов Илья Владимирович',
            userName: 'iivanov',
            email: 'iivanov@gmail.com',
            phone: '79390567709',
            notifications: true,
            notificationsType: notifycationTypeId.phone,
            options: [1,2]
        },
        {
            id: 2,
            fullName: 'Аникина Екатерина Александровна',
            userName: 'aekaterina',
            email: 'aekaterina@gmail.com',
            phone: '79390567710',
            notifications: true,
            notificationsType: notifycationTypeId.email,
            options: [2,3,4]
        }
    ]

    getUsers(): Observable<UserModel[]> {
        return of(this.users);
    }

    getUser(id: number): Observable<UserModel> {
        return of(this.users.filter((user: UserModel) => user.id === id)[0]);
    }

    removeUserOption(userId: number, optionId: number): void {
        this.users.map(user => {
            if(user.id === userId){
                return {
                    ...user,
                    options: user.options.filter(option => option !== optionId)
                }
            }
            return user;
        })
    }

    saveuserOptions(userId: number, optionsId: number[]): void {
        this.users.map(user => {
            if(user.id === userId){
                return {
                    ...user,
                    optionsId
                }
            }
            return user;
        })
    }

    saveUser(user: UserModel): boolean {
        try {
            this.users.map(item => {
                if(item.userName === user.userName){
                    return user;
                } else {
                    return item;
                }
            });
            return true;
        } catch(e) {
            console.log(e);
            return false;
        } 
    }

}