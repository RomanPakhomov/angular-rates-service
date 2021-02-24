import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserModel } from "../types/user.type";

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
            username: 'rpakhomov',
            email: 'rpakhomov@gmail.com',
            phone: '79390567708',
            notifications: true,
            options: [1]
        },
        {
            id: 1,
            fullName: 'Иванов Илья Владимирович',
            username: 'iivanov',
            email: 'iivanov@gmail.com',
            phone: '79390567709',
            notifications: true,
            options: [1,2]
        },
        {
            id: 2,
            fullName: 'Аникина Екатерина Александровна',
            username: 'aekaterina',
            email: 'aekaterina@gmail.com',
            phone: '79390567710',
            notifications: true,
            options: [2,3,4]
        }
    ]

    getUsers(): Observable<UserModel[]> {
        return of(this.users);
    }

    getUser(id: number): Observable<UserModel> {
        return of(this.users.filter((user: UserModel) => user.id === id)[0]);
    }

    saveUser(user: UserModel):boolean {
        try {
            this.users.map(item => {
                if(item.username === user.username){
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