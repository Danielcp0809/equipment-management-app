import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:any[]=[1,1,1,1,1,1,11,1,1,1]

  constructor() { }

  ngOnInit(): void {
  }

}
