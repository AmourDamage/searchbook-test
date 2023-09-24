import React, { useCallback, useEffect, useState } from 'react';

import { Button, Form, Select } from 'antd';
import { fetchBooks, fetchMoreBooks } from '../../redux/book/slice';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import classes from '../BookForm/bookForm.module.css';

import Input from 'antd/es/input/Input';

const BookForm: React.FC = () => {
  const [value, setValue] = useState({
    title: '',
    subject: '',
    order: 'relevance',
  });
  const [limit, setLimit] = useState(60);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (newValue: string, field: string) => {
    setValue({ ...value, [field]: newValue });
  };

  const onFinish = useCallback(() => {
    dispatch(fetchBooks(value));
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
  }, [onFinish]);

  function handleAddBooks(limit: number) {
    setLimit(limit + 30);
    dispatch(fetchMoreBooks(limit));
  }

  return (
    <Form
      className={classes.form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off">
      <div className="main__search-wrap">
        <Form.Item name="search">
          <Input
            value={value.title}
            onChange={(e) => handleChange(e.target.value, 'title')}
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
              onChange={(newValue) => handleChange(newValue, 'subject')}
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
              onChange={(newValue) => handleChange(newValue, 'order')}
              options={[
                { value: 'relevance', label: 'relevance' },
                { value: 'newest', label: 'newest' },
              ]}
            />
          </Form.Item>
        </div>
        <Button onClick={() => handleAddBooks(limit)}>add books</Button>
      </div>
    </Form>
  );
};

export default BookForm;
