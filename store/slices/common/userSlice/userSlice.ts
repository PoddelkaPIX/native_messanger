import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../../../types'
import { fetchAuthentication } from './userFetch';
import * as SecureStore from 'expo-secure-store';

interface IAuthState {
  is_authorized: boolean
  user: IUser | null;
  token: string | null
}

const initialState: IAuthState = {
  is_authorized: false,
  user: null,
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    log_in: (state, action)=>{
      state.user = action.payload.user
      state.is_authorized = true
      if (state.user != null){
        state.token = action.payload.token_type+" "+action.payload.access_token
      }
      SecureStore.setItemAsync('access_token', action.payload.token_type+" "+action.payload.access_token);
    },
    log_out: (state, action)=>{
      state.user = null
      state.is_authorized = false
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthentication.fulfilled, (state, action)=>{
        let payload = action.payload
        if (payload){
          state.user = payload.user
          state.is_authorized = true
          if (state.user != null){
            state.token = action.payload.access_token
          }
        }
    })
  },
})

export const {log_in, log_out} = authSlice.actions
export default authSlice.reducer