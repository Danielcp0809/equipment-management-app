import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { newEquipment } from 'src/app/shared/models/newEquipment.model';
import { User } from 'src/app/shared/models/user.model';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-new-equipment-form',
  templateUrl: './new-equipment-form.component.html',
  styleUrls: ['./new-equipment-form.component.scss'],
})
export class NewEquipmentFormComponent implements OnInit, OnChanges {
  @Input() modalID!: string;
  @Input() newEquipForm!: FormGroup;
  @Input() usersList!: User[];
  @Input() userControl!: FormControl;
  @Output() onNewEquipSave = new EventEmitter<newEquipment>();
  filteredOptions!: Observable<User[]>;

  constructor() {}

  ngOnInit(): void {
    this.onUserSelectorChange()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onUserSelectorChange()
  }

  onUserSelectorChange(){
    this.filteredOptions = this.userControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name =
          typeof value === 'string' || value === null
            ? value
            : `${value['firstName']} ${value['lastName']}`;
        return name ? this.filterOption(name as string) : this.usersList.slice();
      })
    );
  }

  closeModal(id: string) {
    document.querySelector('#' + id)?.classList.remove('md-show');
    this.newEquipForm.reset();
    this.userControl.reset();
  }

  filterOption(name: string) {
    return this.usersList.filter(
      (user: User) =>
        user.firstName.toLowerCase().includes(name.toLowerCase()) ||
        user.lastName.toLocaleLowerCase().includes(name.toLowerCase())
    );
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

  onSaveForm(event: Event) {
    event.preventDefault();
    if (this.newEquipForm.invalid) return;
    const newEquip: newEquipment = this.newEquipForm.value;
    this.onNewEquipSave.emit(newEquip);
  }

  displayFn(user: User): string {
    return user && user.firstName ? `${user.firstName} ${user.lastName}` : '';
  }

  onSelectUser(event: any) {
    console.log(event.option.value.id);
    this.newEquipForm.patchValue({
      user_id: event.option.value.id,
    });
  }
}
