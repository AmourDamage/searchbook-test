import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IBooks } from '../../models/book';
import {IQueryParams, IValue, Status} from './types'

export const fetchBooks = createAsyncThunk<IBooks, IQueryParams>('books/fetchBooksStatus',
    async(values) => {
     const {title, subject, order, currentPage = 1, perPage = 30 } = values
        try {
          const {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${subject === 'All' ? '' : subject}+intitle:${title}&maxResults=${perPage}&startIndex=${currentPage}&orderBy=${order}&key=AIzaSyAFr7KolEZ2_w1f9ba8mPcGHxpgCfQIwkg`)
          return data
        } catch(e) {
          return console.log(e)
        }
    }
)

const initialState: IValue = {
  items: [],
  status: Status.EMPTY,
  totalItems: 0,
  values: {
    title: '',
    subject: '',
    order: 'relevance',
    perPage: 30,
    currentPage: 1,
  },
}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
      switchPage(state, action) {
        state.values.currentPage = action.payload
      },
      getValues(state, action) {
        state.values = {...state.values, ...action.payload}
      },
      resetTitleValue(state) {
        state.values.title = ''
      }
    },
     extraReducers: (builder) => {
      builder.addCase(fetchBooks.pending, (state: IValue) => {
        state.status = Status.LOADING
      })

      builder.addCase(fetchBooks.fulfilled, (state: IValue, action: PayloadAction<IBooks>) => {
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems
        state.status = Status.SUCCESS
      })
    }
  });

export const { switchPage, getValues, resetTitleValue} = bookSlice.actions

export default bookSlice.reducer;
