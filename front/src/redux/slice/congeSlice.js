import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../configs/config";
API.defaults.withCredentials = true;

// get my conge
export const getMyConge = createAsyncThunk("conge/getMyConge", async () => {
  try {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await API.get("/api/v1/conges/me");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Une erreur est survenue");
    throw error;
  }
});

// create conge
export const createConge = createAsyncThunk(
  "conge/createConge",
  async (data) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.post("/api/v1/conges", data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);

// update conge
export const updateConge = createAsyncThunk(
  "conge/updateConge",
  async (data) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.patch(`/api/v1/conges/${data._id}`, data);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);

// delete conge
export const deleteConge = createAsyncThunk("conge/deleteConge", async (id) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await API.delete(`/api/v1/conges/${id}`);
    return id;
  } catch (error) {
    toast.error(error.response.data.message || "Une erreur est survenue");
    throw error;
  }
});

// get All Conge
export const getAllConge = createAsyncThunk("conge/getAllConge", async () => {
  try {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await API.get("/api/v1/conges");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Une erreur est survenue");
    throw error;
  }
});

const congeSlice = createSlice({
  name: "conge",
  initialState: {
    conges: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyConge.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyConge.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.conges = action.payload.data.conges;
      })
      .addCase(getMyConge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createConge.pending, (state) => {
        state.loading = true;
      })
      .addCase(createConge.fulfilled, (state, action) => {
        state.loading = false;
        state.conges = [...state.conges, action.payload.data.conges];
      })
      .addCase(createConge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateConge.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateConge.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateConge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteConge.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteConge.fulfilled, (state, action) => {
        state.loading = false;
        state.conges = state.conges.filter(
          (conge) => conge._id !== action.payload
        );
      })
      .addCase(deleteConge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllConge.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllConge.fulfilled, (state, action) => {
        state.loading = false;
        state.conges = action.payload.data.conges;
      })
      .addCase(getAllConge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default congeSlice.reducer;
