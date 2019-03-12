import * as express from 'express';

import BookCtrl from './controllers/book';
import UserCtrl from './controllers/user';
import BookingCtrl from './controllers/booking'

export default function setRoutes(app) {

  const router = express.Router();

  const bookCtrl = new BookCtrl();
  const userCtrl = new UserCtrl();
  const bookingCtrl=new BookingCtrl();

  // Books
  router.route('/books').get(bookCtrl.getAll);
  router.route('/books/count').get(bookCtrl.count);
  router.route('/book').post(bookCtrl.insert);
  router.route('/book/:id').get(bookCtrl.get);
  router.route('/book/:id').put(bookCtrl.update);
  router.route('/book/:id').delete(bookCtrl.delete);

  // Bookings
  router.route('/bookings').get(bookingCtrl.getAll);
  router.route('/bookings/count').get(bookingCtrl.count);
  router.route('/booking').post(bookingCtrl.insert);
  router.route('/booking/:id').get(bookingCtrl.get);
  router.route('/booking/:id').put(bookingCtrl.update);
  router.route('/booking/:id').delete(bookingCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
