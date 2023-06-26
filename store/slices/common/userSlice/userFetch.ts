import { createAsyncThunk } from "@reduxjs/toolkit"
import * as SecureStore from 'expo-secure-store';
import { IUser } from "../../../../types";
import axios from "axios";
const config = require("../../../../config.json")


export const fetchAuthorization = createAsyncThunk(
    'auth/fetchAuthorization',
    async (arg: {login: string, password: string}): Promise<any> => {
        const {login, password} = arg
        const data: any = await axios.post(config.server_domain+"/api/authorization", {login, password}, {}).then((res)=>res.data)
        return data
    }
)

export const fetchAuthentication = createAsyncThunk(
    'auth/fetchAuthentication',
    async (): Promise<any> => {
        const token = await SecureStore.getItemAsync('access_token');
        
        if (!token){return null}

        const data: {data: IUser} = await axios.post(config.server_domain+"/api/auth/authentication", null, {"headers": {Authorization: "Bearer "+ token}}).then((res)=>res.data)
            
        return {"user": data.data, "access_token": token}
    }
)