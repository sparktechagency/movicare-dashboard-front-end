import { api } from "../api/baseApi"

const faqSlice = api.injectEndpoints({
    endpoints: (builder) => ({   
        getFaq:builder.query({
            query:()=>{ 
              return{
                url:`/faq`} 
            }
          }) , 

        addFaq:builder.mutation({
        query:(value)=>({
          url:"/faq" ,
          method:"POST" ,
          body:value
        })
        }) , 

        updateFaq:builder.mutation({
          query:(data)=>{  
            return{
              url:`/faq/${data?.id}` ,
              method:"PUT" ,
              body:data
            }
          }
        }) , 

        deleteFaq:builder.mutation({
          query:(id)=>({
            url:`/faq/${id}` ,
            method:"DELETE"
          })
        }) , 
    }) 
})

export const {useAddFaqMutation , useGetFaqQuery , useUpdateFaqMutation , useDeleteFaqMutation  } = faqSlice