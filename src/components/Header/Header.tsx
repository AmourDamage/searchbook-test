import React from 'react';
import { Layout } from 'antd';
import BookForm from '../BookForm';

const { Header } = Layout;

const MainHeader = () => {
  return (
    <Header className="main__header">
      <h1 className="main__title">Search for books</h1>
      <BookForm></BookForm>
    </Header>
  );
};

export default MainHeader;
