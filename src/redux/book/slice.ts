import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IBook } from '../../models/book';
import {IInitialState, IValue, Status} from './types'


export const fetchBooks = createAsyncThunk<IBook[], IValue>('books/fetchBooksStatus',
    async(value) => {
     const {title, subject, order } = value
        try {
          const {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${subject === 'All' ? '' : subject}+intitle:${title}&maxResults=30&orderBy=${order}&key=AIzaSyAFr7KolEZ2_w1f9ba8mPcGHxpgCfQIwkg`)
          return data.items
        } catch(e) {
          return console.log(e)
        }
    }
)

export const fetchMoreBooks = createAsyncThunk('books/fetchMoreBooksStatus',
    async(paginate: number) => {
        try {
          const { data } = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=startIndex=${paginate}&maxResults=30`,
          );
         return data.items
        } catch(e) {
          return console.log(e)
        }
    }
)


const initialState: IInitialState = {
    items: [],
    status: Status.EMPTY,
}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
      addBooks(state, action) {
        state.items = state.items.concat(action.payload)
      },
    },

     extraReducers: (builder) => {
      builder.addCase(fetchBooks.pending, (state: IInitialState) => {
        state.status = Status.LOADING
      })

      builder.addCase(fetchBooks.fulfilled, (state: IInitialState, action: PayloadAction<IBook[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS
      })

      builder.addCase(fetchMoreBooks.fulfilled, (state: IInitialState, action: PayloadAction<IBook[]>) => {
        state.items.push(...action.payload)
      })
    }
  });

export const {addBooks} = bookSlice.actions

export default bookSlice.reducer;
