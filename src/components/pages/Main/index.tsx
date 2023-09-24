import { Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useSelector } from 'react-redux';

import { booksState } from '../../../redux/book/selectors';
import BookList from '../../BookList';

const Main = () => {
  const { items, status } = useSelector(booksState);

  if (status === 'empty') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        <h2>Используйте поиск, для того чтобы найти книгу</h2>
      </div>
    );
  } else if (!items) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <h1>Таких книг нет</h1>
      </div>
    );
  }

  return (
    <div className="main__head-wrapper">
      <p className="main__content-p">Found {items?.length > 0 ? items?.length : 0} results</p>
      <Content className="main__wrapper">
        {status === 'loading' ? (
          <div className="main__head-wrapper">
            <Spin />
          </div>
        ) : (
          <div className="main__books-wrap">
            <BookList items={items}></BookList>
          </div>
        )}
      </Content>
    </div>
  );
};

export default Main;
