import { api } from "../api/baseApi";

const bookingHistorySlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getBookingHistory: builder.query({
            query: ({ search, page, limit, status }) => {
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
                if (status) {
                    params.set("status", status);
                }
                return {
                    url: `/booking?${params.toString()}`,
                };
            },
        }),

        updateBookingStatus: builder.mutation({
            query: (data) => { 
                return {
                    url: `/booking/${data?.id}`,
                    method: "PATCH",
                    body: data
                }

            }
        }),
    })
})

export const { useGetBookingHistoryQuery, useUpdateBookingStatusMutation } = bookingHistorySlice