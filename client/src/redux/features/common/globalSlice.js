import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getLoginStatus = createAsyncThunk(
  "getLoginStatus",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(BACKEND_URL);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
        // console.log("message" , message);
    return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoggedin: false,
  userType: "",
  isLoading: false,
  isSuccess : false,
  message : ""

};
export const globalSlice = createSlice({
  name: "globalAuth",
  initialState,
  reducers: {
    RESET_GLOBAL(state) {
      state.userType = "";
      state.isLoading = false;
      state.isLoggedin = false;
      state.isSuccess = false;
    },
    SET_GLOBAL(state , action) {
      // console.log("set" , action);
      state.userType = action.payload?.message;
      state.isLoading = false;
      state.isLoggedin = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginStatus.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoggedin = true;
        state.isLoading = false;
        state.isSuccess = true;
        state.userType = action.payload?.message;
        
        // console.log(action.payload);
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoggedin = false;
        state.isLoading = false;
        state.isSuccess = true;
        // console.log("globalAuthReject" , action.payload);
        toast.error(`${action.payload}`, {
          position : toast.POSITION.TOP_CENTER
        })
      });
  },
});

export const {RESET_GLOBAL , SET_GLOBAL} = globalSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default globalSlice.reducer;
