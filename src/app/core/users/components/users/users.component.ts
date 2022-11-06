import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { newUserModel } from 'src/app/shared/models/newUser.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUserForm!: FormGroup;
  isEdit: boolean = false;
  userToEdit!: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data
    })
  }

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
    this.userService.createUser(newUser).subscribe((data: User) => {
      this.users = [...this.users, data]
      this.closeModal('new-user');
      this.newUserForm.reset();
    })
  }

  closeModal(id: string) {
    document.querySelector('#' + id)?.classList.remove('md-show');
    this.newUserForm.reset();
  }

  onUserDelete(id: string) {
    try {
      this.userService.deleteUser(id).subscribe((res) => {
        this.users = this.users.filter((user:User) => user.id !== id)
      })
    } catch (error) {
      console.error(error)
    }
  }
  
  onUserEdit(user: User){
    this.userToEdit = user;
    this.isEdit = true;
    const userInfo: newUserModel = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
    this.newUserForm.reset(userInfo)
    this.openModal('new-user')
  }

  onUserSave(user: newUserModel){
    this.userService.updateUser(this.userToEdit.id, user).subscribe((res) => {
      this.users = this.users.map((oldUser:User) => {
        if(oldUser.id === this.userToEdit.id){
          oldUser.firstName = user.firstName;
          oldUser.lastName = user.lastName;
          oldUser.email = user.email;
          oldUser.active = user.active ? user.active : this.userToEdit.active;
        }
        return oldUser;
      });
      this.closeModal('new-user');
      this.isEdit = false;
    })
  }
}
