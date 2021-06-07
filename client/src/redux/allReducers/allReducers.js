import { combineReducers } from 'redux';

import searchBoard    from './SearchBoardReducer';
import search         from './searchReducer';
import mainData     from './dataReducer';
import modalWindow    from './ModalWindowReducer';
import board           from './BordReducer';
import partners       from './partnersReducer';
import sorting        from './sortingReducer';
import favorite       from './favoriteReducer';
import loading        from './loading';
import switchData     from './switchDataReducer';
import category    from './categoryReducer';
import categoryBoard   from './categoryBoardReducer'
import warning    from './warningReducer'

export const RootState =  combineReducers({

  searchBoard,
  search,
  mainData,
  modalWindow,
  board,
  partners,
  sorting,
  favorite,
  loading,
  switchData,
  category,
  categoryBoard,
  warning,
  
})