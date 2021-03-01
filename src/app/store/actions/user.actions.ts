import { Action } from "@ngrx/store";
import { UserModel, UserOptionModel } from "src/app/types/user.type";

export enum EUserActions {
    getUser = 'getUser',
    getUserSuccess = 'getUserSuccess',
    getUsers = 'getUsers',
    getUsersSuccess = 'getUserssuccess',
    saveUser = 'saveUser',
    removeUserOption = 'removeUserOption',
    saveUserOptions = 'saveUserOptions'
}

export class GetUser implements Action {
    public readonly type = EUserActions.getUser;
    constructor(public payload: number) {}
}

export class GetUserSuccess implements Action {
    public readonly type = EUserActions.getUserSuccess;
    constructor(public payload: UserModel) {}
}

export class GetUsers implements Action {
    public readonly type = EUserActions.getUsers;
}

export class GetUsersSuccess implements Action {
    public readonly type = EUserActions.getUsersSuccess;
    constructor(public payload: UserModel[]) {}
}

export class SaveUser implements Action {
    public readonly type = EUserActions.saveUser;
    constructor(public payload: UserModel) {}
}

export class RemoveUserOption implements Action {
    public readonly type = EUserActions.removeUserOption;
    constructor(public payload: {userId: number; optionId: number}) {}
}

export class SaveUserOptions implements Action {
    public readonly type = EUserActions.saveUserOptions;
    constructor(public payload: {userId: number, optionsId: UserOptionModel[]}) {}
}

export type UserActions = GetUser
    | GetUserSuccess
    | GetUsers
    | GetUsersSuccess
    | SaveUser
    | RemoveUserOption
    | SaveUserOptions;