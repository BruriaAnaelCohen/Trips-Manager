import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-our-users',
  templateUrl: './our-users.component.html',
  styleUrls: ['./our-users.component.css'],
})
export class OurUsersComponent implements OnInit {
  users: Array<User> = new Array<User>();
  selectedU: User = new User();
  constructor(public userSer: UserService, public router: Router) {}
  ngOnInit(): void {
    this.userSer.GetAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        alert(error.message);
      }
    );
  }
  viewUserTrips(u: User) {
    this.selectedU = u;
    this.router.navigate([`OurUsers/UserTrips/${u.UserCode}`]);
  }
}
