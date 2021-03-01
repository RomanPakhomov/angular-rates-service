import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { GetUser, RemoveUserOption, SaveUserOptions } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/state/app.state';
import { OptionModel } from 'src/app/types/option.type';
import { UserModel, UserOptionModel } from 'src/app/types/user.type';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainFormComponent implements OnChanges {
  @Input() options: OptionModel[] | null = [];
  @Input() user: UserModel | null = null;
  selectedOptions: OptionModel[] = [];
  unselectedOptions: OptionModel[] = [];
  filteredSelectedOptions: OptionModel[] = [];
  filteredUnselectedOptions: OptionModel[] = [];
  userOptionsMap: Map<number, UserOptionModel> = new Map();
  form: FormGroup;
  optionName: FormControl = new FormControl(null);
  delete = faTimes;

  constructor(private state: Store<AppState>, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      options: new FormArray([])
    })
    this.optionName.valueChanges.subscribe(value => this.findOptions(value))
  }

  ngOnChanges(): void {
    if(this.user && this.options){
      this.userOptionsMap = new Map(this.user.options.map(option => [option.id, option]));
      const selectedOptions: OptionModel[] = [];
      const unselectedOptions: OptionModel[] = [];
      this.options.forEach(option => {
        if(this.userOptionsMap.has(option.id)){
          selectedOptions.push({...option, startDate: this.userOptionsMap.get(option.id)?.startDate});
        } else {
          unselectedOptions.push(option);
        }
      });
      this.selectedOptions = selectedOptions;
      this.unselectedOptions = unselectedOptions;
      this.filteredSelectedOptions = selectedOptions;
      this.filteredUnselectedOptions = unselectedOptions;
      this.form = this.formBuilder.group({
        options: this.formBuilder.array(this.filteredUnselectedOptions.map(() => false))
      })
    }
  }

  get optionsAsArray(): FormArray{
    return this.form.controls.options as FormArray;
  }

  get showSelectedNotice(): boolean {
    return this.filteredSelectedOptions.length === 0;
  }

  get showUnselectedNotice(): boolean {
    return this.filteredUnselectedOptions.length === 0;
  }

  findOptions(optionTitle: string){
    const lowerOptionTitle = optionTitle.toLowerCase();
    this.filteredSelectedOptions = this.selectedOptions.filter(option => {
      return option.title.toLowerCase().indexOf(lowerOptionTitle) !== -1
    })
    this.filteredUnselectedOptions = this.unselectedOptions.filter(option => {
      return option.title.toLowerCase().indexOf(lowerOptionTitle) !== -1
    })
    this.form = this.formBuilder.group({
      options: this.formBuilder.array(this.filteredUnselectedOptions.map(() => false))
    })
  }

  saveOptions(): void {
    if(this.filteredUnselectedOptions && this.user){
      const userId = this.user.id;
      const optionsId = this.form.value.options
        .map((checked: boolean, i: number) => checked 
          ? { id: this.filteredUnselectedOptions[i].id, startDate: moment().format('DD.M.YYYY') } 
          : null
        )
        .filter((item: number) => item !== null);
      const options = optionsId.concat(this.selectedOptions.map(option => option));
      this.state.dispatch(new SaveUserOptions({userId, options: options}));
      this.state.dispatch(new GetUser(userId));
    }
  }

  removeUserOption(optionId: number): void {
    if(this.user){
      const userId = this.user.id;
      this.state.dispatch(new RemoveUserOption({ userId, optionId }));
      this.state.dispatch(new GetUser(userId));
    }
  }

}
