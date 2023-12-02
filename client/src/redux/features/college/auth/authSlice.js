import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import collegeAuthService from "./authService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialState = {
  isLoggedIn: false,
//   collegeStaff: null,
//   collegeStaffs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const collegeStaffSignUp = createAsyncThunk( "auth/collegeStaffSignUp" , 
async(userData , thunkAPI) => {
    try {
        const res = await collegeAuthService.signup(userData)
                // console.log(res);
                return res
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data.message)
    }
}
)

export const collegeStaffSignIn = createAsyncThunk( 
    "auth/collegeStaffSignIn",
    async(userData , thunkAPI) => {
        try{
            const response = await collegeAuthService.signin(userData)
             console.log(response);
            return response
        }
        catch(error){
            return thunkAPI.rejectWithValue(error?.response?.data.message)
        }
    }
)

export const collegeStaffSignOut = createAsyncThunk( 
    "auth/collegeStaffSignOut",
    async(_ , thunkAPI) => {
        try{
            const response = await collegeAuthService.signout()
             console.log(response);
            return response
        }
        catch(error){
            return thunkAPI.rejectWithValue(error?.response?.data.message)
        }
    }
)
const authSlice = createSlice({
    name : "collegeStaffAuth",
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
        .addCase(collegeStaffSignUp.pending , (state , action) => {
            state.isLoading = true;
        })
        .addCase(collegeStaffSignUp.fulfilled , (state , action) => {
            state.isLoggedIn = true;
            state.isSuccess = true;
            // console.log(action.payload);
            state.message = action.payload.message
            toast.success(action.payload.message , {
                position : toast.POSITION.TOP_RIGHT
            })
        })
        .addCase(collegeStaffSignUp.rejected , (state , action) => {
            state.isLoggedIn = false;
            state.isSuccess = true;
            // console.log(action.payload);
            state.message = action.payload
            toast.error(action.payload , {
                position : toast.POSITION.TOP_RIGHT
            })
        })
        .addCase(collegeStaffSignIn.pending , (state , action) => {
            state.isLoading = true;
        })
        .addCase(collegeStaffSignIn.fulfilled , (state , action) => {
            state.isLoggedIn = true;
            state.isSuccess = true;
            // console.log(action.payload);
            state.message = action.payload.message
            // toast.success(action.payload.message , {
            //     position : toast.POSITION.TOP_RIGHT
            // })
        })
        .addCase(collegeStaffSignIn.rejected , (state , action) => {
            state.isLoggedIn = false;
            state.isSuccess = true;
            // console.log(action.payload);
            state.message = action.payload
            toast.error(action.payload , {
                position : toast.POSITION.TOP_RIGHT
            })
        })
        .addCase(collegeStaffSignOut.pending , (state , action) => {
            state.isLoading = true;
        })
        .addCase(collegeStaffSignOut.fulfilled , (state , action) => {
            state.isLoggedIn = false;
            state.isSuccess = true;
            console.log(action.payload);
            state.message = action.payload.message
            // toast.success(action.payload.message , {
            //     position : toast.POSITION.TOP_RIGHT
            // })
        })
        .addCase(collegeStaffSignOut.rejected , (state , action) => {
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