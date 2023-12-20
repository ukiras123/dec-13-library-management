import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import authReducer from "./auth/authSlice"
import bookReducer from "./book/bookSlice"

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)


export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        book: bookReducer
    }
})