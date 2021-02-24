import { initialOptionState } from "../state/options.state";
import { EOptionActions, OptionActions } from "../actions/option.actions";
import { OptionState } from "../state/options.state";

export const optionReducers = (
    state = initialOptionState,
    action: OptionActions
): OptionState => {
    switch (action.type) {
        case EOptionActions.getOptionsSuccess: {
            return {
                ...state,
                options: action.payload
            }
        }

        default:
            return state;
    }
}