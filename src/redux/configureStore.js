import { configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import shiftsReducer from "@/lib/slices/ShiftSlice";
import storageEngine from "./storage";

const shiftsConfig = {
  key: "shifts",
  storage,
  // whitelist: ["selectedShift"],
};

export const store = configureStore({
  reducer: {
    shifts: persistReducer(shiftsConfig, shiftsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
