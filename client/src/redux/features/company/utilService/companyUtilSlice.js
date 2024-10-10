import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import companyService from "./companyUtilService";


export const getCompanyData = createAsyncThunk(
    "util/getCompanyData",
    async(_ , thunkAPI) => {
        try {
            const response = await companyService.getCompanyData()
            // console.log(response);
            return response
        } catch (error) {
            // console.log(error);
        }
    }
)

export const companyProfileUpdate = createAsyncThunk(
    "util/companyProfileUpdate",
    async(data , thunkAPI) => {
        try {
            // console.log("data" , data);
            const response = await companyService.companyProfileUpdate(data)
            // console.log(response);
            return response
        } catch (error) {
            // console.log(error);
        }
    }
)

export const uploadProfilePicture = createAsyncThunk(
    "util/uploadProfilePicture" , 
    async( data , thunkAPI) => {
        try {
            const response = await companyService.uploadProfilePicture(data)
            return response;
        } catch (error) {
            // console.log(error);
        }
    }
)

export const getStudentDetails = createAsyncThunk(
    "util/getStudentDetails" , 
    async( apiParam , thunkAPI) => {
        try {
            const response = await companyService.getStudentDetails(apiParam)
            // console.log(response);
            return response;
        } catch (error) {
            // console.log(error);
        }
    }
)


const initialState = {
  company: null,
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isProfilePhotoUploaded : false ,
  student: null,
  students : []
};

const companyUtilSlice = createSlice({
    name : "companyUtil",
    initialState,

    reducers : {
        RESET_COMPANY_UTIL(state){
           state.isLoading = false
           state.isError =  false
           state.isSuccess =  false
           state.message = ""
           state.company = null
           state.isProfilePhotoUploaded =  false

        }
    },

    extraReducers : (builder) => {
        builder
        .addCase(getCompanyData.pending , (state , action) => {
            state.isLoading = true
        })
        .addCase(getCompanyData.fulfilled , (state , action) => {
            state.isLoading = false 
            state.isSuccess =  true
            state.isLoggedIn = true
            // console.log("getCollegeStaffData fulfilled " , action.payload);
            state.company = action.payload.message

        })
        .addCase(getCompanyData.rejected , (state , action) => {
            state.isLoading = false 
            state.isSuccess =  true
            state.isLoggedIn = false

            // console.log("getCollegeStaffData rejected " , action.payload);

            state.company = action.payload
        })

        
        builder.addCase(companyProfileUpdate.pending , (state,action) => {
            state.isLoading = true
        })
        builder.addCase(companyProfileUpdate.fulfilled , (state,action) => {
            state.isLoading = false
            state.isSuccess= true
            // console.log("companyProfileUpdate" , action.payload.message);
            state.message= action.payload?.message

        })
        builder.addCase(companyProfileUpdate.rejected , (state,action) => {

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
            // console.log("getStudentDetails fullfilled" , action.payload);
            state.student= action.payload.message

        })
        builder.addCase(getStudentDetails.rejected , (state,action) => {
            state.isLoading = false
            state.isSuccess= false
            state.message= action.payload
        })

    }
})

export const  {RESET_COMPANY_UTIL} = companyUtilSlice.actions

export default companyUtilSlice.reducer
