import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { forbittenFieldValidator } from 'src/app/shared/validators/forbitten-field-validator.directive';
import { notifycationTypeId, UserModel } from 'src/app/types/user.type';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit {
  @Input() user: UserModel | null = null;
  form: FormGroup = new FormGroup({});
  notificationsSubscription: Subscription | null = null;
  notificationsTypeSubscription: Subscription | null = null;
  showNotifycationsWays: boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm()
    this.createFormListeners()
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(
        { value: this.user?.fullName, disabled: true },
        [ Validators.maxLength(200) ]
      ),
      userName: new FormControl(
        this.user?.userName,
        [ Validators.required, Validators.maxLength(200) ]
      ),
      email: new FormControl(
        { value: this.user?.email, disabled: this.user?.notificationsType !== notifycationTypeId.email },
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200),
          forbittenFieldValidator(/@/)
        ]
      ),
      phone: new FormControl(
        { value: this.user?.phone, disabled: this.user?.notificationsType !== notifycationTypeId.phone },
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(11),
          forbittenFieldValidator(/^89/),
          forbittenFieldValidator(/[0-9]/)
        ]
      ),
      notifications: new FormControl(this.user?.notifications),
      notificationsType: new FormControl(this.user?.notificationsType)
    })
    this.showNotifycationsWays = Boolean(this.user?.notifications);
  }

  get userName(): AbstractControl | null {
    return this.form.get('userName');
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get phone(): AbstractControl | null {
    return this.form.get('phone');
  }

  createFormListeners(): void {
    this.notificationsSubscription = this.form.controls.notifications.valueChanges.subscribe(value => {
      this.showNotifycationsWays = value;
    });
    this.notificationsTypeSubscription = this.form.controls.notificationsType.valueChanges.subscribe(value => {
      switch (value) {
        case notifycationTypeId.email:
          this.form.controls.email.enable();
          this.form.controls.phone.disable();
          break;
        case notifycationTypeId.phone: {
          this.form.controls.phone.enable();
          this.form.controls.email.disable();
          break;
        }
      }
    })
  }
  
  submit(): void {
    console.log(this.user)
    console.log(this.form)
  }

  reset(): void {
    this.createForm()
  }

}
