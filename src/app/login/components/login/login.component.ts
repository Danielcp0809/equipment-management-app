import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

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
    private msalService: MsalService
  ) {
    this.buildLoginForm();
  }

  ngOnInit(): void {}

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
    this.msalService.loginPopup().subscribe((res: AuthenticationResult) => {
      console.log(res.account)
      this.msalService.instance.setActiveAccount(res.account);
    });
  }

  logout() {
    this.msalService.logout();
  }

  get userField() {
    return this.loginForm.get('user');
  }
  get passwordField() {
    return this.loginForm.get('password');
  }
}
