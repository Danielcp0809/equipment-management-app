import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    EquipmentComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    MaterialModule
  ]
})
export class EquipmentModule { }
