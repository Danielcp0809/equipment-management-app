import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';
import { UserService } from 'src/app/services/user/user.service';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { newEquipment } from 'src/app/shared/models/newEquipment.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent implements OnInit {
  equipmentList: Equipment[] = [];
  newEquipForm!: FormGroup;
  usersListControl = new FormControl<string | User>('');
  isEdit: boolean = false;
  equipToEdit!: Equipment;
  usersList: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private equipmentService: EquipmentService,
    private userService: UserService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getEquipment();
    this.getUserList();
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

  getEquipment() {
    this.equipmentService.getAllEquipment().subscribe((data: any) => {
      this.equipmentList = data;
    });
  }

  getUserList() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.usersList = data;
    });
  }

  onEquipEdit(equip: Equipment) {
    this.equipToEdit = equip;
    this.isEdit = true;
    const equipInfo: newEquipment = {
      brand: equip.brand,
      model: equip.model,
      serial: equip.serial,
      user_id: equip.user ? equip.user.id : '',
    };
  }
}
