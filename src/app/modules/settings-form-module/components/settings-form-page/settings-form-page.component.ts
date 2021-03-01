import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedUser } from 'src/app/store/selectors/user.selector';
import { AppState } from 'src/app/store/state/app.state';
import { UserModel } from 'src/app/types/user.type';

@Component({
  selector: 'app-settings-form-page',
  templateUrl: './settings-form-page.component.html',
  styleUrls: ['./settings-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsFormPageComponent {
  user: Observable<UserModel> = this.state.select(selectSelectedUser);

  constructor(private state: Store<AppState>) { }

}
