import { api } from "../api/baseApi";

const usersSlice = api.injectEndpoints({
    endpoints: (builder) => ({   

        getAllUser: builder.query({
        query: ({ search, page , limit }) => { 
          const params = new URLSearchParams(); 
          if (search) {
            params.set("searchTerm", search);
          } 
          if (page) {
            params.set("page", page);
          } 
          if (limit) {
            params.set("limit", limit);
          }
          return {
            url: `/user?${params.toString()}`,
          };
        },
        transformResponse: (response: any) => response 
        }) , 


     }) 
})  

export const {useGetAllUserQuery} = usersSlice
