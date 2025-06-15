import { api } from "../api/baseApi";

const reviewsSlice = api.injectEndpoints({
    endpoints: (builder) => ({   

        getAllReviews: builder.query({
            query: () => { 
              return {
                url: "/review",
              };
            }, 
          }) ,   

          deleteReview: builder.mutation({
            query: (id) => ({ 
              url: `/review/review/${id}` , 
              method: "DELETE" 
            }) 
          }) , 

          updateReview: builder.mutation({
            query: (id) => ({
              url: `/review/review/${id}` ,
              method: "PATCH" 
            })
          }),
    })
})

export const { useGetAllReviewsQuery , useDeleteReviewMutation , useUpdateReviewMutation} = reviewsSlice