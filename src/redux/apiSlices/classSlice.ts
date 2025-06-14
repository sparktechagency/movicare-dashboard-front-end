import { api } from "../api/baseApi";

const classSlice = api.injectEndpoints({
    endpoints: (builder) => ({    

         getAllProvider: builder.query({
            query: () => { 

              return {
                url: "/provider",
              };
            }, 
          }) ,  

          createProvider: builder.mutation({
            query: (value) => ({
              url: "/provider",
              method: "POST",
              body: value,
            }),
          }), 

          updateProvider: builder.mutation({
            query: ({id , value}) => {
              return {
                url: `/provider/${id}`,
                method: "PATCH",
                body: value,
              };
            },
          }),

          deleteProvider: builder.mutation({
            query: (id) => ({
              url: `/provider/${id}`,
              method: "DELETE",
            }),
          }), 

    }) 
})  

export const {useCreateProviderMutation , useUpdateProviderMutation , useDeleteProviderMutation , useGetAllProviderQuery} = classSlice