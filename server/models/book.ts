import * as mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  publisher: String
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
