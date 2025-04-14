"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./configureStore";

export default function StoreProvider({ children }) {
  const storeRef = useRef(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
