import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetUser } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/state/app.state';
import { UserModel } from 'src/app/types/user.type';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() users: UserModel[] | null = null;

  constructor(private state: Store<AppState>) { }

  ngOnInit(): void {
  }

  selectUser(id: number): void {
    this.state.dispatch(new GetUser(id));
  }

}
