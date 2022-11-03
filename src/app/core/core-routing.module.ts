import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'',
        redirectTo: '/users',
        pathMatch: 'full'
      },
      {
        path:'users',
        canActivate: [AdminGuard],
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule)
      },
      {
        path:'equipment',
        canActivate:[AdminGuard],
        loadChildren: () => import('./equipment/equipment.module').then((m) => m.EquipmentModule)
      } 
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
