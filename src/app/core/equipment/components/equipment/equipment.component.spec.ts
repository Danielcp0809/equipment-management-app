import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';
import { UserService } from 'src/app/services/user/user.service';
import { generateManyUsers } from 'src/app/shared/models/user.mock';
import { NewEquipmentFormComponent } from '../new-equipment-form/new-equipment-form.component';
import { of } from 'rxjs';
import { EquipmentComponent } from './equipment.component';
import { generateManyEquipment } from 'src/app/shared/models/equipment.mock';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let fixture: ComponentFixture<EquipmentComponent>;
  let equipmentServiceSpy: jasmine.SpyObj<EquipmentService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    // create the spies to use
    const equipmentSpy = jasmine.createSpyObj('EquipmentService', [
      'getAllEquipment',
      'createEquipment',
      'deleteEquipment',
      'updateEquipment',
    ]);
    const userSpy = jasmine.createSpyObj('UserService', ['getAllUsers']);
    // configure test bed with the spies
    await TestBed.configureTestingModule({
      declarations: [EquipmentComponent, NewEquipmentFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: EquipmentService, // define the services and
          useValue: equipmentSpy, // the spi to replace the service
        },
        {
          provide: UserService,
          useValue: userSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentComponent);
    component = fixture.componentInstance;
    // before the ngOnInit, we must have the user data already mocked so we should spy
    // the method that will gonna execute in the ngOnInit.
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    equipmentServiceSpy = TestBed.inject(
      EquipmentService
    ) as jasmine.SpyObj<EquipmentService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the getAllUsers and getAllEquipment methods be called', () => {
    // before the ngOnInit, we must have the user data already mocked so we should spy
    // the method that will gonna execute in the ngOnInit.
    const equipmentMock = generateManyEquipment(10);
    const usersMock = generateManyUsers(4);
    userServiceSpy.getAllUsers.and.returnValue(of(usersMock));
    equipmentServiceSpy.getAllEquipment.and.returnValue(of(equipmentMock));
    fixture.detectChanges();
    expect(userServiceSpy.getAllUsers).toHaveBeenCalled();
    expect(equipmentServiceSpy.getAllEquipment).toHaveBeenCalled();
  });
});
