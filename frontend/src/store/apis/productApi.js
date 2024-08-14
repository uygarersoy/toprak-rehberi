import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const productApi = createApi({
    reducerPath: "product",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/product"
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