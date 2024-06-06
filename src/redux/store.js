import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import authSlice from "./services/auth/authSlice";
import cashRegisterSlice from "./services/cashRegister/cashRegisterSlice";
import drawerSlice from "./services/drawer/drawerSlice";
import paginationSlice from "./services/pagination/paginationSlice";
import productSlice from "./services/product/productSlice";
import themeSlice from "./services/theme/themeSlice";
import pettyCashSlice from "./services/pettycash/pettyCashSlice";

const persistConfig = {
  key: ["auth", "theme"],
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const persistedThemeReducer = persistReducer(persistConfig, themeSlice);

const persistemPaginationReducer = persistReducer(
  persistConfig,
  paginationSlice
);

const persistedCashRegister = persistReducer(persistConfig, cashRegisterSlice);
const persistePettyCash = persistReducer(persistConfig, pettyCashSlice);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    theme: persistedThemeReducer,
    pagination: persistemPaginationReducer,
    cashRegister: persistedCashRegister,
    pettyCash: persistePettyCash,
    drawer: drawerSlice,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
