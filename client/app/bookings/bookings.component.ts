import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Booking } from '../shared/models/booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  booking = new Booking();
  bookings: Booking[] = [];
  isLoading = true;
  isEditing = false;

  addBookingForm: FormGroup;
  name = new FormControl('', Validators.required);
  issuedby = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);

  constructor(private bookingService: BookingService,
              public auth: AuthService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getBookings();
    this.addBookingForm = this.formBuilder.group({
      name: this.name,
      issuedby: this.issuedby,
      email: this.email
    });
  }

  getBookings() {
    this.bookingService.getBookings().subscribe(
      data => this.bookings = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addBooking() {
    this.bookingService.addBooking(this.addBookingForm.value).subscribe(
      res => {
        this.bookings.push(res);
        this.addBookingForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(booking: Booking) {
    this.isEditing = true;
    this.booking = booking;
  }

  cancelEditing() {
    this.isEditing = false;
    this.booking = new Booking();
    this.toast.setMessage('item editing cancelled.', 'warning');
    this.getBookings();
  }

  editBooking(booking: Booking) {
    this.bookingService.editBooking(booking).subscribe(
      () => {
        this.isEditing = false;
        this.booking = booking;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteBooking(booking: Booking) {
    if (window.confirm('Are you sure?')) {
      this.bookingService.deleteBooking(booking).subscribe(
        () => {
          const pos = this.bookings.map(elem => elem._id).indexOf(booking._id);
          this.bookings.splice(pos, 1);
          this.toast.setMessage('Book Returned successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
