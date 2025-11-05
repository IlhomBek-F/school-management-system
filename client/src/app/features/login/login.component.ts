import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import {  Password, PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToastService } from '@core/services/toast.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'school-login',
  imports: [FormsModule, ReactiveFormsModule, InputText,Password, PasswordModule, ButtonModule, ToastModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginCompoent {
  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _toastService = inject(ToastService)
  private _loginService = inject(LoginService)

  loginForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false]
  });

  login() {
    this._loginService.login().subscribe({
      next: () => {
        this._toastService.success('login successful')
        this._router.navigate(['/teachers']).catch(() => {
        this._toastService.error("couldn't load main page")
       })
      }, error: () => {
        this._toastService.error('login failed')
      }
    })

  }
}
