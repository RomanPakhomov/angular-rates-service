import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GetUser, RemoveUserOption } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/state/app.state';
import { OptionModel } from 'src/app/types/option.type';
import { UserModel } from 'src/app/types/user.type';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit, OnChanges {
  @Input() options: OptionModel[] | null = null;
  @Input() user: UserModel | null = null;
  selectedOptions: OptionModel[] | null = null;
  unselectedOptions: OptionModel[] | null = null;
  userOptionSet: Set<number> = new Set();
  form: FormGroup;

  constructor(private state: Store<AppState>, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      options: new FormArray([])
    })
  }

  ngOnInit(): void {
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


      this.form = this.formBuilder.group({
        options: this.formBuilder.array(this.unselectedOptions.map((option) => false))
      })
    }
  }

  get optionsAsArray(): FormArray{
    return this.form.controls.options as FormArray;
  }

  saveOptions(): void {
    console.log(this.form)
  }

  removeUserOption(optionId: number): void {
    console.log('test')
    if(this.user){
      const userId = this.user.id;
      this.state.dispatch(new RemoveUserOption({ userId, optionId }));
      this.state.dispatch(new GetUser(userId));
    }
  }

}
