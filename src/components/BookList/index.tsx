import { FC } from 'react';
import { IBook, IBooks } from '../../models/book';
import Book from '../Book/Book';

type BookListProps = Omit<IBooks, 'totalItems'>;

const BookList: FC<BookListProps> = ({ items }: BookListProps) => {
  return (
    <>
      {items.map((book: IBook) => {
        return (
          <Book
            id={book.id}
            key={book.id}
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
