import {
  GET_MORE_ITEMS,
} from '../types';

export const boardAction = {
  paginationNext: (payload) => ({ type: GET_MORE_ITEMS, payload }),

};