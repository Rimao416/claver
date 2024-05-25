import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../configs/config";
API.defaults.withCredentials = true;

export const getAllPostes = createAsyncThunk(
  "poste/getAllPostes",
  async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get("/api/v1/postes");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);

export const addPoste = createAsyncThunk(
  "poste/addPoste",
  async (data) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.post("/api/v1/postes", data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);
export const updatePoste = createAsyncThunk(
  "poste/updatePoste",
  async (data) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.put(`/api/v1/postes/${data._id}`, data);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);
export const getSinglePoste=createAsyncThunk(
  "poste/getSinglePoste",
  async (id) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get(`/api/v1/postes/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);
export const deletePoste=createAsyncThunk(
  "poste/deletePoste",
  async (id) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("profile"));
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.delete(`/api/v1/postes/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || "Une erreur est survenue");
      throw error;
    }
  }
);
const posteSlice = createSlice({
  name: "poste",
  initialState: {
    postes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPostes.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.postes = action.payload;
      })
      .addCase(getAllPostes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPoste.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPoste.fulfilled, (state, action) => {
        state.loading = false;
        state.postes = [...state.postes, action.payload];
      })
      .addCase(addPoste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePoste.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePoste.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePoste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSinglePoste.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSinglePoste.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.postes =[action.payload];
      })
      .addCase(getSinglePoste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }).addCase(deletePoste.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePoste.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePoste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default posteSlice.reducer;
