import { FC } from 'react';
import { IBook, IBooks } from '../../models/book';
import Book from '../Book/Book';

const BookList: FC<IBooks> = ({ items }: IBooks) => {
  return (
    <>
      {items.map((book: IBook, index) => {
        return (
          <Book
            id={book.id}
            key={index}
            title={book.volumeInfo.title}
            image={book.volumeInfo.imageLinks?.thumbnail}
            categories={book.volumeInfo.categories}
            authors={book.volumeInfo.authors}></Book>
        );
      })}
    </>
  );
};
export default BookList;
