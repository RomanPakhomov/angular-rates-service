import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { notifycationTypeId, UserModel } from "../types/user.type";


@Injectable()
export class UserService {
    // Mock users service

    private readonly usersKey = 'mts-test-users';

    constructor(){
        if(!localStorage.getItem(this.usersKey)){
            localStorage.setItem(this.usersKey, JSON.stringify(this.users));
        }
    }

    private users: UserModel[] = [
        {
            id: 0,
            fullName: 'Пахомов Роман Романович',
            userName: 'rpakhomov',
            email: 'rpakhomov@gmail.com',
            phone: '89390567708',
            notifications: true,
            notificationsType: notifycationTypeId.email,
            options: [1]
        },
        {
            id: 1,
            fullName: 'Иванов Илья Владимирович',
            userName: 'iivanov',
            email: 'iivanov@gmail.com',
            phone: '89390567709',
            notifications: true,
            notificationsType: notifycationTypeId.phone,
            options: [1,2]
        },
        {
            id: 2,
            fullName: 'Аникина Екатерина Александровна',
            userName: 'aekaterina',
            email: 'aekaterina@gmail.com',
            phone: '89390567710',
            notifications: true,
            notificationsType: notifycationTypeId.email,
            options: [2,3,4]
        }
    ];

    getUsersFromStorage(): UserModel[] {
        const users = localStorage.getItem(this.usersKey);
        if(users){
            return JSON.parse(users);
        } else {
            return this.users;
        }
    }

    saveUsersToStorage(users: UserModel[]): void {
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        this.users = users;
    }

    getUsers(): Observable<UserModel[]> {
        return of(this.getUsersFromStorage())
    }

    getUser(id: number): Observable<UserModel> {
        const users = this.getUsersFromStorage();
        return of(users.filter((user: UserModel) => user.id === id)[0]);
    }

    removeUserOption(userId: number, optionId: number): void {
        const users = this.getUsersFromStorage();
        const updatedUsers = users.map(user => {
            if(user.id === userId){
                return {
                    ...user,
                    options: user.options.filter(option => option !== optionId)
                }
            }
            return user;
        })
        this.saveUsersToStorage(updatedUsers);
    }

    saveuserOptions(userId: number, optionsId: number[]): void {
        const users = this.getUsersFromStorage();
        const updatedUsers = users.map(user => {
            if(user.id === userId){
                return {
                    ...user,
                    optionsId
                }
            }
            return user;
        })
        this.saveUsersToStorage(updatedUsers);
    }

    saveUser(user: UserModel): void {
        console.log(user)
        const users = this.getUsersFromStorage();
        console.log(users);
        const updatedUsers = users.map(item => {
            if(item.id === user.id){
                return user
            } else {
                return item;
            }
        });
        console.log(updatedUsers);
        this.saveUsersToStorage(updatedUsers);
    }

}