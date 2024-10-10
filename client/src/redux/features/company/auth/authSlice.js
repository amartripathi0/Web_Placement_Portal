import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import companyAuthService from "./authService";
import {toast } from 'react-toastify';

const initialState = {
    isLoggedIn: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  }

  export const companyStaffSignUp = createAsyncThunk( "auth/companyStaffSignUp" , 
async(userData , thunkAPI) => {
    try {
        const res = await companyAuthService.signup(userData)
                // console.log(res);
                return res
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data.message)
    }
}
)

export const companyStaffSignIn = createAsyncThunk( 
    "auth/companyStaffSignIn",
    async(userData , thunkAPI) => {
        try{
            const response = await companyAuthService.signin(userData)
            //  console.log(response);
            return response
        }
        catch(error){
            return thunkAPI.rejectWithValue(error?.response?.data.message)
        }
    }
)

export const companyStaffSignOut = createAsyncThunk( 
    "auth/companyStaffSignOut",
    async(_ , thunkAPI) => {
        try{
            const response = await companyAuthService.signout()
            //  console.log(response);
            return response
        }
        catch(error){
            return thunkAPI.rejectWithValue(error?.response?.data.message)
        }
    }
)
const authSlice = createSlice({
    name : "companyAuth",
    initialState,
    reducers : {
        RESET(state) {
           state.isLoading = false
           state.isError =  false
           state.isSuccess =  false
           state.message = ""
        } 
    },


    extraReducers : (builder) => {
        builder
        .addCase(companyStaffSignUp.pending , (state , action) => {
            state.isLoading = true;
        })
        .addCase(companyStaffSignUp.fulfilled , (state , action) => {
            state.isLoggedIn = true;
            state.isSuccess = true;
            // console.log(action.payload);
            state.message = action.payload.message
            toast.success(action.payload.message , {
                position : toast.POSITION.TOP_RIGHT
            })
        })
        .addCase(companyStaffSignUp.rejected , (state , action) => {
            state.isLoggedIn = false;
            state.isSuccess = true;
            // console.log(action.payload);
            state.message = action.payload
            toast.error(action.payload , {
                position : toast.POSITION.TOP_RIGHT
            })
        })
        .addCase(companyStaffSignIn.pending , (state , action) => {
            state.isLoading = true;
        })
        .addCase(companyStaffSignIn.fulfilled , (state , action) => {
            state.isLoggedIn = true;
            state.isSuccess = true;
            // console.log(action.payload);
            state.message = action.payload.message
            // toast.success(action.payload.message , {
            //     position : toast.POSITION.TOP_RIGHT
            // })
        })
        .addCase(companyStaffSignIn.rejected , (state , action) => {
            state.isLoggedIn = false;
            state.isSuccess = true;
            // console.log(action.payload);
            state.message = action.payload
            toast.error(action.payload , {
                position : toast.POSITION.TOP_RIGHT
            })
        })
        .addCase(companyStaffSignOut.pending , (state , action) => {
            state.isLoading = true;
        })
        .addCase(companyStaffSignOut.fulfilled , (state , action) => {
            state.isLoggedIn = false;
            state.isSuccess = true;
            // console.log(action.payload);
            state.message = action.payload.message
            // toast.success(action.payload.message , {
            //     position : toast.POSITION.TOP_RIGHT
            // })
        })
        .addCase(companyStaffSignOut.rejected , (state , action) => {
            state.isLoggedIn = false;
            state.isSuccess = true;
            // console.log(action.payload);
            state.message = action.payload
            toast.error(action.payload , {
                position : toast.POSITION.TOP_RIGHT
            })
        })
    }
})

export const {RESET} = authSlice.actions

export default authSlice.reducer
