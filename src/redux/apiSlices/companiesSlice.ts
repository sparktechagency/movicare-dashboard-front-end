import { api } from "../api/baseApi";

const companiesSlice = api.injectEndpoints({
    endpoints: (builder) => ({  
 
        getCompanies: builder.query({  
            query: (page) => {  
                const params = new URLSearchParams(); 
                if (page) {
                    params.append("page", page);
                }
              return {
                url: `/client?${params.toString()}`,
              };
            },  
          }) , 
           
          deleteCompany: builder.mutation({ 
            query: (id) => ({ 
              url: `/client/${id}` , 
              method: "DELETE" 
            }) 
          }) , 

          createCompanies: builder.mutation({ 
            query: (value) => ({ 
              url: "/client" , 
              method: "POST" , 
              body: value 
            }) 
          }) ,
    }) 
})  

export const {useCreateCompaniesMutation , useGetCompaniesQuery , useDeleteCompanyMutation } = companiesSlice