import { IBooks } from "../../models/book";

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
    EMPTY = 'empty'
}

export interface IInitialState extends IBooks {
    status: string;
}

export interface IValue {
  title: string;
  subject: string;
  order: string;
}
