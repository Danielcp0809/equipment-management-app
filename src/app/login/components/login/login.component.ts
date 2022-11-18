import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  visibility: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private msalService: MsalService,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildLoginForm();
  }

  ngOnInit(): void {
    if(this.authService.getCurrentUserInfo()){
      this.router.navigate(['/users'])
    } 
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  toogleVisibility() {
    this.visibility = !this.visibility;
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  get userField() {
    return this.loginForm.get('user');
  }
  get passwordField() {
    return this.loginForm.get('password');
  }
}
