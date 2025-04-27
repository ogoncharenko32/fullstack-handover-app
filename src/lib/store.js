import { configureStore } from "@reduxjs/toolkit";
import shiftsReducer from "./slices/ShiftSlice";
import ticketsReducer from "./slices/TicketsSlice";
import maintenancesReducer from "./slices/MaintenanceSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      shifts: shiftsReducer,
      tickets: ticketsReducer,
      maintenances: maintenancesReducer,
    },
  });
};
