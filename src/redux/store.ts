import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import book from '../redux/book/slice'


export const store = configureStore({
    reducer: {
      book,
    },
  });
  
  
  export type RootState = ReturnType<typeof store.getState>;
  
  export type AppDispatch = typeof store.dispatch
  export const useAppDispatch: () => AppDispatch = useDispatch