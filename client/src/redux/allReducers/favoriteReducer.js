import {
  ADD_IN_FAVORITE,
  REMOVE_FROM_FAVORITE,
  GET_FAVORITES,
  HIDE_ERROR,
  SHOW_FAVORITES_BOARD,
  HIDE_FAVORITES_BOARD,
} from '../types';

const initialState = {
  favoriteData: [],
  countOfFavorites: 0,
  favoriteGetError: false,
  isShowFavoritesBoard: false
};

export default function favorite(state = initialState, action) {
  if (action.type === ADD_IN_FAVORITE) {
    return {
      ...state,
      favoriteData: [ ...state.favoriteData, action.payload],
      countOfFavorites: state.countOfFavorites + 1,
    }

  } else if (action.type === REMOVE_FROM_FAVORITE) {
    return {
      ...state,
      favoriteData: state.favoriteData.filter(el => el.id !== action.payload.id),
      countOfFavorites: state.countOfFavorites - 1,
    };

  } else if (action.type === GET_FAVORITES) {
    return {
      ...state,
      favoriteData: action.payload,
      countOfFavorites: action.payload.length,
    };
  }
  else if (action.type === SHOW_FAVORITES_BOARD){
    return {
      ...state,
      isShowFavoritesBoard: true
    }

  }else if(action.type === HIDE_FAVORITES_BOARD){
    return {
      ...state,
      isShowFavoritesBoard: false
    }
  }
  else if (action.type === HIDE_ERROR) {
    return { ...state, favoriteGetError: false };
  }
  else {
    return state;
  }

}