import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

import { UserService } from './user.service';

fdescribe('UserService', () => {
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

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe('tests for getAllUser', () => {
    it('it should return a user list', (doneFnc) => {
      // AAA
      // 1.Arrange
      const mockData: User[] = [
        {
          id: '1',
          firstName: 'Daniel',
          lastName: 'Cordova',
          email: 'daniel.cordova@example.com',
          active: true,
          createdAt: '2022-11-02T05:40:01.290Z',
          updatedAt: '2022-11-02T05:40:01.290Z',
        },
      ];
      // 2.Act
      userService.getAllUsers().subscribe((res) => {
        // 3.Assert
        expect(res.length).toEqual(mockData.length);
        doneFnc();
      });

      // http config
      const req = httpController.expectOne(`${environment.API_URL}/api/user`); // watch if getAllUsers method calls the following endpoint
      req.flush(mockData); // resolve the created mock data emulating the real behavior
      httpController.verify();
    });
  });
});
