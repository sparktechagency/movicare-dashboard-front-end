import { api } from "../api/baseApi"

const whyChooseSlice = api.injectEndpoints({
    endpoints: (builder) => ({      

        getWhyChoose: builder.query({
            query: () => { 
              return {
                url: "/facility",
              };
            }, 
          }) , 

          createWhyChoose: builder.mutation({
            query: (value) => ({
              url: "/facility",
              method: "POST",
              body: value,
            }),
          }), 

          updateWhyChoose: builder.mutation({
            query: ({id , value}) => {
              return {
                url: `/facility/${id}`,
                method: "PATCH",
                body: value,
              };
            },
          }),

          deleteWhyChoose: builder.mutation({
            query: (id) => ({
              url: `/facility/${id}`,
              method: "DELETE",
            }),
          }), 

    }) 
}) 

export const {useCreateWhyChooseMutation , useGetWhyChooseQuery , useUpdateWhyChooseMutation , useDeleteWhyChooseMutation } = whyChooseSlice