import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { newEquipment } from 'src/app/shared/models/newEquipment.model';
import { generateManyUsers } from 'src/app/shared/models/user.mock';
import { User } from 'src/app/shared/models/user.model';
import { SharedModule } from 'src/app/shared/shared.module';

import { NewEquipmentFormComponent } from './new-equipment-form.component';

fdescribe('NewEquipmentFormComponent', () => {
  let component: NewEquipmentFormComponent;
  let fixture: ComponentFixture<NewEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewEquipmentFormComponent, ModalComponent],
      imports: [
        MaterialModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewEquipmentFormComponent);
    component = fixture.componentInstance;
    component.userControl = new FormControl('');
    component.newEquipForm = new FormGroup({
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      serial: new FormControl('', [Validators.required]),
      user_id: new FormControl('', [Validators.required]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test for input: isEdit', () => {
    it('should have title with "Update Equipment"', () => {
      component.isEdit = true;
      const titleDebug: DebugElement = fixture.debugElement;
      const h3Debug: DebugElement = titleDebug.query(By.css('h3'));
      const titleElement: HTMLElement = h3Debug.nativeElement;
      fixture.detectChanges();
      expect(titleElement?.textContent).toBe('Update Equipment');
    });

    it('should have title with "Create Equipment"', () => {
      component.isEdit = false;
      const titleDebug: DebugElement = fixture.debugElement;
      const h3Debug: DebugElement = titleDebug.query(By.css('h3'));
      const titleElement: HTMLElement = h3Debug.nativeElement;
      fixture.detectChanges();
      expect(titleElement?.textContent).toBe('Create Equipment');
    });

    it('should the isEdit input be true', () => {
      component.isEdit = true;
      expect(component.isEdit).toBe(true);
    });
  });

  describe('test for newEquipForm', () => {
    it('should brandField be "testBrand"', () => {
      const testBrand = 'testBrand';
      component.newEquipForm.controls['brand'].setValue(testBrand);
      expect(component.brandField?.value).toBe(testBrand);
    });
    it('should modelField be "TestModel"', () => {
      const testModel = 'TestModel';
      component.newEquipForm.controls['model'].setValue(testModel);
      expect(component.modelField?.value).toBe(testModel);
    });
    it('should serialField be "Serial123"', () => {
      const testSerial = 'Serial123';
      component.newEquipForm.controls['serial'].setValue(testSerial);
      expect(component.serialField?.value).toBe(testSerial);
    });
    it('should userIdField be "123"', () => {
      const testUserId = '123';
      component.newEquipForm.controls['user_id'].setValue(testUserId);
      expect(component.userIdField?.value).toBe(testUserId);
    });
  });

  describe('test for outputs', () => {
    it('should call onNewEquipSave', () => {
      const newEquipTestValues = {
        brand: 'TestBrand',
        model: 'TestModel',
        serial: 'Serial123',
        user_id: '321',
      };
      component.newEquipForm.setValue(newEquipTestValues);
      const buttonDe: DebugElement = fixture.debugElement.query(
        By.css('button.action-button')
      );
      let newEquipValue: newEquipment | undefined;
      component.onNewEquipSave.subscribe((newEquip) => {
        newEquipValue = newEquip;
      });
      buttonDe.triggerEventHandler('click', { preventDefault: () => {} });
      fixture.detectChanges();

      expect(newEquipValue).toEqual(newEquipTestValues);
    });

    it('should call onEquipSave', () => {
      const equipValues = {
        brand: 'TestBrand',
        model: 'TestModel',
        serial: 'Serial123',
        user_id: '321',
      };
      component.isEdit = true;
      component.newEquipForm.setValue(equipValues);
      const buttonDe: DebugElement = fixture.debugElement.query(
        By.css('button.action-button')
      );
      let newEquipValue: newEquipment | undefined;
      component.onEquipSave.subscribe((equip) => {
        newEquipValue = equip;
      });
      buttonDe.triggerEventHandler('click', { preventDefault: () => {} });
      fixture.detectChanges();
      expect(newEquipValue).toEqual(equipValues);
    });
  });
});

@Component({
  template: `<app-new-equipment-form
    modalID="new-equipment"
    [isEdit]="isEdit"
    [userControl]="usersListControl"
    [usersList]="usersList"
    [newEquipForm]="newEquipForm"
    (onNewEquipSave)="onNewEquipSave($event)"
    (onEquipSave)="onEquipSave($event)"
  >
  </app-new-equipment-form>`,
})
class PseudoEquipmentComponent {
  // it will have only the newEquipmentComponent to be tested
  constructor(private formBuilder: FormBuilder) {}
  usersList: User[] = generateManyUsers(3);
  usersListControl = new FormControl<string | User>('');
  newEquipForm: FormGroup = this.formBuilder.group({
    brand: ['', [Validators.required]],
    model: ['', [Validators.required]],
    serial: ['', [Validators.required]],
    user_id: ['', [Validators.required]],
  });
  isEdit = true;
  newEquipment: newEquipment | undefined;
  updatedEquipment: newEquipment | undefined;
  onNewEquipSave(equip: newEquipment) {
    this.newEquipment = equip;
  }
  onEquipSave(equip: newEquipment) {
    this.updatedEquipment = equip;
  }
}
describe('NewEquipmentFormComponent from PseudoEquipmentComponent', () => {
  // We are gonna test the father element (PseudoEquipmentComponent) instead of 
  // the child element (NewEquipmentFormComponent)
  let component: PseudoEquipmentComponent;
  let fixture: ComponentFixture<PseudoEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PseudoEquipmentComponent, NewEquipmentFormComponent],
      imports: [
        MaterialModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PseudoEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title: Update Equipment', () => {
    component.isEdit = true;
    const titleDe: DebugElement = fixture.debugElement.query(
      By.css('app-new-equipment-form h3')
    );
    const titleEl: HTMLElement = titleDe.nativeElement;
    fixture.detectChanges();
    expect(titleEl?.textContent).toBe('Update Equipment');
  });

  describe('test for outputs of newEquipmentFormComponent', () => {
    it('should call onEquipSave', () => {
      const equipValues: newEquipment = {
        brand: 'TestBrand',
        model: 'TestModel',
        serial: 'Serial123',
        user_id: '321',
      }
      component.isEdit = true,
      component.newEquipForm.setValue(equipValues);
      const buttonDe: DebugElement = fixture.debugElement.query(
        By.css('app-new-equipment-form button.action-button')
      );
      buttonDe.triggerEventHandler('click', { preventDefault: () => {} });
      expect(component.updatedEquipment).toEqual(equipValues);
    })
  })
});
