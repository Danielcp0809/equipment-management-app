import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEquipmentFormComponent } from './new-equipment-form.component';

describe('NewEquipmentFormComponent', () => {
  let component: NewEquipmentFormComponent;
  let fixture: ComponentFixture<NewEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEquipmentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
