import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFromLocalStorage } from "../../utils/local-stroage";

 
const token  = getFromLocalStorage("accessToken")

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://31.97.171.35:5001/api/v1" ,
        // baseUrl: "http://192.168.10.195:5000/api" 
        headers: {
            Authorization: `Bearer ${token}`,
          }
    }),
    endpoints: () => ({})
});

// export const imageUrl = "http://206.189.231.81:5000";
export const imageUrl = "http://31.97.171.35:5001/";
