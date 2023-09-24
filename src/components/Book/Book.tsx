import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { IVolumeInfo } from '../../models/book';
import classes from '../Book/book.module.css';

interface BookProps extends IVolumeInfo {
  id: string;
}

const Book: FC<BookProps> = ({ image, categories, title, authors, id }: BookProps) => {
  const navigate = useNavigate();
  return (
    <div className={classes.wrap} onClick={() => navigate(`/${id}`)}>
      <img className={classes.image} src={image} alt={title}></img>
      <p className={classes.category}>{categories}</p>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.author}>{authors ? ` ${authors}` : null}</p>
    </div>
  );
};

export default Book;
