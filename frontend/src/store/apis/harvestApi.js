import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const harvestApi = createApi({
    reducerPath: "harvests",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/harvest"
    }),
    endpoints(builder) {
        return {
            addHarvest: builder.mutation({
                query: (harvest) => {
                    return {
                        url: "/add",
                        method: "POST",
                        body: harvest
                    };
                }
            }),
            fetchHarvests: builder.query({
                query: (field) => {
                    return {
                        url: "fetch-field-harvest",
                        method: "POST",
                        body: field
                    };
                }
            }),
            removeHarvest: builder.mutation({
                query: (harvest) => {
                    return {
                        url: `/delete/${harvest.id}`,
                        method: "DELETE"
                    };
                }
            })
        }
    }
});

export const { useFetchHarvestsQuery, useAddHarvestMutation, useRemoveHarvestMutation } = harvestApi;
export { harvestApi };