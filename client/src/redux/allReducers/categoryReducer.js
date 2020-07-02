import { 
    SET_CATEGORY_IT, 
    CATEGORY_SELECTED, 
    SET_CATEGORY_DESIGN, 
    SET_CATEGORY_TEXT, 
    SET_CATEGORY_SEO, 
    SET_CATEGORY_SOCIAL, 
    SET_CATEGORY_AUDIOVIDEO, 
    SET_CATEGORY_BUSINESS,
    SET_CATEGORY_LAST_CHANGED, 
} from "../types"

const initialState = {
    categorySelected: false,
    categoryChecked: null,
    categoryLastChanged: null,
    category: {
        kworkHref: "/api/parse/kwork",
        freelance_ruHref: "/api/parse/freelance_ru"
    }
}

export default function category (state = initialState, action){
    if(action.type === CATEGORY_SELECTED){
        return {
            ...state,
            categorySelected: true
        }
    }else if(action.type === SET_CATEGORY_LAST_CHANGED){
        return {
            ...state,
            categoryLastChanged: state.categoryChecked,
        }
    }else if(action.type === SET_CATEGORY_IT){
        return {
            ...state,
            categoryChecked: "it",
            category: {
                kworkHref: "/api/parse/kwork?c=11",
                freelance_ruHref: "/api/parse/freelance_ru?spec=116"
            }
        }
    }else if(action.type === SET_CATEGORY_DESIGN){
        return {
            ...state,
            categoryChecked: "design",
            category: {
                kworkHref: "/api/parse/kwork?c=15",
                freelance_ruHref: "/api/parse/freelance_ru?spec=40"
            }
        }
    }else if(action.type === SET_CATEGORY_TEXT){
        return {
            ...state,
            categoryChecked: "text",
            category: {
                kworkHref: "/api/parse/kwork?c=5",
                freelance_ruHref: "/api/parse/freelance_ru?spec=124"
            }
        }
    }else if(action.type === SET_CATEGORY_SEO){
        return {
            ...state,
            categoryChecked: "seo",
            category: {
                kworkHref: "/api/parse/kwork?c=17",
                freelance_ruHref: "/api/parse/freelance_ru?spec=673"
            }
        }
    }else if(action.type === SET_CATEGORY_SOCIAL){
        return {
            ...state,
            categoryChecked: "social",
            category: {
                kworkHref: "/api/parse/kwork?c=45",
                freelance_ruHref: "/api/parse/freelance_ru?spec=673"
            }
        }
    }else if(action.type === SET_CATEGORY_AUDIOVIDEO){
        return {
            ...state,
            categoryChecked: "audiovideo",
            category: {
                kworkHref: "/api/parse/kwork?c=7",
                freelance_ruHref: "/api/parse/freelance_ru?spec=89"
            }
        }
    }else if(action.type === SET_CATEGORY_BUSINESS){
        return {
            ...state,
            categoryChecked: "business",
            category: {
                kworkHref: "/api/parse/kwork?c=83",
                freelance_ruHref: "/api/parse/freelance_ru?spec=663"
            }
        }         
    }else{
        return state
    }
}