import { START_SEARCHING, STOP_SEARCHING } from "../types"

export const searchActions = {
  setStart: () => ({ type: START_SEARCHING }),
  setStop: () => ({ type: STOP_SEARCHING }),
};