import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { OptionState } from "../state/options.state";

const selectOptions = (state: AppState) => state.options;

export const selectOptionList = createSelector(
    selectOptions,
    (state: OptionState) => state.options
)