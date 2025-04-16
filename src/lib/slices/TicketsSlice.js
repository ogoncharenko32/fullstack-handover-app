import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://138.201.159.116:3030",
});

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (id) => {
    const request = await axiosInstance.get(`/browse/shift/${id}`);
    const responce = request.data;
    return responce;
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async ({
    link,
    description,
    status,
    important,
    shift_id,
    user_id,
    user_name,
  }) => {
    const request = await axiosInstance.post(`/browse/ticket`, {
      link,
      description,
      status,
      important,
      shift_id,
      user_id,
      user_name,
    });
    const responce = request.data;
    return responce;
  }
);

export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async ({ link, description, status, important, ticket_id, shift_id }) => {
    const request = await axiosInstance.put(`/browse/ticket/${ticket_id}`, {
      link,
      description,
      status,
      important,
      shift_id,
    });
    const responce = request.data;
    return responce;
  }
);

export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async (ticket_id) => {
    const request = await axiosInstance.delete(`/browse/ticket/${ticket_id}`);
    const responce = request.data;
    return responce;
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload.data.ticket);
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((ticket) =>
          ticket.id === action.payload.data.ticket.id
            ? action.payload.data.ticket
            : ticket
        );
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (ticket) => ticket.id !== action.payload.data.ticket.id
        );
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ticketsSlice.reducer;
