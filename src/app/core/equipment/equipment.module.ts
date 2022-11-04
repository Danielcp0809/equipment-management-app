import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { MaterialModule } from 'src/app/material/material.module';
import { NewEquipmentFormComponent } from './components/new-equipment-form/new-equipment-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EquipmentComponent,
    NewEquipmentFormComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EquipmentModule { }
