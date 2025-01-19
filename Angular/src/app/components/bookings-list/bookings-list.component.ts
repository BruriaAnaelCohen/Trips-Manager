import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingPlaces } from 'src/app/classes/BookingPlaces';
import { BookingPlacesService } from 'src/app/services/booking-places.service';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css'],
})
export class BookingsListComponent implements OnInit {
  tripCode: number = -1;
  bookingList: Array<BookingPlaces> = new Array<BookingPlaces>();
  constructor(
    public bookSer: BookingPlacesService,
    public tripsSer: TripService,
    public userSer: UserService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public l: Location
  ) {}

  ngOnInit(): void {
    var url = this.router.url.split('/');
    if (
      this.userSer.admin == true &&
      url[1] == 'SingleTrip' &&
      Number(url[2]) &&
      url[3] == 'BookingList'
    ) {
      this.tripCode = Number(url[2]);
      this.tripsSer.GetAllBookingsByTCode(this.tripCode).subscribe(
        (data) => {
          debugger;
          if (data != null && data != undefined) this.bookingList = data;
          /*it jumps out, why doesnt it stay? ERROR TODO*/
        },
        (err) => {
          alert(err.message);
          this.l.back();
        }
      );
    } else {
      this.router.navigate([``]);
    }
  }
}
