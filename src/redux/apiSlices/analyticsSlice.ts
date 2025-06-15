import { api } from "../api/baseApi";

const analyticsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserAnalytics: builder.query({
      query: (year) => {
        const params = new URLSearchParams();
        if (year) {
          params.set("earningsYear", year);
        }
        return {
          url: `/overview/user-earnings?${params.toString()}`,
        };
      },
      transformResponse: (response: any) => response.data
    })
  })
})

export const { useGetUserAnalyticsQuery } = analyticsSlice