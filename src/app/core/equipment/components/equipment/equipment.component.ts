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
    this.equipmentService.createEquipment(newEquip).subscribe((res) => {
      this.equipmentList = [...this.equipmentList, res];
      this.closeModal('new-equipment');
      this.newEquipForm.reset();
      this.usersListControl.reset();
    });
  }

  onUserDelete(id: string) {
    try {
      this.equipmentService.deleteEquipment(id).subscribe(() => {
        this.equipmentList = this.equipmentList.filter(
          (equip: Equipment) => equip.id !== id
        );
      });
    } catch (error) {}
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

  closeModal(id: string) {
    document.querySelector('#' + id)?.classList.remove('md-show');
    this.newEquipForm.reset();
    this.usersListControl.reset();
  }

  onEquipEdit(equip: Equipment) {
    this.equipToEdit = equip;
    this.openModal('new-equipment');
    this.isEdit = true;
    const equipInfo: newEquipment = {
      brand: equip.brand,
      model: equip.model,
      serial: equip.serial,
      user_id: equip.user ? equip.user.id.toString() : '',
    };
    this.newEquipForm.reset(equipInfo);
    this.usersListControl.reset(equip.user);
  }

  onEquipSave(equip: newEquipment) {
    const equipId = this.equipToEdit.id ? this.equipToEdit.id : '';
    this.equipToEdit.brand = equip.brand;
    this.equipToEdit.model = equip.model;
    this.equipToEdit.serial = equip.serial;
    this.equipToEdit.user =
      typeof this.usersListControl.value === 'string' ||
      this.usersListControl.value === null
        ? this.equipToEdit.user
        : this.usersListControl.value;
    delete this.equipToEdit.id;
    this.equipmentService
      .updateEquipment(equipId, this.equipToEdit)
      .subscribe(() => {
        this.equipmentList = this.equipmentList.map((oldEquip: Equipment) => {
          if (oldEquip.id === this.equipToEdit.id) oldEquip = this.equipToEdit;
          return oldEquip;
        });
        this.closeModal('new-equipment');
        this.isEdit = false;
      });
  }
}
