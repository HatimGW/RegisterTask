import { applyMiddleware, legacy_createStore} from "redux";
import {thunk} from "redux-thunk"
import  rootReducer  from "./Combine"


export const Store = legacy_createStore(rootReducer,applyMiddleware(thunk))