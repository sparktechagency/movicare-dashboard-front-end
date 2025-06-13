import { api } from "../api/baseApi";

const analyticsSlice = api.injectEndpoints({
    endpoints: (builder) => ({  
  getUserAnalytics: builder.query({
    query: () => {
      return {
        url: "/overview/user-earnings",
      };
    }, 
    transformResponse: (response: any) => response.data
  })
     }) 
}) 

export const {useGetUserAnalyticsQuery} = analyticsSlice