import { configureStore } from "@reduxjs/toolkit";
//import { setupListeners } from "@reduxjs/toolkit/query";
//import { userApi } from "./apis/userApi";
import { removeUser, userReducer } from "./slices/userSlice";
import { fieldsReducer } from "./slices/fieldSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        fields: fieldsReducer
        //[userApi.reducerPath]: userApi.reducer 
    }
    /*middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(userApi.middleware);
    }*/
});

//setupListeners(store.dispatch);

export { store };
export * from "./thunks/addField";
export * from "./thunks/fetchUser";
export * from "./thunks/registerUser";
export * from "./thunks/updateUser";
export * from "./thunks/fetchFields";

export { removeUser };
//export { resetFields };
//export { useFetchUserMutation } from "./apis/userApi";