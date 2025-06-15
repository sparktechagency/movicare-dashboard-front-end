import { api } from "../api/baseApi";

const transactionSlice = api.injectEndpoints({
    endpoints: (builder) => ({

        getAllTransaction: builder.query({
            query: ({ search, page }) => {
                const params = new URLSearchParams();
                if (search) {
                    params.set("searchTerm", search);
                }
                if (page) {
                    params.set("page", page);
                }
                return {
                    url: `/booking/transactions?${params.toString()}`,
                };
            },
        }),

    })
})

export const { useGetAllTransactionQuery } = transactionSlice