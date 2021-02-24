import { Action } from "@ngrx/store";
import { OptionModel } from "src/app/types/option.type";

export enum EOptionActions {
    getOptions = 'GetOptions',
    getOptionsSuccess = 'GetOptionsSuccess'
}

export class GetOptions implements Action {
    public readonly type = EOptionActions.getOptions;
}

export class GetOptionsSuccess implements Action {
    public readonly type = EOptionActions.getOptionsSuccess;
    constructor(public payload: OptionModel[]) {}
}

export type OptionActions = GetOptions | GetOptionsSuccess;