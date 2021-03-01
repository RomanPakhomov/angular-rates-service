import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetOptions } from 'src/app/store/actions/option.actions';
import { GetUsers } from 'src/app/store/actions/user.actions';
import { selectOptionList } from 'src/app/store/selectors/option.selector';
import { selectSelectedUser, selectUserList } from 'src/app/store/selectors/user.selector';
import { AppState } from 'src/app/store/state/app.state';
import { OptionModel } from 'src/app/types/option.type';
import { UserModel } from 'src/app/types/user.type';

@Component({
  selector: 'app-main-form-page',
  templateUrl: './main-form-page.component.html',
  styleUrls: ['./main-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainFormPageComponent implements OnInit {
  users: Observable<UserModel[]> = this.state.select(selectUserList);
  options: Observable<OptionModel[]> = this.state.select(selectOptionList);
  user: Observable<UserModel> = this.state.select(selectSelectedUser);

  constructor(private state: Store<AppState>) { }

  ngOnInit(): void {
    this.state.dispatch(new GetUsers());
    this.state.dispatch(new GetOptions());
  }

}
