import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./Useslice";
export const store = configureStore({
    reducer: {
        admin: adminReducer,
    }
})