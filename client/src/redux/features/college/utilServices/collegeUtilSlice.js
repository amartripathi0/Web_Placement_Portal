import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import collegeService from "./collegeUtilService";


export const getCollegeStaffData = createAsyncThunk(
    "util/getCollegeStaffData",
    async(_ , thunkAPI) => {
        try {
            const response = await collegeService.getCollegeStaffData()
            // console.log(response);
            return response
        } catch (error) {
            console.log(error);
        }
    }
)

export const collegeStaffProfileUpdate = createAsyncThunk(
    "util/collegeStaffProfileUpdate",
    async(data , thunkAPI) => {
        try {
            // console.log("data" , data);
            const response = await collegeService.collegeStaffProfileUpdate(data)
            // console.log(response);
            return response
        } catch (error) {
            console.log(error);
        }
    }
)

export const uploadProfilePicture = createAsyncThunk(
    "util/uploadProfilePicture" , 
    async( data , thunkAPI) => {
        try {
            const response = await collegeService.uploadProfilePicture(data)
            return response;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getStudentDetails = createAsyncThunk(
    "util/getStudentDetails" , 
    async( apiParam , thunkAPI) => {
        try {
            const response = await collegeService.getStudentDetails(apiParam)
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
)

export const updateStudentDetails = createAsyncThunk(
    "util/updateStudentDetails" , 
    async( studentData , thunkAPI) => {
        try {
            const response = await collegeService.updateStudentDetails(studentData)
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
)

const initialState = {
  collegeStaff: null,
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isProfilePhotoUploaded : false ,
  student: null,
  students : []
};

const collegeUtilSlice = createSlice({
    name : "collegeStaffUtil",
    initialState,

    reducers : {
        RESET_COLLEGE_UTIL(state){
           state.isLoading = false
           state.isError =  false
           state.isSuccess =  false
           state.message = ""
           state.collegeStaff = null
           state.isProfilePhotoUploaded =  false

        }
    },

    extraReducers : (builder) => {
        builder
        .addCase(getCollegeStaffData.pending , (state , action) => {
            state.isLoading = true
        })
        .addCase(getCollegeStaffData.fulfilled , (state , action) => {
            state.isLoading = false 
            state.isSuccess =  true
            state.isLoggedIn = true
            // console.log("getCollegeStaffData fulfilled " , action.payload);
            state.collegeStaff = action.payload.message

        })
        .addCase(getCollegeStaffData.rejected , (state , action) => {
            state.isLoading = false 
            state.isSuccess =  true
            state.isLoggedIn = false

            // console.log("getCollegeStaffData rejected " , action.payload);

            state.collegeStaff = action.payload
        })

        
        builder.addCase(collegeStaffProfileUpdate.pending , (state,action) => {
            state.isLoading = true
        })
        builder.addCase(collegeStaffProfileUpdate.fulfilled , (state,action) => {
            state.isLoading = false
            state.isSuccess= true
            state.message= action.payload.message

        })
        builder.addCase(collegeStaffProfileUpdate.rejected , (state,action) => {

            state.isProfilePhotoUploaded = false
            state.isLoading = false
            // state.isSuccess= false
            state.message= action.payload
        })
        builder.addCase(uploadProfilePicture.pending , (state,action) => {
            state.isLoading = true
        })
        builder.addCase(uploadProfilePicture.fulfilled , (state,action) => {
            state.isLoading = false
            state.isSuccess= true
            state.message= action.payload.message
            state.isProfilePhotoUploaded = true

        })
        builder.addCase(uploadProfilePicture.rejected , (state,action) => {

            state.isProfilePhotoUploaded = false
            state.isLoading = false
            state.isSuccess= false
            state.message= action.payload
        })

        builder.addCase(getStudentDetails.pending , (state,action) => {
            state.isLoading = true
        })
        builder.addCase(getStudentDetails.fulfilled , (state,action) => {
            state.isLoading = false
            state.isSuccess= true
            console.log("getStudentDetails fullfilled" , action.payload);
            state.student= action.payload.message

        })
        builder.addCase(getStudentDetails.rejected , (state,action) => {
            state.isLoading = false
            state.isSuccess= false
            state.message= action.payload
        })

        builder.addCase(updateStudentDetails.pending , (state,action) => {
            state.isLoading = true
        })
        builder.addCase(updateStudentDetails.fulfilled , (state,action) => {
            state.isLoading = false
            state.isSuccess= true
            // console.log("updateStudentDetails fullfilled" , action.payload);
            // state.message= action.payload
            toast.success(action.payload.message )
 
        })
        builder.addCase(updateStudentDetails.rejected , (state,action) => {
            state.isLoading = false
            state.isSuccess= false
            state.message= action.payload
        })
    }
})

export const  {RESET_COLLEGE_UTIL} = collegeUtilSlice.actions

export default collegeUtilSlice.reducer