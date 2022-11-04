import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { newEquipment } from 'src/app/shared/models/newEquipment.model';

@Component({
  selector: 'app-new-equipment-form',
  templateUrl: './new-equipment-form.component.html',
  styleUrls: ['./new-equipment-form.component.scss']
})
export class NewEquipmentFormComponent implements OnInit {

  @Input() modalID!: string;
  @Input() newEquipForm!: FormGroup
  @Output() onNewEquipSave = new EventEmitter<newEquipment>();
  
  constructor() { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    document.querySelector('#' + id)?.classList.remove('md-show');
    this.newEquipForm.reset();
  }

  get brandField() {
    return this.newEquipForm.get('brand');
  }
  get modelField() {
    return this.newEquipForm.get('model');
  }
  get serialField() {
    return this.newEquipForm.get('serial');
  }
  get userIdField() {
    return this.newEquipForm.get('user_id');
  }

  onSaveForm(event: Event){
    event.preventDefault();
    if(this.newEquipForm.invalid) return;
    const newEquip: newEquipment = this.newEquipForm.value
    this.onNewEquipSave.emit(newEquip)
  }

}
