import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import realEstateReducer from './slices/realEstateSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        realEstate: realEstateReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;