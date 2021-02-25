import { Pipe, PipeTransform } from "@angular/core";
import { OptionModel } from "../types/option.type";

@Pipe({
    name: 'pipeOptionsSumm'
})
export class PipeOptionsSumm implements PipeTransform {
    count = 0;
    transform(userOptionsId: number[], optionsMap: Map<number, OptionModel> | null): number | string {
        console.log('😀 pipe call number : ', ++this.count);
        if(optionsMap){
            return userOptionsId
                .map(id => {
                    const option = optionsMap.get(id);
                    return option?.cost || 0
                })
                .reduce((acc, currentValue) => acc + currentValue, 0); 
        } else {
            return 'ошибка рассчета'
        }
    }
}