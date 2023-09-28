import { useDispatch, useSelector } from 'react-redux';
import { booksState } from '../../redux/book/selectors';
import { fetchBooks, switchPage } from '../../redux/book/slice';
import { AppDispatch } from '../../redux/store';
import { createPages } from '../../utils/createPages';

const Pagination = () => {
  const { values, totalItems } = useSelector(booksState);
  const { currentPage, perPage } = values;
  const dispatch = useDispatch<AppDispatch>();

  const pagesCount = Math.ceil(totalItems / perPage!);
  const pages: number[] = [];

  createPages(pages, pagesCount, currentPage!);

  const handleAddBooks = (page: number) => {
    dispatch(switchPage(page));
    dispatch(fetchBooks({ ...values, currentPage: page }));
  };

  return (
    <div className="pages">
      {pages.map((page: number) => (
        <span
          onClick={() => handleAddBooks(page)}
          key={page}
          className={values.currentPage === page ? 'current-page' : 'page'}>
          {page}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
