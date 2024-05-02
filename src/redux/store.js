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
import drawerSlice from "./services/drawer/drawerSlice";
import themeSlice from "./services/theme/themeSlice";

const persistConfig = {
  key: ["auth", "theme"],
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const persistedThemeReducer = persistReducer(persistConfig, themeSlice);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    drawer: drawerSlice,
    theme: persistedThemeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
