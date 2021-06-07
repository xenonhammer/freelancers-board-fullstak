import {
  IS_LOADING, IS_NOT_LOADING,
} from '../types';

export const loadingActions = {
  enable: () => ({ type: IS_LOADING }),
  disable: () => ({ type: IS_NOT_LOADING }),

};