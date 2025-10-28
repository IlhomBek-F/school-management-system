import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import {  Password, PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'school-login',
  imports: [FormsModule, ReactiveFormsModule, InputText,Password, PasswordModule, ButtonModule, ToastModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginCompoent {
  _fb = inject(FormBuilder)
  _router = inject(Router)

  loginForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false]
  });

  login() {
    this._router.navigate(['/teachers'])
  }
}
