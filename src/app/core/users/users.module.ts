import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';


@NgModule({
  declarations: [
    UsersComponent,
    NewUserFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    UserService
  ]
})
export class UsersModule { }
