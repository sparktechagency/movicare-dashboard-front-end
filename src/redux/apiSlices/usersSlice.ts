import { api } from "../api/baseApi";

const usersSlice = api.injectEndpoints({
    endpoints: (builder) => ({   

        getAllUser: builder.query({
        query: () => {
          return {
            url: "/user",
          };
        },
        transformResponse: (response: any) => response.data 
        }) , 


     }) 
})  

export const {useGetAllUserQuery} = usersSlice
