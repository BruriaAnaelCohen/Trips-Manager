import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Trip } from 'src/app/classes/Trip';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent implements OnInit {
  userTrips: Array<Trip> = new Array<Trip>();
  bookedAlready: boolean = false;

  constructor(
    public router: Router,
    public tripsSer: TripService,
    public userSer: UserService
  ) {}

  ngOnInit(): void {
    if (this.tripsSer.currTrip == null || this.tripsSer.currTrip == undefined)
      this.router.navigate([`TripsList`]);
    if (this.userSer.currUser != null && this.userSer.currUser != undefined) {
      debugger;
      this.userSer.GetUserTrips().subscribe(
        (data) => {
          debugger;
          if (data != null) {
            this.userTrips = data;
            if (
              this.userTrips.find(
                (t) => t.TripCode == this.tripsSer.currTrip?.TripCode
              ) != null
            )
              this.bookedAlready = true;
            else this.bookedAlready = false;
          } else this.bookedAlready = false;
        },
        (error) => {
          alert(error.message);
        }
      );
    }
  }
  t?: Trip = this.tripsSer.currTrip;
  hideBookBtn: boolean = false;
  gotoBooking() {
    if (this.userSer.currUser == undefined || this.userSer.currUser == null)
      return '../../LogIn';
    else {
      this.hideBookBtn = true;
      return './BookingPlaces';
    }
  }
}
