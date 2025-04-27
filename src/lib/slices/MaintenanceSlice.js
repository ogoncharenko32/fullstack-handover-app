import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3030",
  // baseURL: "http://138.201.159.116/api",
});

export const createMaintenance = createAsyncThunk(
  "maintenances/createMaintenance",
  async (name) => {
    const request = await axiosInstance.post(`/mw`, {
      name,
    });
    const responce = request.data;
    return responce;
  }
);

export const fetchMaintenaces = createAsyncThunk(
  "maintenances/fetchMaintenances",
  async () => {
    const request = await axiosInstance.get(`/mw`);
    const responce = request.data;
    return responce;
  }
);

export const fetchMaintenanceById = createAsyncThunk(
  "maintenances/fetchMaintenanceById",
  async (id) => {
    const request = await axiosInstance.get(`/mw/${id}`);
    const responce = request.data;
    return responce;
  }
);

export const updateMaintenance = createAsyncThunk(
  "maintenances/updateMaintenance",
  async (payload) => {
    const request = await axiosInstance.put(`/mw/${+payload.id}`, payload);
    const responce = request.data;
    return responce;
  }
);

const maintenancesSlice = createSlice({
  name: "maintenances",
  initialState: {
    loading: false,
    error: null,
    data: [],
    mwdata: {},
  },
  reducers: {
    clearMwdata: (state) => {
      state.mwdata = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createMaintenance.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMaintenance.fulfilled, (state, action) => {
        state.loading = false;
        state.mwdata = action.payload.data;
      })
      .addCase(createMaintenance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMaintenaces.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaintenaces.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchMaintenaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMaintenanceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaintenanceById.fulfilled, (state, action) => {
        state.loading = false;
        state.mwdata = action.payload.data;
      })
      .addCase(fetchMaintenanceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMaintenance.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMaintenance.fulfilled, (state, action) => {
        state.loading = false;
        state.mwdata = action.payload.data;
      })
      .addCase(updateMaintenance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearMwdata } = maintenancesSlice.actions;

export default maintenancesSlice.reducer;
