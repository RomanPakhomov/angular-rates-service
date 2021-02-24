import { RouterReducerState } from "@ngrx/router-store";
import { initialOptionState, OptionState } from "./options.state";
import { initialUserState, UserState } from "./user.state";

export interface AppState {
    router?: RouterReducerState;
    users: UserState;
    options: OptionState;
}

export const initialAppState: AppState = {
    users: initialUserState,
    options: initialOptionState
}

export function getInitialState(): AppState {
    return initialAppState;
}