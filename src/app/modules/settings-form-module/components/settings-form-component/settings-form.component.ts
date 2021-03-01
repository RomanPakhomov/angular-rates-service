import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { forbittenFieldValidator } from 'src/app/shared/validators/forbitten-field-validator.directive';
import { GetUser, GetUsers } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/state/app.state';
import { notifycationTypeId, UserModel } from 'src/app/types/user.type';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsFormComponent implements OnInit, OnDestroy {
  @Input() user: UserModel | null = null;
  form: FormGroup = new FormGroup({});
  notificationsSubscription: Subscription | null = null;
  notificationsTypeSubscription: Subscription | null = null;
  showNotifycationsWays: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private state: Store<AppState>
  ) {}

  ngOnInit(): void {
    if(!this.user?.fullName){
      this.router.navigate(['/']);
    }
    this.createForm()
  }

  createForm(user: UserModel | null = this.user): void {
    this.form = this.formBuilder.group({
      fullName: new FormControl(
        { value: user?.fullName, disabled: true },
        [ Validators.maxLength(200) ]
      ),
      userName: new FormControl(
        user?.userName,
        [ Validators.required, Validators.maxLength(200) ]
      ),
      email: new FormControl(
        { value: user?.email, disabled: user?.notificationsType !== notifycationTypeId.email },
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200),
          forbittenFieldValidator(/@/)
        ]
      ),
      phone: new FormControl(
        { value: user?.phone, disabled: user?.notificationsType !== notifycationTypeId.phone },
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          forbittenFieldValidator(/^89/),
          forbittenFieldValidator(/[0-9]/)
        ]
      ),
      notifications: new FormControl(user?.notifications),
      notificationsType: new FormControl(user?.notificationsType)
    })
    this.showNotifycationsWays = Boolean(user?.notifications);
    this.createFormListeners()
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
    this.userService.saveUser({
      id: this.user?.id,
      options: this.user?.options,
      ...this.form.getRawValue()
    });
    
    if(this.user){
      this.state.dispatch(new GetUsers());
      this.state.dispatch(new GetUser(this.user.id));
    }
    this.showSuccess()
    this.createForm(this.form.getRawValue())
  }

  reset(): void {
    this.createForm()
  }

  showSuccess(): void {
    this.toastr.success('Настройки успешно сохранены', '',);
  }

  ngOnDestroy(): void {
    this.notificationsSubscription?.unsubscribe();
    this.notificationsTypeSubscription?.unsubscribe();
  }

}
