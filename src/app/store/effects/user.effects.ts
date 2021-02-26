import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { UserService } from "src/app/services/user.service";
import { EUserActions, GetUser, GetUsers, GetUsersSuccess, GetUserSuccess, RemoveUserOption, SaveUser, SaveUserOptions } from "../actions/user.actions";
import { AppState } from "../state/app.state";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { UserModel } from "src/app/types/user.type";
import { of } from "rxjs";
import { selectUserList } from "../selectors/user.selector";

@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions,
        private userService: UserService,
        private store: Store<AppState>
    ) {}

    getUsers = createEffect(() => this.actions.pipe(
        ofType<GetUsers>(EUserActions.getUsers),
        switchMap(() => this.userService.getUsers()),
        switchMap((users: UserModel[]) => of(new GetUsersSuccess(users)))
    ))

    getUser = createEffect(() => this.actions.pipe(
        ofType<GetUser>(EUserActions.getUser),
        map(action => action.payload),
        withLatestFrom(this.store.pipe(select(selectUserList))),
        switchMap(([id, users]) => {
            const selectedUser = users.find((user: UserModel) => user.id === Number(id));
            return of({selectedUser, id});
        }),
        switchMap(({selectedUser, id}) => {
            if(selectedUser){
                return of(selectedUser);
            }
            return this.userService.getUser(id).pipe(
                map((user: UserModel) => user)
            );
        }),
        switchMap((user: UserModel) => of(new GetUserSuccess(user)))
    ))

    saveUser = createEffect(() => this.actions.pipe(
        ofType<SaveUser>(EUserActions.saveUser),
        map(action => action.payload),
        withLatestFrom(this.store.pipe(select(selectUserList))),
        switchMap(([user, users]) => {
            const updatedUsers = users.map(userItem => userItem.id === user.id ? user : userItem)
            return of(new GetUsersSuccess(updatedUsers))
        })
    ))

    removeUserOption = createEffect(() => this.actions.pipe(
        ofType<RemoveUserOption>(EUserActions.removeUserOption),
        map(action => action.payload),
        withLatestFrom(this.store.pipe(select(selectUserList))),
        switchMap(([{ userId, optionId }, users]) => {
            this.userService.removeUserOption(userId, optionId)
            const updatedUsers = users.map(user => {
                if(user.id === userId){
                    return {
                        ...user,
                        options: user.options.filter(option => option !== optionId)
                    }
                }
                return user;
            })
            return of(new GetUsersSuccess(updatedUsers))
        }),
    ))

    saveUserOptions = createEffect(() => this.actions.pipe(
        ofType<SaveUserOptions>(EUserActions.saveUserOptions),
        map(action => action.payload),
        withLatestFrom(this.store.pipe(select(selectUserList))),
        switchMap(([{ userId, optionsId }, users]) => {
            this.userService.saveuserOptions(userId, optionsId);
            const updatedUsers = users.map(user => {
                if(user.id === userId){
                    return {
                        ...user,
                        options: optionsId
                    }
                }
                return user
            })
            return of(new GetUsersSuccess(updatedUsers))
        })
    ))
}