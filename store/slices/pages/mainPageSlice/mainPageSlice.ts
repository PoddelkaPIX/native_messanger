import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChat } from '../../../../types'

interface IInitialState {
    is_loading: boolean
    chat_list: IChat[]
}

const initialState: IInitialState = {
    is_loading: true,
    chat_list: []
}

export const authSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
  },
})

export const {} = authSlice.actions
export default authSlice.reducer