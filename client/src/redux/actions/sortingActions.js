import { STOP_SORTING, DOWN_SORTING, UP_SORTING } from "../types"

export const sortingAction = {
  up: () => ({ type: UP_SORTING }),
  down: () => ({ type: DOWN_SORTING }),
  stop: () => ({ type: STOP_SORTING }),
};