import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TripsListComponent } from './components/trips-list/trips-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TripComponent } from './components/trip/trip.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UserTripsComponent } from './components/user-trips/user-trips.component';
import { OurUsersComponent } from './components/our-users/our-users.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingsListComponent } from './components/bookings-list/bookings-list.component';
import { TripTypeFormComponent } from './components/trip-type-form/trip-type-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TripsListComponent,
    TripComponent,
    UserFormComponent,
    UserAccountComponent,
    UserTripsComponent,
    OurUsersComponent,
    TripFormComponent,
    TripTypeFormComponent,
    BookingFormComponent,
    BookingsListComponent,
    TripTypeFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
