import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../configs/config";
API.defaults.withCredentials = true;

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await API.get("/api/v1/users");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Une erreur est survenue");
    throw error;
  }
});
export const addUser = createAsyncThunk("user/addUser", async (data) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await API.post("/api/v1/users/signup", data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Une erreur est survenue");
    throw error;
  }
});
export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await API.patch(`/api/v1/users/${data._id}`, data);
    return response.data.data;
  } catch (error) {
    toast.error(error.response.data.message || "Une erreur est survenue");
    throw error;
  }
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  console.log(id);
  try {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await API.delete(`/api/v1/users/${id}`);
    return id;
  } catch (error) {
    toast.error(error.response.data.message || "Une erreur est survenue");
    throw error;
  }
});
export const updateMe = createAsyncThunk("user/updateMe", async (data) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await API.patch(`/api/v1/users/updateMe`, data);
    return response.data.data;
  } catch (error) {
    toast.error(error.response.data.message || "Une erreur est survenue");
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, action.payload.data.user];
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMe.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMe.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default userSlice.reducer;
