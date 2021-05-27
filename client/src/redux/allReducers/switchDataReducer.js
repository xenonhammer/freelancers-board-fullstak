import {
  ENABLE_KWORK,
  DISABLE_KWORK,
  START_DOWNLOADING_KWORK,
  STOP_DOWNLOADING_KWORK,
  START_DOWNLOADING_FREELANCE_RU,
  STOP_DOWNLOADING_FREELANCE_RU,
  ENABLE_FREELANCE_RU,
  DISABLE_FREELANCE_RU,
} from '../types';

const initialState = {
  kwork: {
    enable: false,
    downloading: false,
  },
  freelanceRu: {
    enable: false,
    downloading: false,
  },

};

export default function switchData(state = initialState, action) {
  if (action.type === ENABLE_KWORK) {
    return { ...state, kwork: {...state.kwork, enable: true} };
  } else if (action.type === DISABLE_KWORK) {
    return { ...state, kwork: {...state.kwork, enable: false} };
  } else if (action.type === START_DOWNLOADING_KWORK) {
    return { ...state, kwork: {...state.kwork, downloading: true} };
  } else if (action.type === STOP_DOWNLOADING_KWORK) {
    return { ...state, kwork: {...state.kwork, downloading: false} };

  } else if (action.type === ENABLE_FREELANCE_RU) {
    return { ...state, freelanceRu: {...state.freelanceRu, enable: true} };
  } else if (action.type === DISABLE_FREELANCE_RU) {
    return { ...state, freelanceRu: {...state.freelanceRu, enable: false} };
  } else if (action.type === START_DOWNLOADING_FREELANCE_RU) {
    return { ...state, freelanceRu: {...state.freelanceRu, downloading: true} };
  } else if (action.type === STOP_DOWNLOADING_FREELANCE_RU) {
    return { ...state, freelanceRu: {...state.freelanceRu, downloading: false} };
  } else {
    return state;
  }
}