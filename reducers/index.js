import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter'
import styleReducer from "./style";
import authReducer from "./auth";

export default configureStore({
    reducer: {
        counter: counterReducer,
        style: styleReducer,
        auth: authReducer,
    }
})