import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToastService } from '@core/services/toast.service';
import { LoginService } from './services/login.service';
import { AuthService } from '@core/services/auth.service';
import { QuestionControlService } from '@core/services/question-control.service';
import { TextInputComponent } from "@shared/components/dynamic-form/text-input/text-input.component";
import { PasswordInputComponent } from "@shared/components/dynamic-form/password-input/password-input.component";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'school-login',
  imports: [FormsModule, ReactiveFormsModule, PasswordModule, ButtonModule, ToastModule, CommonModule, TextInputComponent, PasswordInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [QuestionControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginCompoent {
  loading = signal(false)
  formGroup = new FormGroup({
    username: new FormControl("", {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
    password: new FormControl("", {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]})
  })

  private _router = inject(Router)
  private _toastService = inject(ToastService)
  private _loginService = inject(LoginService)
  private _authService = inject(AuthService)

  login() {
    this.loading.set(true)
    this._loginService.login(this.formGroup.getRawValue())
      .pipe(
        untilDestroyed(this)
      )
      .subscribe({
      next: (res) => {
        this.loading.set(false)
        this._toastService.success('login successful')
        this._authService.saveAccessToken(res.data.access_token)
        this._authService.saveRefreshToken(res.data.refresh_token)
        this._router.navigate(['/teachers']).catch(() => {
         this._toastService.error("couldn't load main page")
       })
      }, error: (err) => {
        this.loading.set(false)
        this._toastService.error(err.error?.message || 'login failed')
      }
    })
  }
}
