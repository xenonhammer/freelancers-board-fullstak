import { SET_DATA, DELET_SOME_DATA } from '../types';

const initialState = {
  data: {},
};

export default function mainData(state = initialState, payload) {
  if (payload.type === SET_DATA) {
    return { ...state, data: payload.data};
  } else if (payload.type === DELET_SOME_DATA) {
    return { ...state, data: Object.values(state.data).filter(elem => elem.website !== payload) };
  } else {
    return state;
  }
}