import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fielsdApi = createApi({
    reducerPath: "fields",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/field"
    }),
    endpoints(builder) {
        return {
            addField: builder.mutation({
                query: (field) => {
                    return {
                        url: "/add",
                        method: "POST",
                        body: {field}
                    };
                }
            }),
            fetchAlbums: builder.query()
        }
    }
});