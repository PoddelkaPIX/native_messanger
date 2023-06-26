import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import * as SecureStore from 'expo-secure-store';
import { IUser } from '../../../../types';

const config = require("../../../../config.json")

export const userQuery = createApi({
    reducerPath: 'userQuery',
    baseQuery: fetchBaseQuery({ 
      baseUrl: config.server_domain+"/api",
      prepareHeaders: async (headers) => {
        const token = await SecureStore.getItemAsync('access_token')
        
        if (token){
            headers.set('Authorization', token)
        }
        
        return headers
      }, 
      }),
      endpoints: (builder) => ({
        searchByName: builder.query<{"data": IUser[]}, string>({
            query: (name="") => ({
                url: `/searchByName`,
                params: {
                    "name": name
                }
            })
        }),
        getUser: builder.query<IUser[], string>({
            query: (id="") => ({
                    url: `/users/`+id,
                }
            )
        }),
    }),
  })