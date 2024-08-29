import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fieldsApi = createApi({
    reducerPath: "fields",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/field",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Field"],
    endpoints(builder) {
        return {
            addField: builder.mutation({
                query: (field) => {
                    return {
                        url: "/add",
                        method: "POST",
                        body: field
                    };
                },
                invalidatesTags: ["Field"]
            }),
            fetchFields: builder.query({
                query: (user) => {
                    return {
                        url: "/fetch-user-fields",
                        method: "POST",
                        body: user
                    };
                },
                providesTags: ["Field"]
            }),
            removeField: builder.mutation({
                query: (fieldId) => {
                    return {
                        url: `/${fieldId}`,
                        method: "DELETE"
                    };
                },
                invalidatesTags: ["Field"]
            })
        };
    }
});


export const { useAddFieldMutation, useFetchFieldsQuery, useRemoveFieldMutation } = fieldsApi;
export { fieldsApi };