import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { newUserModel } from 'src/app/shared/models/newUser.model';
import {
  generateManyUsers,
  generateOneUser,
} from 'src/app/shared/models/user.mock';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe('tests for getAllUser', () => {
    it('it should return a user list', (doneFnc) => {
      // AAA
      // 1.Arrange
      const mockData: User[] = generateManyUsers(2);
      // 2.Act
      userService.getAllUsers().subscribe((res) => {
        // 3.Assert
        expect(res.length).toEqual(mockData.length);
        doneFnc();
      });

      // http config
      const req = httpController.expectOne(`${environment.API_URL}/api/user`); // watch if getAllUsers method calls the following endpoint
      req.flush(mockData); // resolve the created mock data emulating the real behavior
    });
  });

  describe('test for createUser', () => {
    it('should return a new product', (doneFnc) => {
      // Arrange
      const mockData = generateOneUser();
      const newUserData: newUserModel = {
        firstName: 'Test firstname',
        lastName: 'Test lastname',
        email: 'example@test.com',
      };
      // Act
      userService.createUser(newUserData).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFnc();
      });
      // http config
      const url = `${environment.API_URL}/api/user`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(newUserData);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('test for updateUser', () => {
    it('should update a product', (doneFcn) => {
      const newUserData: newUserModel = {
        firstName: 'Test firstname',
        lastName: 'Test lastname',
        email: 'example@test.com',
      };
      const userId = '1';
      userService.updateUser(userId, newUserData).subscribe((data) => {
        expect(typeof data).toEqual('string');
        doneFcn();
      });

      const url = `${environment.API_URL}/api/user/${userId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      req.flush('' as any);
    });
  });

  describe('test for deleteUser', () => {
    it('should delete a product', (doneFcn) => {
      const userId = '1';
      userService.deleteUser(userId).subscribe((data) => {
        expect(typeof data).toEqual('string');
        doneFcn();
      });

      const url = `${environment.API_URL}/api/user/${userId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush('' as any);
    });
  });
});
