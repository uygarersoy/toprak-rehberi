import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fractionApi = createApi({
    reducerPath: "fraction",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/fraction"
    }),
    endpoints(builder) {
        return {
            fetchGuideness: builder.query({
                query: (neighborhoodId) => {
                    return {
                        url: "/guide",
                        method: "GET",
                        params: {
                            neighborhoodId: neighborhoodId
                        }
                    };
                }
            }),
            updateFractions: builder.mutation({
                query: (parameters) => {
                    return {
                        url: "/update",
                        method: "PUT",
                        params: {
                            neighborhoodId: parameters.neighborhoodId,
                            productId: parameters.productId,
                            satisfaction: parameters.satisfaction,
                            area: parameters.area
                        }                           
                    };
                }
            })
        };
    }
})

export const { useFetchGuidenessQuery, useUpdateFractionsMutation } = fractionApi;
export { fractionApi };