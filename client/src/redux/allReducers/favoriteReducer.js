import { ADD_IN_FAVORITE, DEL_FROM_FAVORITE, GET_FAVORITES, FAVORITE_CLEAR_ERROR } from "../types"

const initialState = {
    favoriteData: {},
    countOfFavorites: 0,
    favoriteGetError: false
}

export default function favorite ( state = initialState, action){
    if(action.type === ADD_IN_FAVORITE){

        for(let key in state.favoriteData){
            if(state.favoriteData[key].id === action.data.id){
                return state
            }
        }
        
        localStorage.setItem(action.data.id, JSON.stringify(action.data))
        let newState = {...state}
        newState.favoriteData[action.data.id] = action.data

        newState.countOfFavorites = Object.keys(newState.favoriteData).length

        return newState
    
    }else if(action.type === DEL_FROM_FAVORITE){
        
        
        localStorage.removeItem(action.data.id)
        let newState = {...state}
        delete newState.favoriteData[action.data.id]

        newState.countOfFavorites = Object.keys(newState.favoriteData).length

        return  newState 

    }else if(action.type === GET_FAVORITES){
        try {
            let newState = {...state}
        
            Object.keys(localStorage).map(elem => {
                newState.countOfFavorites++
                newState.favoriteData[JSON.parse(elem)] = JSON.parse(localStorage.getItem(elem))
                return newState
            })
            return {newState, favoriteGetError: false}
        } catch (error) {
            return {...state, favoriteGetError: true}
        }
    }else if(action.type === FAVORITE_CLEAR_ERROR){
        return {...state, favoriteGetError: false}
    }else{
        return state
    }

}