import * as mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: String,
  issuedby: String,
  email: String
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
