import { initialUserState } from "../state/user.state";
import { EUserActions, UserActions } from "../actions/user.actions";
import { UserState } from "../state/user.state";

export const userReducers = (
    state = initialUserState,
    action: UserActions
): UserState => {
    switch(action.type) {
        case EUserActions.getUserSuccess: {
            return {
                ...state,
                selectedUser: action.payload
            };
        }
        case EUserActions.getUsersSuccess: {
            return {
                ...state,
                users: action.payload
            }
        }

        default:
            return state;
    }
}