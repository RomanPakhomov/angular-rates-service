import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { OptionModel } from "../types/option.type";

@Injectable()
export class OptionService {

    // TODO
    private readonly getOptionsUrl = 'TODO'

    private options: OptionModel[] = [
        {
            id: 0,
            title: 'Мобильный помощник',
            cost: 0
        },
        {
            id: 1,
            title: 'Определитель номера',
            cost: 1000
        },
        {
            id: 2,
            title: 'Служба коротких сообщений',
            cost: 0
        },
        {
            id: 3,
            title: 'Мобильный интернет',
            cost: 200
        },
        {
            id: 4,
            title: 'Конференц-связь',
            cost: 0
        }
    ];

    getOptions(): Observable<OptionModel[]> {
        return of(this.options);
    }
}