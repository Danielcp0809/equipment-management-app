import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  menuItems: any[] = [
    {
      title: 'Users',
      path: 'users',
      icon: 'group'
    },
    {
      title: 'Equipment',
      path: 'equipment',
      icon: 'devices'
    },
  ];

  route: string = '';

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.route = this.router.url;
  }

  onClickItem(path: string) {
    this.router.navigate([path]);
    this.route = '/' + path;
  }

  logout(){
    this.authService.logout()
  }
}
