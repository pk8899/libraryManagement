import Booking from '../models/booking';
import BaseCtrl from './base';

export default class BookingCtrl extends BaseCtrl {
  model = Booking;
}
