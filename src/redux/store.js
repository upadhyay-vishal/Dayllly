import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/slices/CounterSlice';
import checkoutReducer from '../redux/slices/CheckoutSlice';
import productReducer from '../redux/slices/ProductSlice'; // ✅ Added productSlice
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const persistConfig = {
    key: 'persist-store',
    storage,
};

const rootReducer = combineReducers({
    counter: counterReducer,
    checkout: checkoutReducer,
    product: productReducer, // ✅ Added productReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
