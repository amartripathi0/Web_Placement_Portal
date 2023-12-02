import {configureStore} from '@reduxjs/toolkit'
import studentAuthReducer from './features/student/auth/authSlice'
import globalAuthReducer from './features/common/globalSlice'
import studentUtilReducer from './features/student/utilsServices/utilSlice'
import collegeAuthReducer from './features/college/auth/authSlice'
import collegeStaffUtilReducer from './features/college/utilServices/collegeUtilSlice'

export const store = configureStore({
    reducer : {
        studentAuth  : studentAuthReducer ,
        globalAuth : globalAuthReducer,
        studentUtils : studentUtilReducer,

        collegeStaffAuth : collegeAuthReducer,
        collegeStaffUtil : collegeStaffUtilReducer
    }
})