import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(public UserSer: UserService, public router: Router) {}

  userNotInSystem() {
    if (this.UserSer.currUser != null && this.UserSer.currUser != undefined) {
      return false;
    }
    return true;
  }
  hideLogInSignUp() {
    if (
      this.UserSer.admin == true ||
      (this.UserSer.currUser != null && this.UserSer.currUser != undefined)
    )
      return true;
    return false;
  }
  hideMyAccount() {
    if (this.UserSer.currUser != null && this.UserSer.currUser != undefined)
      return false;
    return true;
  }
  logOut() {
    var ans = confirm('Are you sure you want to log out?');
    if (ans) {
      this.UserSer.currUser = undefined;
      this.UserSer.admin = false;
      this.router.navigate([``]);
    }
  }
}
