import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fractionApi = createApi({
    reducerPath: "fraction",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/fraction",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Guideness"],
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
                },
                providesTags: (result, error, neighborhoodId) => [{type: "Guideness", id: neighborhoodId}]
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
                            area: parameters.area,
                            productName: parameters.productName
                        }                           
                    };
                },
                invalidatesTags: (result, error, parameters) => [{type: "Guideness", id: parameters.neighborhoodId}]
            }),
            getFraction: builder.query({
                query: ({ neighborhoodId, productId }) => {
                    return {
                        url: "/get-fraction",
                        method: "GET",
                        params: {
                            neighborhoodId,
                            productId
                        }
                    };
                }
            })
        };
    }
})

export const { useFetchGuidenessQuery, useUpdateFractionsMutation, useGetFractionQuery } = fractionApi;
export { fractionApi };