import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from '../FullBook/FullBook.module.css';
import { Button } from 'antd';
import axios from 'axios';
import { IVolumeInfo } from '../../models/book';

const FullBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState<IVolumeInfo>({} as IVolumeInfo);

  useEffect(() => {
    async function fetchBook() {
      try {
        const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        setBook(data.volumeInfo);
      } catch (e) {
        console.log(e);
      }
    }
    fetchBook();
  }, [bookId]);

  return (
    <div>
      <Button onClick={() => navigate('/')} className={classes.button}>
        Вернуться ко всем книгам
      </Button>
      <div className={classes.wrapper}>
        <div className={classes.fullbook}>
          <img className={classes.img} alt={book.title} src={book.imageLinks?.thumbnail}></img>
          <h2 className={classes.title}>{book.title}</h2>
          <p className={classes.categories}>{book.categories}</p>
          <p className={classes.description}>{book.description}</p>
          <p className={classes.authors}>{` ${
            book.authors ? book.authors : 'Авторы не были найдены'
          }`}</p>
        </div>
      </div>
    </div>
  );
};

export default FullBook;
