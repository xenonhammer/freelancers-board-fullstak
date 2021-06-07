import { GET_MORE_ITEMS, SET_START_COUNT_ITEM } from '../types';

const initialState = { 
  countOfItemsShow: 10
}

export default function board(state = initialState, action){

  if(action.type === GET_MORE_ITEMS){
    const dataLength = Object.keys(action.payload).length;
    return {...state,
      countOfItemsShow: (()=> Math.min(state.countOfItemsShow + 5, dataLength ? dataLength : 10))() }
  }else if(action.type === SET_START_COUNT_ITEM){
    return {...state,
    countOfItemsShow: 15}
  }else{
    return state
  }
    
}