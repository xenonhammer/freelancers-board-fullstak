import {SHOW_SEARCH_BOARD, HIDE_SEARCH_BOARD} from '../types'

export const searchBoardActions = {
  show: () => ({ type: SHOW_SEARCH_BOARD }),
  hide: () => ({ type: HIDE_SEARCH_BOARD }),
};