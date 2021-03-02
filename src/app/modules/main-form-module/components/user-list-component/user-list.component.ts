import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetUser } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/state/app.state';
import { OptionModel } from 'src/app/types/option.type';
import { UserModel } from 'src/app/types/user.type';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  @Input() users: UserModel[] | null = null;
  @Input() options: OptionModel[] | null = null;
  optionsMap: Map<number, OptionModel> | null = null;
  selectedUserId: number = 0;

  constructor(private state: Store<AppState>) { }

  ngOnInit(): void {
    if(this.users?.length){
      const firstUserId = this.users[0].id;
      this.selectedUserId = firstUserId;
      this.selectUser(firstUserId);
    }
    if(this.options){
      this.optionsMap = new Map(this.options.map(option => [option.id, option]));
    }
  }

  selected(id: number): boolean {
    return this.selectedUserId === id
  }

  selectUser(id: number): void {
    this.selectedUserId = id;
    this.state.dispatch(new GetUser(id));
  }

}
