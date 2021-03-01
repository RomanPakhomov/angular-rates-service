import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GetUser, RemoveUserOption, SaveUserOptions } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/state/app.state';
import { OptionModel } from 'src/app/types/option.type';
import { UserModel } from 'src/app/types/user.type';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainFormComponent implements OnInit, OnChanges {
  @Input() options: OptionModel[] | null = [];
  @Input() user: UserModel | null = null;
  selectedOptions: OptionModel[] = [];
  unselectedOptions: OptionModel[] = [];
  filteredSelectedOptions: OptionModel[] = [];
  filteredUnselectedOptions: OptionModel[] = [];
  userOptionSet: Set<number> = new Set();
  form: FormGroup;
  optionName: FormControl = new FormControl(null);

  constructor(private state: Store<AppState>, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      options: new FormArray([])
    })
    this.optionName.valueChanges.subscribe(value => this.findOptions(value))
  }

  ngOnInit(): void {
  }

  findOptions(optionTitle: string){
    const lowerOptionTitle = optionTitle.toLowerCase();
    this.filteredSelectedOptions = this.selectedOptions.filter(option => {
      return option.title.toLowerCase().indexOf(lowerOptionTitle) !== -1
    })
    this.filteredUnselectedOptions = this.unselectedOptions.filter(option => {
      return option.title.toLowerCase().indexOf(optionTitle) !== -1
    })
    this.form = this.formBuilder.group({
      options: this.formBuilder.array(this.filteredUnselectedOptions.map(() => false))
    })
  }

  ngOnChanges(): void {
    if(this.user && this.options){
      this.userOptionSet = new Set(this.user.options.map(optionId => optionId));
      const selectedOptions: OptionModel[] = [];
      const unselectedOptions: OptionModel[] = [];
      this.options.forEach(option => {
        if(this.userOptionSet.has(option.id)){
          selectedOptions.push(option);
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

  saveOptions(): void {
    if(this.filteredUnselectedOptions && this.user){
      const userId = this.user.id;
      const optionsId = this.form.value.options
        .map((checked: boolean, i: number) => checked ? this.filteredUnselectedOptions[i].id : null)
        .filter((item: number) => item !== null);
      const selectedOptionsId = optionsId.concat(this.selectedOptions.map(option => option.id));
      this.state.dispatch(new SaveUserOptions({userId, optionsId: selectedOptionsId}));
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
