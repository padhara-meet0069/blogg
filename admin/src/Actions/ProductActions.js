import apiHelper from "../Commen/ApiHelper"
import { PRODUCT_ERROR, PRODUCT_INSERT, PRODUCT_LIST, PRODUCT_LOADING, PRODUCT_SUCCESS, PRODUCT_UPDATE } from "../Commen/Constents"

export const ProductAction = (type, payload) => async(dispatch) => {
    try {
        
        if(type === PRODUCT_LIST){
            dispatch({type:PRODUCT_LOADING})
            const {data} = await apiHelper.getProduct()
            dispatch({type:PRODUCT_SUCCESS, payload:data.data})
        }else if(type === PRODUCT_UPDATE){
            dispatch({type:PRODUCT_LOADING})
            await apiHelper.updateProduct(payload)
            const {data} = await apiHelper.getProduct()
            dispatch({type:PRODUCT_SUCCESS, payload:data.data})
        }else if(type === PRODUCT_INSERT){
            dispatch({type:PRODUCT_LOADING})
            await apiHelper.insertProduct(payload)
            const {data} = await apiHelper.getProduct()
            dispatch({type:PRODUCT_SUCCESS, payload:data.data})
        }else{
            dispatch({type:PRODUCT_LOADING})
            await apiHelper.deleteProduct(payload)
            const {data} = await apiHelper.getProduct()
            dispatch({type:PRODUCT_SUCCESS, payload:data.data})
        }
    } catch (error) {
        dispatch({type:PRODUCT_ERROR, payload:error.messsage})
    }
}