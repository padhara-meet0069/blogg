import apiHelper from "../Commen/ApiHelper"
import { GALLARY_ERROR, GALLARY_INSERT, GALLARY_LIST, GALLARY_LOADING, GALLARY_SUCCESS } from "../Commen/Constents"

export const GalleryAction = (type, payload) => async(dispatch) => {
    try {
        if(type === GALLARY_LIST){
            dispatch({type:GALLARY_LOADING})
            const {data} = await apiHelper.listGallery()
            dispatch({type:GALLARY_SUCCESS,payload:data.data})
        }else if(type === GALLARY_INSERT){
            dispatch({type:GALLARY_LOADING})
            await apiHelper.uploadFile(payload)
            const {data} = await apiHelper.listGallery()
            dispatch({type:GALLARY_SUCCESS,payload:data.data})
        }else{
            dispatch({type:GALLARY_LOADING})
            await apiHelper.deleteFiles(payload)
            const {data} = await apiHelper.listGallery()
            dispatch({type:GALLARY_SUCCESS,payload:data.data})
        }
    } catch (error) {
        dispatch({type:GALLARY_ERROR,payload:error.message})
    }
}