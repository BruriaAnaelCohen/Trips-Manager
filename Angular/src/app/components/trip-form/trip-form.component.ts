import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from 'src/app/classes/Trip';
import { TripType } from 'src/app/classes/TripType';
import { User } from 'src/app/classes/User';
import { TripTypeService } from 'src/app/services/trip-type.service';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css'],
})
export class TripFormComponent implements OnInit {
  constructor(
    public tripsSer: TripService,
    public userSer: UserService,
    public router: Router,
    public triptsSer: TripTypeService
  ) {}

  form: FormGroup = new FormGroup({});
  tmpUser: User = new User();
  tmpTrip: Trip = new Trip();
  // currTrip: Trip = new Trip(); //not used TODO
  title: string = '';
  hideLoading: boolean = true;
  allTypes: Array<TripType> = new Array<TripType>();
  t: Trip = new Trip();

  ngOnInit(): void {
    // this.t==this.tripsSer.currTrip // משום מה הטופר לא מקבל את התונים מהסרוויס TODO
    var url = this.router.url.split('/');
    if (
      url[1] == 'SingleTrip' &&
      Number(url[2]) &&
      url[3] == 'EditTrip' &&
      this.userSer.admin == true
    )
      this.title = 'Edit Trip';
    else if (this.router.url == '/TripsList/AddTrip') this.title = 'Add Trip';
    else this.router.navigate([``]);

    this.triptsSer.GetTripTypes().subscribe(
      (data) => {
        this.allTypes = data;
        console.log(this.allTypes);
      },
      (error) => {
        alert(error.message);
      }
    );

    this.form = new FormGroup({
      destination: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z -]{2,30}'),
      ]),
      type: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [
        Validators.required,
        this.checkDate.bind(this),
      ]),
      duration: new FormControl(null, [
        Validators.required,
        Validators.min(3),
        Validators.max(12),
      ]),
      availableP: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(1500),
      ]),
      image: new FormControl(null, []), //Validators.pattern('^[^\s]+\.(jpg|jpeg|png|gif|bmp)$') TODO
    });
  }

  get dest() {
    return this.form.controls['destination'];
  }

  get tp() {
    return this.form.controls['type'];
  }

  get dt() {
    return this.form.controls['date'];
  }

  get dur() {
    return this.form.controls['duration'];
  }

  get avbl() {
    return this.form.controls['availableP'];
  }

  get prc() {
    return this.form.controls['price'];
  }

  get img() {
    return this.form.controls['image'];
  }

  chosen(t: string) {
    debugger;
    console.log(t);
  }

  checkDate(input: AbstractControl) {
    if (
      input.value == null ||
      new Date(input.value) <= new Date() ||
      new Date(input.value).getTime() >
        new Date().setMonth(new Date().getMonth() + 3)
    )
      return { dateErr: true };
    return null;
  }

  submitForm() {
    this.hideLoading = false;
    this.tmpTrip.TripDestination = this.form.value.destination;
    this.tmpTrip.TypeCode = this.allTypes.find(
      (x) => x.TypeName == this.form.value.type
    )?.TypeCode!;
    this.tmpTrip.TripDate = this.form.value.date;
    this.tmpTrip.TripDurationHours = this.form.value.duration;
    this.tmpTrip.AvailablePlaces = this.form.value.availableP;
    this.tmpTrip.Price = this.form.value.price;
    this.tmpTrip.Img =
      this.form.value.image == null || this.form.value.image == undefined
        ? ''
        : this.form.value.image;

    if (
      this.router.url[1] == 'SingleTrip' &&
      Number(this.router.url[2]) &&
      this.router.url[3] == 'EditTrip'
    ) {
      this.tmpTrip.TripCode = Number(this.router.url.split('/')[2]);
      this.tripsSer.UpdateTrip(this.tmpTrip).subscribe(
        (data) => {
          if (data == true) {
            this.router.navigate([`TripsList`]);
          } else 'error updating date';
        },
        (err) => alert(err.message)
      );
    } else if (this.router.url == '/TripsList/AddTrip') {
      this.tripsSer.AddTrip(this.tmpTrip).subscribe(
        (data) => {
          if (data != -1) {
            this.router.navigate([`/TripsList`]); // TODO gets the trips list oninit, but here it's not updated
          } else {
            alert('error adding trip');
          }
        },
        (err) => alert(err.message)
      );
    }
  }
}
