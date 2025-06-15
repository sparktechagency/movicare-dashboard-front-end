import { api } from "../api/baseApi";

const notificationSlice = api.injectEndpoints({
    endpoints: (builder) => ({    
            getAllNotification: builder.query({
                query: ({page , limit}) => {  
                    const params = new URLSearchParams(); 
                    if (page) {
                        params.set("page", page);
                    } 
                    if (limit) {
                        params.set("limit", limit);
                    }
                  return {
                    url: `/notification?${params.toString()}`,
                  };
                },
            })
    }) 
}) 

export const {useGetAllNotificationQuery} = notificationSlice