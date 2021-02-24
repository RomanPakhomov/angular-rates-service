import { OptionModel } from "src/app/types/option.type";

export interface OptionState {
    options: OptionModel[]
}

export const initialOptionState: OptionState = {
    options: [] as OptionModel[]
}