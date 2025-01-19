import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    localStorage.setItem('adminEmail', 'administrator@gmail.com');
    localStorage.setItem('adminPass', 'admin15256');
    localStorage.removeItem('tmpEmail');
  }
  title = 'AngularProjectBAC';
}
