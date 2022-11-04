import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { newUserModel } from 'src/app/shared/models/newUser.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [1, 1, 1, 1, 1, 1, 11, 1, 1, 1];
  newUserForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.newUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  openModal(id: string) {
    document.querySelector('#' + id)?.classList.add('md-show');
  }

  onNewUserSave(newUser: newUserModel) {
    console.log(newUser);
  }
}
