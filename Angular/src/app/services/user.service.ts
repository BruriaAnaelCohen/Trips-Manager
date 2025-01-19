import { Injectable } from '@angular/core';
import { User } from '../classes/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../classes/Trip';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public admin: boolean = false;
  public currUser: User | undefined;

  basicURL: string = 'https://localhost:7131/api/Users/';

  constructor(public http: HttpClient) {}

  GetAllUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.basicURL}GetAllUsers`);
  }

  GetUserByMailAndPassword(email: string, password: string): Observable<User> {
    return this.http.get<User>(
      `${this.basicURL}GetUserByMailAndPassword/${email}/${password}`
    );
  }

  AddUser(user: User): Observable<number> {
    return this.http.post<number>(`${this.basicURL}AddUser`, user);
  }

  GetUserTrips(): Observable<Array<Trip>> {
    return this.http.get<Array<Trip>>(
      `${this.basicURL}GetUserTrips/${this.currUser?.UserCode}`
    );
  }

  GetUserTripsByUserCode(ucode: number): Observable<Array<Trip>> {
    return this.http.get<Array<Trip>>(`${this.basicURL}GetUserTrips/${ucode}`);
  }

  UpdateUser(user: User): Observable<boolean> {
    return this.http.put<boolean>(`${this.basicURL}UpdateUser`, user);
  }

  DeleteUser(userCode: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.basicURL}DeleteUser/${userCode}`);
  }
}
