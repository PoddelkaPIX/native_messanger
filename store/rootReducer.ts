import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/common/authSlice/authSlice";
import { userQuery } from "./slices/common/userSlice/userQuery";


export const rootReducer = combineReducers({
    auth: authSlice,
    [userQuery.reducerPath]: userQuery.reducer,
})