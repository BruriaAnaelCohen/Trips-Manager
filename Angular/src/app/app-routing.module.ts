import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsListComponent } from './components/trips-list/trips-list.component';
import { TripComponent } from './components/trip/trip.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UserTripsComponent } from './components/user-trips/user-trips.component';
import { OurUsersComponent } from './components/our-users/our-users.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingsListComponent } from './components/bookings-list/bookings-list.component';
import { TripTypeFormComponent } from './components/trip-type-form/trip-type-form.component';

const routes: Routes = [
  { path: 'LogIn', component: UserFormComponent },
  { path: 'SignUp', component: UserFormComponent },
  {
    path: 'TripsList',
    component: TripsListComponent,
    children: [
      {
        path: 'AddTrip',
        component: TripFormComponent,
        children: [
          {
            path: 'AddType',
            component: TripTypeFormComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'OurUsers',
    component: OurUsersComponent,
    children: [{ path: 'UserTrips/:ucode', component: UserTripsComponent }],
  },
  {
    path: 'SingleTrip/:code',
    component: TripComponent,
    children: [
      { path: 'BookingPlaces', component: BookingFormComponent },
      {
        path: 'EditTrip',
        component: TripFormComponent,
        children: [{ path: 'AddType', component: TripTypeFormComponent }],
      },
      { path: 'BookingList', component: BookingsListComponent },
    ],
  },
  {
    path: 'MyAccount',
    component: UserAccountComponent,
    children: [
      { path: 'EditAccount', component: UserFormComponent },
      { path: 'MyTrips', component: UserTripsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
