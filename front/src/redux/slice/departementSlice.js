import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../configs/config";
API.defaults.withCredentials = true;

export const getAllDepartements = createAsyncThunk(
  "departement/getAllDepartements",
  async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get("/api/v1/departements");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);

export const addDepartement = createAsyncThunk(
  "departement/addDepartement",
  async (data) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.post("/api/v1/departements", data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);
export const updateDepartement = createAsyncThunk(
  "departement/updateDepartement",
  async (data) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.put(`/api/v1/departements/${data._id}`, data);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);
export const getSingleDepartement=createAsyncThunk(
  "departement/getSingleDepartement",
  async (id) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get(`/api/v1/departements/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);
export const deleteDepartement=createAsyncThunk(
  "departement/deleteDepartement",
  async (id) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.delete(`/api/v1/departements/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);
const departementSlice = createSlice({
  name: "departement",
  initialState: {
    departements: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDepartements.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDepartements.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.departements = action.payload;
      })
      .addCase(getAllDepartements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addDepartement.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDepartement.fulfilled, (state, action) => {
        state.loading = false;
        state.departements = [...state.departements, action.payload];
      })
      .addCase(addDepartement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDepartement.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDepartement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateDepartement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleDepartement.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleDepartement.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.departements =[action.payload];
      })
      .addCase(getSingleDepartement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }).addCase(deleteDepartement.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDepartement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDepartement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default departementSlice.reducer;
