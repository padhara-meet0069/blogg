import { CATEGORY_ERROR, CATEGORY_LOADING, CATEGORY_SUCCESS } from "../Commen/Constents";

export const CategoryReducer = (state = { category: [], CATEGORY_LOADING: false, error: "" }, action) => {
    switch (action.type) {
        case CATEGORY_LOADING:
            return { ...state, CATEGORY_LOADING: true };
        case CATEGORY_SUCCESS:
            return { CATEGORY_LOADING: false, category: action.payload, error:"" }
        case CATEGORY_ERROR:
            return { ...state, CATEGORY_LOADING: false, error: action.payload }
        default:
            return state
    }
}