import { 
    CLOSE_WARNING_CATEGORY, 
    OPEN_WARNING_TOP_MENU, 
    CLOSE_WARNING_TOP_MENU, 
    OPEN_WARNING_RELOAD_DATA,
    CLOSE_WARNING_RELOAD_DATA,
    OPEN_WARNING_NOTIFICATION,
    CLOSE_WARNING_NOTIFICATION,
    SET_WARNING_NOTIFICATION
} from "../types"

const initialState = {
    stepInitial: 0,
    warningCategory: true,
    warningTopMenu: false,
    warningReloadData: false,
    warningNotification: false,
    warningNotificationText: null,
}

export default function warning(state = initialState, action){
    if(action.type === CLOSE_WARNING_CATEGORY){
        return {...state, warningCategory: false}

    }else if(action.type === OPEN_WARNING_TOP_MENU){
            return {...state, warningTopMenu: true, stepInitial: state.stepInitial+1}
    }else if(action.type === CLOSE_WARNING_TOP_MENU){
        return {...state, warningTopMenu: false,  stepInitial: state.stepInitial+1}

    }else if(action.type === OPEN_WARNING_RELOAD_DATA){
        return {...state, warningReloadData: true }
    }else if(action.type === CLOSE_WARNING_RELOAD_DATA){
        return {...state, warningReloadData: false }

    }else if(action.type === OPEN_WARNING_NOTIFICATION){
        return {...state, warningNotification: true }
    }else if(action.type === CLOSE_WARNING_NOTIFICATION){
        return {...state, warningNotification: false }
    }else if(action.type === SET_WARNING_NOTIFICATION){
        return {...state, warningNotificationText: action.data }
    }else{
        return state
    }
}