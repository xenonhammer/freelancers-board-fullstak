import { SET_DATA, DELET_SOME_DATA } from '../types';

const initialState = {
  data: {},
};

export default function mainData(state = initialState, action) {
  if (action.type === SET_DATA) {
    return { ...state, data: action.payload};
  } else if (action.type === DELET_SOME_DATA) {
    return { ...state, data: Object.values(state.data).filter(elem => elem.website !== action.payload) };
  } else {
    return state;
  }
}