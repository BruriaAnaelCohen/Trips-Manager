import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TripType } from '../classes/TripType';

@Injectable({
  providedIn: 'root',
})
export class TripTypeService {
  basicURL = 'https://localhost:7131/api/TripTypes/';

  constructor(public http: HttpClient) {}

  GetTripTypes(): Observable<Array<TripType>> {
    return this.http.get<Array<TripType>>(`${this.basicURL}GetAllTripTypes`);
  }

  AddType(t: TripType): Observable<number> {
    return this.http.post<number>(`${this.basicURL}AddType`, t);
  }
}
