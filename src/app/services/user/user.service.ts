import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { newUserModel } from 'src/app/shared/models/newUser.model';
import { User } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public url: string = 'https://equipment-management-api.azurewebsites.net';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/api/user`);
  }

  createUser(newUser: newUserModel): Observable<User> {
    return this.http.post<User>(`${this.url}/api/user`, newUser);
  }

  deleteUser(id: string): Observable<any>{
    return this.http.delete<any>(`${this.url}/api/user/${id}`)
  }

  updateUser(id: string, user: newUserModel): Observable<any>{
    return this.http.put<any>(`${this.url}/api/user/${id}`, user)
  }
}
