import { Pipe, PipeTransform } from "@angular/core";
import { OptionModel } from "../types/option.type";
import { UserOptionModel } from "../types/user.type";

@Pipe({
    name: 'pipeOptionsSumm'
})
export class PipeOptionsSumm implements PipeTransform {
    count = 0;
    transform(userOptions: UserOptionModel[], optionsMap: Map<number, OptionModel> | null): number | string {
        if(optionsMap){
            return userOptions
                .map(userOption => {
                    const option = optionsMap.get(userOption.id);
                    return option?.cost || 0
                })
                .reduce((acc, currentValue) => acc + currentValue, 0); 
        } else {
            return 'ошибка рассчета'
        }
    }
}