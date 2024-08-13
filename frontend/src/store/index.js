import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { removeUser, userReducer } from "./slices/userSlice";
import { fieldsApi } from "./apis/fieldApi";
import { harvestApi } from "./apis/harvestApi";
import { locationApi } from "./apis/locationApi";

const store = configureStore({
    reducer: {
        user: userReducer,
        [fieldsApi.reducerPath]: fieldsApi.reducer,
        [harvestApi.reducerPath]: harvestApi.reducer,
        [locationApi.reducerPath]: locationApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(fieldsApi.middleware).concat(harvestApi.middleware).concat(locationApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store };
export * from "./thunks/fetchUser";
export * from "./thunks/registerUser";
export * from "./thunks/updateUser";
export { removeUser };
export { useAddFieldMutation, useFetchFieldsQuery, useRemoveFieldMutation } from "./apis/fieldApi";
export { useFetchHarvestsQuery, useAddHarvestMutation, useRemoveHarvestMutation } from "./apis/harvestApi";
export { useFetchProvincesQuery, useFetchDistrictsQuery, useFetchNeighborhoodsQuery } from "./apis/locationApi";