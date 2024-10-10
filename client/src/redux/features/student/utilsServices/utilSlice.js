import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import utilService from './utilService'


const initialState = {
    isLoggedIn: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    data : "",
    message: "",
  };

export const uploadProfilePicture = createAsyncThunk(
    "util/uploadProfilePicture" , 
    async( data , thunkAPI) => {
        try {
            const response = await utilService.uploadProfilePicture(data)
            return response;
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
)
export const uploadResume = createAsyncThunk(
    "util/uploadResume" , 
    async( data , thunkAPI) => {
        try {
            const response = await utilService.uploadResume(data)
            return response;
        } catch (error) {
            // console.log(error);
        }
    }
)

export const getJobs = createAsyncThunk(
    "util/getJobs" , 
    async( _ , thunkAPI) => {
        try {
            const response = await utilService.getJobs()
            return response;
        } catch (error) {
            // console.log(error);
        }
    }
)
export const jobApplyByStudent = createAsyncThunk(
    "util/jobApplyByStudent" , 
    async( data , thunkAPI) => {
        try {
            const response = await utilService.jobApplyByStudent(data)
            return response;
        } catch (error) {
            // console.log(error);
        }
    }
)

const utilSlice = createSlice({
    name : "studentUtil",
    initialState,
    reducers : {
    RESET_UTILS(state){
        state.isError= false
        state.isSuccess= false
        state.isLoading= false
        state.data= ""
        state.message= ""
   },
},
   extraReducers : builder => {
        builder.addCase(uploadProfilePicture.pending , (state,action) => {
            state.isLoading = true
        })
        builder.addCase(uploadProfilePicture.fulfilled , (state,action) => {
            // console.log(action);
            state.isLoading = false
            state.isSuccess= true
            state.message= action.payload
        })
        builder.addCase(uploadProfilePicture.rejected , (state,action) => {


            state.isLoading = false
            state.isSuccess= false
            state.message= action.payload
        })

        builder.addCase(uploadResume.pending , (state,action) => {
            state.isLoading = true
        })
        builder.addCase(uploadResume.fulfilled , (state,action) => {
            state.isLoading = false
            state.isSuccess= true
            state.message= action.payload.message
        })
        builder.addCase(uploadResume.rejected , (state,action) => {


            state.isLoading = false
            state.isSuccess= false
            state.message= action.payload.message
        })
        builder.addCase(getJobs.pending , (state,action) => {
            state.isLoading = true
        })
        builder.addCase(getJobs.fulfilled , (state,action) => {
            state.isLoading = false
            state.isSuccess= true
            state.data= action.payload.message
        })
        builder.addCase(getJobs.rejected , (state,action) => {


            state.isLoading = false
            state.isSuccess= false
            state.message= action.payload.message
        })
        builder.addCase(jobApplyByStudent.pending , (state,action) => {
            state.isLoading = true
        })
        builder.addCase(jobApplyByStudent.fulfilled , (state,action) => {
            state.isLoading = false
            state.isSuccess= true
            state.message= action.payload?.message
        })
        builder.addCase(jobApplyByStudent.rejected , (state,action) => {
            state.isLoading = false
            state.isSuccess= false
            // console.log( action.payload.response.data.message);
            state.message= action.payload.response.data.message
        })
   }


})

export const {RESET_UTILS} = utilSlice.actions

export default utilSlice.reducer
