import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { newEquipment } from 'src/app/shared/models/newEquipment.model';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent implements OnInit {
  equipmentList: any[] = [1, 1, 1, 1, 1, 1, 11, 1, 1, 1];
  newEquipForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.newEquipForm = this.formBuilder.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      serial: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
    });
  }

  onNewEquipSave(newEquip: newEquipment) {
    console.log(newEquip);
  }

  openModal(id: string) {
    document.querySelector('#' + id)?.classList.add('md-show');
  }
}
