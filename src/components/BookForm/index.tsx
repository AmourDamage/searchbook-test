import React, { useCallback, useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { fetchBooks, getValues, switchPage } from '../../redux/book/slice';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import classes from '../BookForm/bookForm.module.css';
import Input from 'antd/es/input/Input';
import { booksState } from '../../redux/book/selectors';
import { IQueryParams } from '../../redux/book/types';

const BookForm: React.FC = () => {
  const [value, setValue] = useState<IQueryParams>({
    title: '',
    subject: '',
    order: 'relevance',
  });
  const dispatch = useDispatch<AppDispatch>();
  const { values } = useSelector(booksState);

  const onFinish = useCallback(() => {
    dispatch(getValues(value));
    dispatch(fetchBooks(value));
    dispatch(switchPage(1));
  }, [dispatch, value]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onFinish();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [onFinish, value]);

  return (
    <Form className={classes.form} onFinish={onFinish} name="basic" autoComplete="off">
      <div className="main__search-wrap">
        <Form.Item name="search">
          <Input
            value={values.title}
            onChange={(e) => setValue({ ...value, title: e.target.value })}
            className={classes.search}
            placeholder="Введите название книги"
          />
        </Form.Item>

        <div className="main__search-selects">
          <Form.Item>
            <label className="main__labels">Categories</label>
            <Select
              defaultValue="All"
              style={{ width: 110 }}
              onChange={(newValue) => setValue({ ...value, subject: newValue })}
              options={[
                { value: 'Art', label: 'Art' },
                { value: 'Biography', label: 'Biography' },
                { value: 'History', label: 'History' },
                { value: 'Computers', label: 'Computers' },
                { value: 'All', label: 'All' },
                { value: 'Medical', label: 'Medical' },
                { value: 'Poetry', label: 'Poetry' },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <label className="main__labels">Sorting by</label>
            <Select
              defaultValue="relevance"
              style={{ width: 110 }}
              onChange={(newValue) => setValue({ ...value, order: newValue })}
              options={[
                { value: 'relevance', label: 'relevance' },
                { value: 'newest', label: 'newest' },
              ]}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default BookForm;
