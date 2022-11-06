import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { newEquipment } from 'src/app/shared/models/newEquipment.model';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent implements OnInit {
  equipmentList: Equipment[] = [];
  newEquipForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private equipmentService: EquipmentService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getEquipment()
  }

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

  getEquipment(){
    this.equipmentService.getAllEquipment().subscribe((data: any) => {
      this.equipmentList = data
    })
  }
}
