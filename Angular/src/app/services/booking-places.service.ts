import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingPlaces } from '../classes/BookingPlaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingPlacesService {
  basicURL = 'https://localhost:7131/api/BookingPlaces/';

  constructor(public http: HttpClient) {}

  public GetBookingByCodes(
    usercode: number,
    tripcode: number
  ): Observable<BookingPlaces> {
    return this.http.get<BookingPlaces>(
      `${this.basicURL}GetBookingByCodes/${usercode}/${tripcode}`
    );
  }

  public AddBooking(b: BookingPlaces): Observable<number> {
    return this.http.post<number>(`${this.basicURL}AddBooking`, b);
  }

  public CancelBooking(b: BookingPlaces): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.basicURL}CancelBooking/${b.BookingCode}`
    );
  }
}
