import { DELET_SOME_DATA, SET_DATA } from '../types';

export const mainDataAction = {
  setData: (payload) => ({ type: SET_DATA, payload: payload }),
  removeFromData: (payload) => ({ type: DELET_SOME_DATA, payload: payload }),
};