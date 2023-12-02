import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import utilService from './utilService'


const initialState = {
    isLoggedIn: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };

export const uploadProfilePicture = createAsyncThunk(
    "util/uploadProfilePicture" , 
    async( data , thunkAPI) => {
        try {
            const response = await utilService.uploadProfilePicture(data)
            return response;
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
        state.message= ""
   },
},
   extraReducers : builder => {
        builder.addCase(uploadProfilePicture.pending , (state,action) => {
            state.isLoading = true
        })
        builder.addCase(uploadProfilePicture.fulfilled , (state,action) => {
            console.log(action);
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
   }


})

export const {RESET_UTILS} = utilSlice.actions

export default utilSlice.reducer