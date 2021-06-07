import { ADD_IN_FAVORITE, REMOVE_FROM_FAVORITE, GET_FAVORITES, HIDE_ERROR, SHOW_FAVORITES_BOARD, HIDE_FAVORITES_BOARD  } from '../types';
import { localStorageHandler } from '../../utils/localStorageHandler';

export const favoriteActions = {
  addInFavorite: (payload) => {
    localStorageHandler.addInFavorites(payload)
    return {
      type: ADD_IN_FAVORITE, payload
    }
  },
  removeFromFavorite: (payload) => {
    localStorageHandler.removeFromFavoritesById(payload)
    return { type: REMOVE_FROM_FAVORITE, payload };
  },
  getAllFavorites: () => {
    const payload = localStorageHandler.getAllFavorites();
    return { type: GET_FAVORITES, payload }
  },
  hideError: () => ({ type: HIDE_ERROR }),
  setShowBoard: () => ({ type: SHOW_FAVORITES_BOARD }),
  setHideBoard: () => ({ type: HIDE_FAVORITES_BOARD }),

};

