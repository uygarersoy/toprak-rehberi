import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const productApi = createApi({
    reducerPath: "product",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/product",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints(builder) {
        return {
            fetchProducts: builder.query({
                query: (type) => {
                    return {
                        url: "/type",
                        method: "GET",
                        params: {
                            type: type
                        }
                    };
                }
            })
        };
    }
});

export const { useFetchProductsQuery } = productApi;
export { productApi };