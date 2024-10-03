import { GALLARY_ERROR, GALLARY_LOADING, GALLARY_SUCCESS } from "../Commen/Constents";

export const GallaryReducer = (state = { gallery: [], loading: false, error: '' },action) => {
    switch (action.type) {
        case GALLARY_LOADING:
            return { loading: true, gallery:[] };
        case GALLARY_SUCCESS:
            return { loading: false, gallery: action.payload };
        case GALLARY_ERROR:
            return { loading: false, error: action.payload,gallery:[] };
        default:
            return state;
    }
}