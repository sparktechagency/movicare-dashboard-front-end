import { api } from "../api/baseApi";

const servicesSlice = api.injectEndpoints({
    endpoints: (builder) => ({   

        getAllServices: builder.query({
            query: () => { 

              return {
                url: "/service",
              };
            }, 
          }) ,  

          createService: builder.mutation({
            query: (value) => ({
              url: "/service",
              method: "POST",
              body: value,
            }),
          }), 

          updateService: builder.mutation({
            query: ({id , value}) => {
              return {
                url: `/service/${id}`,
                method: "PATCH",
                body: value,
              };
            },
          }),

          deleteService: builder.mutation({
            query: (id) => ({
              url: `/service/${id}`,
              method: "DELETE",
            }),
          }),
    }) 
}) 

export const {useCreateServiceMutation , useGetAllServicesQuery , useUpdateServiceMutation , useDeleteServiceMutation} = servicesSlice