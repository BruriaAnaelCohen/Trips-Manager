import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TripType } from 'src/app/classes/TripType';
import { TripTypeService } from 'src/app/services/trip-type.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-trip-type-form',
  templateUrl: './trip-type-form.component.html',
  styleUrls: ['./trip-type-form.component.css'],
})
export class TripTypeFormComponent {
  constructor(
    public l: Location,
    public userSer: UserService,
    public router: Router,
    public triptsSer: TripTypeService
  ) {}

  tmpType: TripType = new TripType();
  hideLoading: boolean = true;

  submitForm() {
    debugger;
    this.hideLoading = false;
    this.triptsSer.AddType(this.tmpType).subscribe(
      (data) => {
        if (data != -1) this.hideLoading = true;
        this.l.back();
      },
      (err) => alert(err.message)
    );
  }
}
