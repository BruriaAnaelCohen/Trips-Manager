import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent {
  ifBooked: boolean = false;
  hideEdit: boolean = false;

  constructor(public userSer: UserService, public router: Router) {}

  viewEditComp() {
    this.hideEdit = true;
    this.router.navigate([`MyAccount/EditAccount`]);
    alert(this.router.url);
  }

  DeleteAccount() {
    if (this.userSer.currUser != undefined && this.userSer.currUser != null) {
      const ans = confirm('Are you sure you want to delete your account?');
      if (ans == true) {
        this.userSer.DeleteUser(this.userSer.currUser.UserCode!).subscribe(
          (data) => {
            if (data == true) {
              alert('User deleted successfuly');
              this.userSer.currUser = undefined;
              this.router.navigate([``]);
            } else 'You are booked in some trips, cancel booking to delete';
          },
          (error) => alert(error.message)
        );
      }
    }
  }

  ViewMyTrips() {
    this.router.navigate([`MyAccount/MyTrips`]);
  }
}
