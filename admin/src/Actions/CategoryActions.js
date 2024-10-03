import apiHelper from "../Commen/ApiHelper"
import { CATEGORY_INSERT, CATEGORY_LIST, CATEGORY_UPDATE, CATEGORY_ERROR, CATEGORY_LOADING, CATEGORY_SUCCESS } from "../Commen/Constents"

export const CategoryAction = (type,payload) => async(dispatch) => {
    try {
        if(type === CATEGORY_LIST ){
            dispatch({type:CATEGORY_LOADING})
            const {data} = await apiHelper.getCategory()
            dispatch({type:CATEGORY_SUCCESS, payload:data.data})
        }else if(type === CATEGORY_INSERT){
            dispatch({type:CATEGORY_LOADING})
            await apiHelper.addCategory(payload)
            const {data} = await apiHelper.getCategory()
            dispatch({type:CATEGORY_SUCCESS, payload:data.data})
        }else if(type === CATEGORY_UPDATE){
            dispatch({type:CATEGORY_LOADING})
            await apiHelper.updateCategory(payload)
            const {data} = await apiHelper.getCategory()
            dispatch({type:CATEGORY_SUCCESS, payload:data.data})
        }else{
            dispatch({type:CATEGORY_LOADING})
            await apiHelper.deleteCategory(payload)
            const {data} = await apiHelper.getCategory()
            dispatch({type:CATEGORY_SUCCESS, payload:data.data})
        }
    } catch (error) {
        dispatch({type:CATEGORY_ERROR, payload:error.message})
    }
}