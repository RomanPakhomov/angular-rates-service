import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';

@Pipe({
  name: 'pipeDate'
})
export class PipeDate implements PipeTransform {
  transform(date: string | undefined): string | undefined{
    return moment(date, "DD MM YYYY").format('DD.MM.YYYY') 
  }
}