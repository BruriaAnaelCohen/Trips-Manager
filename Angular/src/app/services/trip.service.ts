import { Injectable } from '@angular/core';
import { Trip } from '../classes/Trip';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingPlaces } from '../classes/BookingPlaces';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  tripsList: Array<Trip> = new Array<Trip>();
  currTrip: Trip | undefined;
  basicURL: string = 'https://localhost:7131/api/Trips/';

  constructor(public http: HttpClient) {}

  GetAllTrips(): Observable<Array<Trip>> {
    return this.http.get<Array<Trip>>(`${this.basicURL}GetAllTrips`);
  }

  GetTripByCode(code: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.basicURL}GetTripByTCode/${code}`);
  }

  GetAllBookingsByTCode(tc: number): Observable<Array<BookingPlaces>> {
    return this.http.get<Array<BookingPlaces>>(
      `${this.basicURL}GetAllBookingsByTCode/${tc}`
    );
  }

  AddTrip(t: Trip): Observable<number> {
    return this.http.post<number>(`${this.basicURL}AddTrip`, t);
  }

  UpdateTrip(t: Trip): Observable<boolean> {
    return this.http.put<boolean>(`${this.basicURL}UpdateTrip`, t);
  }
}
