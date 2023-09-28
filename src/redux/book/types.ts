import { IBook, IBooks } from "../../models/book";

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
    EMPTY = 'empty'
}

export interface IQueryParams {
  title: string,
  subject: string,
  order: string,
  perPage?: number
  currentPage?: number
}

export interface IValue {
  values: IQueryParams;
  items: IBook[]
  status: string;
  totalItems: number
}



export interface IInitialState extends IBooks {
    status: string;
}


