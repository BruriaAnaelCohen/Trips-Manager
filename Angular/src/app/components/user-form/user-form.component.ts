import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/User';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  constructor(public userSer: UserService, public router: Router) {}

  form: FormGroup = new FormGroup({});
  tmpUser: User = new User();
  title: string = '';
  hideLoading: boolean = true;
  ngOnInit(): void {
    this.form = new FormGroup({
      fname: new FormControl(this.userSer.currUser?.FName, [
        Validators.pattern('[a-zA-Z ]{2,20}'),
      ]),
      lname: new FormControl(null, [Validators.pattern('[a-zA-Z ]{2,20}')]),
      phone: new FormControl(null, [Validators.pattern('[0-9]{10}')]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/),
      ]),
      paramedic: new FormControl(null, []),
    });
    if (this.router.url == '/SignUp') this.title = 'Sign Up';
    else if (this.router.url == '/LogIn') this.title = 'Log In';
    else if (
      this.router.url == '/MyAccount/EditAccount' &&
      this.userSer.currUser != null &&
      this.userSer != undefined
    ) {
      this.title = 'Edit my profile';
    } else this.router.navigate(['../../']);
  }

  get fn() {
    return this.form.controls['fname'];
  }

  get ln() {
    return this.form.controls['lname'];
  }

  get phn() {
    return this.form.controls['phone'];
  }

  get ml() {
    return this.form.controls['email'];
  }

  get psw() {
    return this.form.controls['password'];
  }

  hideAttribute() {
    if (
      this.router.url == '/SignUp' ||
      this.router.url == '/MyAccount/EditAccount'
    )
      return false;
    return true;
  }

  isRequired() {
    if (
      this.router.url == '/SignUp' ||
      this.router.url == '/MyAccount/EditAccount'
    )
      return true;
    return false;
  }

  getEmail() {
    return localStorage.getItem('tmpEmail');
  }

  getFname() {
    if (
      this.router.url == '/MyAccount/EditAccount' &&
      this.userSer.currUser != null &&
      this.userSer != undefined
    ) {
      console.log('name transformed: ');
      return this.userSer.currUser.FName;
    }

    return '';
  }

  submitForm() {
    this.hideLoading = false;
    this.tmpUser.FName = this.form.value.fname;
    this.tmpUser.LName = this.form.value.lname;
    this.tmpUser.Phone = this.form.value.phone;
    this.tmpUser.Email = this.form.value.email;
    this.tmpUser.LoginPassword = this.form.value.password;
    this.tmpUser.FirstAidCertificate =
      this.form.value.paramedic == true ? true : false;

    if (this.tmpUser?.Email != null && this.tmpUser.LoginPassword != null) {
      if (
        this.tmpUser.Email == localStorage.getItem('adminEmail') &&
        this.tmpUser.LoginPassword == localStorage.getItem('adminPass')
      ) {
        this.userSer.admin = true;
        this.router.navigate([`TripsList`]);
      } else {
        this.userSer
          .GetUserByMailAndPassword(
            this.tmpUser?.Email,
            this.tmpUser?.LoginPassword
          )
          .subscribe(
            (data) => {
              if (this.router.url == '/SignUp') {
                if (data != null && data != undefined) {
                  this.hideLoading = true;
                  alert("You've already signed up, go to log in please");
                  if (
                    this.tmpUser?.Email != null &&
                    this.tmpUser?.Email != undefined
                  ) {
                    localStorage.setItem('tmpEmail', this.tmpUser.Email);
                    alert(localStorage.getItem('tmpEmail'));
                  }
                  this.router.navigate([`LogIn`]);
                } else {
                  this.userSer.AddUser(this.tmpUser!).subscribe(
                    (numUser) => {
                      if (numUser != -1) {
                        this.userSer
                          .GetUserByMailAndPassword(
                            this.tmpUser.Email,
                            this.tmpUser.LoginPassword
                          )
                          .subscribe(
                            (d) => {
                              this.hideLoading = true;
                              if (d != null && d != undefined)
                                this.userSer.currUser = d;
                            },
                            (error) => alert(error.message)
                          );
                        this.router.navigate([`TripsList`]);
                      } else alert('It seems like an error accured, try again');
                    },
                    (error) => alert(error.message)
                  );
                }
              } else if (this.router.url == '/LogIn') {
                if (data != null && data != undefined) {
                  this.hideLoading = true;
                  this.userSer.currUser = data;
                  this.router.navigate([`TripsList`]);
                } else {
                  alert(
                    "It seems like your password is incorrect, or are you sure you've signed up before?"
                  );
                  this.hideLoading = true;
                  this.router.navigate([`LogIn`]);
                }
              } else {
                if (
                  this.userSer.currUser != null &&
                  this.userSer.currUser != undefined
                ) {
                  this.tmpUser.UserCode = this.userSer.currUser.UserCode;
                  this.userSer.UpdateUser(this.tmpUser).subscribe(
                    (d) => {
                      if (d == true) {
                        this.userSer
                          .GetUserByMailAndPassword(
                            this.tmpUser.Email,
                            this.tmpUser.LoginPassword
                          )
                          .subscribe(
                            (x) => {
                              if (x != null && x != undefined) {
                                this.userSer.currUser = x;
                                this.hideLoading = true;
                                alert('updated successfuly');
                              }
                            },
                            (y) => alert(y.error)
                          );
                      } else alert('Hmmm... Something went wrong');
                    },
                    (e) => alert(e.message)
                  );
                  this.router.navigate(['../../']);
                }
              }
            },
            (error) => {
              alert(error.message);
            }
          );
      }
    }
  }
}
