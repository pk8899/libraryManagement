import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BookService } from '../services/book.service';
import { BookingService } from '../services/booking.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Book } from '../shared/models/book.model';
import { Booking } from '../shared/models/booking.model';
import { AuthService } from '../services/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  book = new Book();
  booking=new Booking();
  books: Book[] = [];
  bookName="";
  issuedBy="";
  email="";

  isLoading = true;
  isEditing = false;

  addBookForm: FormGroup;
  name = new FormControl('', Validators.required);
  author = new FormControl('', Validators.required);
  publisher = new FormControl('', Validators.required);

  constructor(private bookService: BookService,
              private bookingService:BookingService,
              public auth: AuthService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getBooks();
    this.addBookForm = this.formBuilder.group({
      name: this.name,
      author: this.author,
      publisher: this.publisher
    });
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      data => this.books = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addBook() {
    this.bookService.addBook(this.addBookForm.value).subscribe(
      res => {
        this.books.push(res);
        this.addBookForm.reset();
        this.toast.setMessage('Book added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(book: Book) {
    this.isEditing = true;
    this.book = book;
  }

  cancelEditing() {
    this.isEditing = false;
    this.book = new Book();
    this.toast.setMessage('Book editing cancelled.', 'warning');
    // reload the books to reset the editing
    this.getBooks();
  }

  editBook(book: Book) {
    this.bookService.editBook(book).subscribe(
      () => {
        this.isEditing = false;
        this.book = book;
        this.toast.setMessage('Book edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteBook(book: Book) {
    if (window.confirm('Are you sure you want to permanently delete this Book?')) {
      this.bookService.deleteBook(book).subscribe(
        () => {
          const pos = this.books.map(elem => elem._id).indexOf(book._id);
          this.books.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  addBooking(name,issuedby,email) {
    this.booking={"email":email,"issuedby":issuedby,"name":name};
    this.bookingService.addBooking(this.booking).subscribe(
      res => {
        this.toast.setMessage('Book Issued.', 'success');
      },
      error => console.log(error)
    );
  }
}
