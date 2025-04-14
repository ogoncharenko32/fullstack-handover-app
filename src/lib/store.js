import { configureStore } from "@reduxjs/toolkit";
import shiftsReducer from "./slices/ShiftSlice";
import ticketsReducer from "./slices/TicketsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      shifts: shiftsReducer,
      tickets: ticketsReducer,
    },
  });
};
