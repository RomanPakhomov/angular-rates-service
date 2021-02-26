import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/types/user.type';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit {
  @Input() user: UserModel | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
