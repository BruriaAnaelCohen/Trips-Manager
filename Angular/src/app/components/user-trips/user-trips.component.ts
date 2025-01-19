import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from 'src/app/classes/Trip';
import { TripType } from 'src/app/classes/TripType';
import { BookingPlacesService } from 'src/app/services/booking-places.service';
import { TripTypeService } from 'src/app/services/trip-type.service';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css'],
})
export class UserTripsComponent {
  tripsListFiltered: Array<Trip> = new Array<Trip>();
  allTypes: Array<TripType> = new Array<TripType>();
  allUserTrips: Array<Trip> = new Array<Trip>();
  hideLoading: boolean = false;
  hideHead: boolean = false;
  radio: Array<string> = new Array<string>();
  sortRadio: Array<string> = new Array<string>();
  constructor(
    public router: Router,
    public userSer: UserService,
    public triptsSer: TripTypeService,
    public tripsSer: TripService,
    public bookingSer: BookingPlacesService
  ) {}
  ngOnInit() {
    this.radio.push('Past trips');
    this.radio.push('Future trips');
    this.sortRadio.push('Price');
    this.sortRadio.push('Type');

    var url = this.router.url.split('/');
    if (url[1] == 'OurUsers' && url[2] == 'UserTrips' && Number(url[3])) {
      if (this.userSer.admin == true) this.hideHead = true;
      else this.router.navigate([``]);
    }

    this.triptsSer.GetTripTypes().subscribe(
      (data) => {
        this.allTypes = data;
        this.allTypes.push(new TripType(0, 'All'));
        console.log(this.allTypes);
      },
      (error) => {
        alert(error.message);
      }
    );

    if (this.userSer.admin == false) {
      this.userSer.GetUserTrips().subscribe(
        (data) => {
          this.hideLoading = true;
          this.allUserTrips = data.filter(
            (x) => new Date(x.TripDate) >= new Date()
          );
          this.tripsListFiltered = this.allUserTrips;
          console.log(this.allUserTrips);
        },
        (error) => alert(error.message)
      );
    } else {
      this.userSer.GetUserTripsByUserCode(Number(url[3])).subscribe(
        (data) => {
          this.hideLoading = true;
          this.allUserTrips = data;
          this.tripsListFiltered = data;
          console.log(this.allUserTrips);
        },
        (error) => alert(error.message)
      );
    }

    if (this.userSer.currUser != null && this.userSer.currUser != undefined) {
      this.userSer.GetUserTrips().subscribe(
        (data) => {
          this.allUserTrips = data;
        },
        (error) => alert(error.message)
      );
    }
  }

  filterList(type: string) {
    if (type == 'All') this.tripsListFiltered = this.allUserTrips;
    else
      this.tripsListFiltered = this.allUserTrips.filter(
        (x) => x.TypeNameDTO == type
      );
  }

  viewDetails(t: Trip) {
    this.tripsSer.currTrip = t;
    this.router.navigate([`SingleTrip/${t.TripCode}`]);
  }

  secoundFilter(f: string) {
    switch (f) {
      case 'Past trips': {
        this.tripsListFiltered = this.allUserTrips.filter(
          (t) => new Date(t.TripDate) < new Date()
        );
        break;
      }
      case 'Future trips': {
        this.tripsListFiltered = this.allUserTrips.filter(
          (t) => new Date(t.TripDate) > new Date()
        );
        break;
      }
    }
  }

  sort(s: string) {
    switch (s) {
      case 'Price': {
        this.tripsListFiltered = this.tripsListFiltered.sort(
          (x, y) => x.Price! - y.Price!
        );
        break;
      }
      case 'Type': {
        this.tripsListFiltered = this.tripsListFiltered.sort(
          (x, y) => x.TypeCode! - y.TypeCode!
        );
      }
    }
  }

  cantBeCanceled(t: Trip) {
    if (this.userSer.admin == false && new Date(t.TripDate) > new Date())
      return false;
    return true;
  }

  deleteBooking(tc: number) {
    this.bookingSer
      .GetBookingByCodes(this.userSer.currUser?.UserCode!, tc)
      .subscribe(
        (book) => {
          if (book != null && book != undefined)
            this.bookingSer.CancelBooking(book).subscribe(
              (data) => {
                if (data == true) {
                  alert('cancled successfuly');
                  this.router.navigate([`MyAccount`]);
                } else alert('error canceling booking');
              },
              (error) => alert(error.message)
            );
        },
        (err) => alert(err.message)
      );
  }
}
