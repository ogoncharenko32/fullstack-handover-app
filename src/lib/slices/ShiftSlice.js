import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3030",
  // baseURL: "http://138.201.159.116/api",
});

export const fetchShifts = createAsyncThunk(
  "shifts/fetchShifts",
  async (selectedDay) => {
    const timezoneOffset = new Date().getTimezoneOffset();
    const request = await axiosInstance.get(`/browse/shift`, {
      params: {
        date: selectedDay,
        timezone_offset: timezoneOffset,
      },
    });
    const responce = request.data;
    return responce;
  }
);

export const createShift = createAsyncThunk(
  "shifts/createShift",
  async (name) => {
    const request = await axiosInstance.post(`/browse/shift`, {
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
