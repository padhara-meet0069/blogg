import { PRODUCT_ERROR, PRODUCT_LOADING, PRODUCT_SUCCESS } from "../Commen/Constents";

export const ProductReducer = (state = { loading: false, error: "", products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LOADING:
            return { ...state, loading: true };
        case PRODUCT_SUCCESS:
            return { ...state,loading:false, products: action.payload }
        case PRODUCT_ERROR:
            return { ...state, error: action.payload, loading:false }
        default:
            return state
    }
}