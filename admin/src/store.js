import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"
import { CategoryReducer } from "./Reducers/CategoryReducer"
import { ProductReducer } from "./Reducers/ProductReducer"
import { GallaryReducer } from "./Reducers/GalleryReducer"





const reducers = combineReducers({
    Category:CategoryReducer,
    Product:ProductReducer,
    Gallery:GallaryReducer,
   

})

const store = createStore(reducers, compose(applyMiddleware(thunk)))

export default store