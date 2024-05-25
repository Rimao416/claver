import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../configs/config";
API.defaults.withCredentials = true;

export const getAllProjects = createAsyncThunk(
  "projet/getAllProjects",
  async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get("/api/v1/projets");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);

export const addProject = createAsyncThunk(
  "projet/addProject",
  async (data) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.post("/api/v1/projets", data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);
export const updateProject = createAsyncThunk(
  "projet/updateProject",
  async (data) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.put(`/api/v1/projets/${data._id}`, data);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);
const projetSlice = createSlice({
  name: "projet",
  initialState: {
    projets: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.projets = action.payload.projets;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projets = [...state.projets, action.payload.data];
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default projetSlice.reducer;
