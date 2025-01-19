import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BookingPlaces } from 'src/app/classes/BookingPlaces';
import { User } from 'src/app/classes/User';
import { BookingPlacesService } from 'src/app/services/booking-places.service';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent {
  constructor(
    public userSer: UserService,
    public tripSer: TripService,
    public bookSer: BookingPlacesService,
    public router: Router
  ) {}

  form: FormGroup = new FormGroup({});
  newBook: BookingPlaces = new BookingPlaces();
  ngOnInit(): void {
    this.form = new FormGroup({
      places: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(this.tripSer.currTrip?.AvailablePlaces!),
      ]),
      payment: new FormControl(true, [this.checkPaid.bind(this)]),
    });
  }

  get plc() {
    return this.form.controls['places'];
  }

  get paid() {
    return this.form.controls['payment'];
  }

  checkPaid(input: AbstractControl) {
    if (input.value == null || input.value == false)
      return { arrangePayment: true };
    return null;
  }

  BookMe() {
    debugger;
    this.newBook.UserCode = this.userSer.currUser?.UserCode;
    this.newBook.TripCode = this.tripSer.currTrip?.TripCode;
    this.newBook.NumberOfPlaces = this.plc.value;
    this.bookSer.AddBooking(this.newBook).subscribe(
      (data) => {
        debugger;
        if (data != -1) {
          alert('booked sucesfully');
          this.router.navigate([`MyAccount/MyTrips`]);
        }
      },
      (error) => {
        alert(error.message);
      }
    );
  }
}
