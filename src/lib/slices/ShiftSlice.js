import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchShifts = createAsyncThunk(
  "shifts/fetchShifts",
  async (selectedDay) => {
    const request = await axios.get(`http://localhost:3030/browse/shift`, {
      params: {
        date: selectedDay,
      },
    });
    const responce = request.data;
    return responce;
  }
);

export const createShift = createAsyncThunk(
  "shifts/createShift",
  async (name) => {
    const request = await axios.post(`http://localhost:3030/browse/shift`, {
      name,
    });
    const responce = request.data;
    return responce;
  }
);

const shiftsSlice = createSlice({
  name: "shifts",
  initialState: {
    loading: false,
    error: null,
    data: [],
    selectedShift: 0,
    selectedDay: null,
  },
  reducers: {
    setSelectedShift: (state, action) => {
      state.selectedShift = action.payload;
    },
    setDay: (state, action) => {
      state.selectedDay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShifts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShifts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchShifts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createShift.pending, (state) => {
        state.loading = true;
      })
      .addCase(createShift.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload.data.shift);
      })
      .addCase(createShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedShift, setDay } = shiftsSlice.actions;

export default shiftsSlice.reducer;
