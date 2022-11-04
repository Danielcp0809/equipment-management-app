import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.route = this.router.url;
  }

  onClickItem(path: string) {
    this.router.navigate([path]);
    this.route = '/' + path;
  }
}
