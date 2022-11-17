import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.buildLoginForm();
  }

  ngOnInit(): void {
  }

  buildLoginForm(){
    this.loginForm = this.formBuilder.group({
      user:['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get userField() {
    return this.loginForm.get('user');
  }
  get passwordField() {
    return this.loginForm.get('password');
  }

}
