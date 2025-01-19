import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { Trip } from 'src/app/classes/Trip';
import { TripType } from 'src/app/classes/TripType';
import { User } from 'src/app/classes/User';
import { TripTypeService } from 'src/app/services/trip-type.service';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css'],
})
export class TripsListComponent implements OnInit {
  tripsList: Array<Trip> = new Array<Trip>();
  tripsListFiltered: Array<Trip> = new Array<Trip>();
  users: Array<User> = new Array<User>();
  allTypes: Array<TripType> = new Array<TripType>();
  allUserTrips: Array<Trip> = new Array<Trip>();
  hideLoading: boolean = false;
  title: string = 'Trips List';
  radio: Array<string> = new Array<string>();

  constructor(
    public router: Router,
    public tripsSer: TripService,
    public userSer: UserService,
    public triptsSer: TripTypeService
  ) {}
  ngOnInit() {
    this.radio.push('Past trips');
    this.radio.push('Future trips');
    this.radio.push("Today's trips");
    this.radio.push("This week's trips");
    this.radio.push("This month's trips");

    this.userSer.GetAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        alert(error.message);
      }
    );

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

    this.tripsSer.GetAllTrips().subscribe(
      (data) => {
        this.hideLoading = true;
        if (this.userSer.admin == false)
          this.tripsList = data.filter(
            (x) => new Date(x.TripDate) >= new Date()
          );
        else this.tripsList = data;
        this.tripsListFiltered = this.tripsList;
        console.log(this.tripsList);
      },
      (error) => {
        alert(error.message);
      }
    );

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
    if (type == 'All') this.tripsListFiltered = this.tripsList;
    else
      this.tripsListFiltered = this.tripsList.filter(
        (x) => x.TypeNameDTO == type
      );
  }

  filterListAdmin(f: string) {
    if (this.userSer.admin == true) {
      switch (f) {
        case 'Past trips': {
          this.tripsListFiltered = this.tripsList.filter(
            (t) => new Date(t.TripDate) < new Date()
          );
          break;
        }
        case 'Future trips': {
          this.tripsListFiltered = this.tripsList.filter(
            (t) => new Date(t.TripDate) > new Date()
          );
          break;
        }
        case "Today's trips": {
          this.tripsListFiltered = this.tripsList.filter(
            (t) => new Date(t.TripDate) == new Date()
          );
          break;
        }
        case "This week's trips": {
          this.tripsListFiltered = this.tripsList.filter(
            (t) =>
              new Date(t.TripDate).getTime() <=
                new Date().setDate(new Date().getDay() + 7) &&
              new Date(t.TripDate) >= new Date()
          );
          break;
        }
        case "This month's trips": {
          this.tripsListFiltered = this.tripsList.filter(
            (t) =>
              new Date(t.TripDate).getTime() <=
                new Date().setMonth(new Date().getMonth() + 1) &&
              new Date(t.TripDate) >= new Date()
          );
          break;
        }
      }
    }
  }

  viewEditDetails(t: Trip) {
    this.tripsSer.currTrip = t;
    if (this.userSer.admin == false)
      this.router.navigate([`SingleTrip/${t.TripCode}`]);
    else if (this.userSer.admin == true) {
      this.router.navigate([`SingleTrip/${t.TripCode}/EditTrip`]);
    }
  }

  viewBookings(t: Trip) {
    this.router.navigate([`SingleTrip/${t.TripCode}/BookingList`]);
  }

  userTrip(t: Trip) {
    if (this.allUserTrips.findIndex((x) => x == t) != -1) return true;
    return false;
  }
}
