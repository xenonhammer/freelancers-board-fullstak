import {
  CLOSE_WARNING_CATEGORY, CLOSE_WARNING_NOTIFICATION, CLOSE_WARNING_RELOAD_DATA,
  CLOSE_WARNING_TOP_MENU, OPEN_WARNING_NOTIFICATION,
  OPEN_WARNING_RELOAD_DATA,
  OPEN_WARNING_TOP_MENU, SET_WARNING_NOTIFICATION,
} from '../types';

export const warningAction = {
  closeCategory: () => ({ type: CLOSE_WARNING_CATEGORY }),
  closeTopMenu: () => ({ type: CLOSE_WARNING_TOP_MENU }),
  openTopMenu: () => ({ type: OPEN_WARNING_TOP_MENU }),
  closeReloadData: () => ({ type: CLOSE_WARNING_RELOAD_DATA }),
  openReloadData: () => ({ type: OPEN_WARNING_RELOAD_DATA }),
  closeNotification: () => ({ type: OPEN_WARNING_NOTIFICATION }),
  openNotification: () => ({ type: CLOSE_WARNING_NOTIFICATION }),
  setNotification: (payload) => ({ type: SET_WARNING_NOTIFICATION, payload: payload }),

};