import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Booking } from '../shared/models/booking.model';

@Injectable()
export class BookingService {

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>('/api/bookings');
  }

  countBookings(): Observable<number> {
    return this.http.get<number>('/api/bookings/count');
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>('/api/booking', booking);
  }

  getBooking(booking: Booking): Observable<Booking> {
    return this.http.get<Booking>(`/api/booking/${booking._id}`);
  }

  editBooking(booking: Booking): Observable<any> {
    return this.http.put(`/api/booking/${booking._id}`, booking, { responseType: 'text' });
  }

  deleteBooking(booking: Booking): Observable<any> {
    return this.http.delete(`/api/booking/${booking._id}`, { responseType: 'text' });
  }

}
