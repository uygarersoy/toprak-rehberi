import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const harvestApi = createApi({
    reducerPath: "harvests",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/harvest",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Harvest"],
    endpoints(builder) {
        return {
            addFeedBack: builder.mutation({
                query: (result) => {
                    return {
                        url: "/feedback",
                        method: "POST",
                        body: result
                    };
                }
            }),
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
                query: ({harvest, harvestedOrDeleted}) => {
                    return {
                        url: `/delete/${harvest.id}`,
                        method: "DELETE",
                        params: { harvestedOrDeleted }
                    };
                },
                invalidatesTags: (result, error, harvest) => [
                    {type: "Harvest", id: harvest.field_id}
                ]
            }),
        }
    }
});

export const { 
            useFetchHarvestsQuery,
            useAddHarvestMutation,
            useRemoveHarvestMutation,
            useAddFeedBackMutation,
            } = harvestApi;

export { harvestApi };