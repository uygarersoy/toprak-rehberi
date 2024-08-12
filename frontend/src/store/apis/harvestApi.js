import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const harvestApi = createApi({
    reducerPath: "harvests",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/harvest"
    }),
    tagTypes: ["Harvest"],
    endpoints(builder) {
        return {
            addHarvest: builder.mutation({
                query: (harvest) => {
                    return {
                        url: "/add",
                        method: "POST",
                        body: harvest
                    };
                },
                invalidatesTags: (result, error, harvest) => [
                    {type: "Harvest", id: harvest.field_id}
                ]
            }),
            fetchHarvests: builder.query({
                query: (field) => {
                    return {
                        url: "fetch-field-harvest",
                        method: "POST",
                        body: field
                    };
                },
                providesTags: (result, error, field) => [
                    {type: "Harvest", id: field.id}
                ]
            }),
            removeHarvest: builder.mutation({
                query: (harvest) => {
                    return {
                        url: `/delete/${harvest.id}`,
                        method: "DELETE"
                    };
                },
                invalidatesTags: (result, error, harvest) => [
                    {type: "Harvest", id: harvest.field_id}
                ]
            })
        }
    }
});

export const { useFetchHarvestsQuery, useAddHarvestMutation, useRemoveHarvestMutation } = harvestApi;
export { harvestApi };