import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectOptionList } from 'src/app/store/selectors/option.selector';
import { selectSelectedUser } from 'src/app/store/selectors/user.selector';
import { AppState } from 'src/app/store/state/app.state';
import { OptionModel } from 'src/app/types/option.type';
import { UserModel } from 'src/app/types/user.type';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {
  @Input() options: OptionModel[] | null = null;
  user: Observable<UserModel> = this.state.select(selectSelectedUser);

  constructor(private state: Store<AppState>) { }

  ngOnInit(): void {
  }

}
