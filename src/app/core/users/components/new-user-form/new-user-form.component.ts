import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { newUserModel } from 'src/app/shared/models/newUser.model';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.scss'],
})
export class NewUserFormComponent implements OnInit {
  @Input() modalID!: string;
  @Input() newUserForm!: FormGroup;
  @Output() onNewUserSave = new EventEmitter<newUserModel>();
  constructor() {}

  ngOnInit(): void {}

  closeModal(id: string) {
    document.querySelector('#' + id)?.classList.remove('md-show');
    this.newUserForm.reset();
  }

  get firstNameField() {
    return this.newUserForm.get('firstName');
  }
  get lastNameField() {
    return this.newUserForm.get('lastName');
  }
  get emailField() {
    return this.newUserForm.get('email');
  }

  onSaveForm(event: Event) {
    event.preventDefault();
    if (this.newUserForm.invalid) return;
    const newUser: newUserModel = this.newUserForm.value;
    this.onNewUserSave.emit(newUser);
  }
}
