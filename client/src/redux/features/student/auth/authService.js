import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API_URL = `${BACKEND_URL}/student/`

const signup =async (userData) => {
    const response  = await axios.post(API_URL + "signup" ,  userData)
    return response.data
} 

const signin = async (userData) => {
    const response = await axios.post(API_URL + "signin" , userData)
    return response.data
}

const signout = async( ) => {
    const response = await axios.post(API_URL + "signout")
    return response.data
}
const updateProfileDetail = async(userData) => {
    const response = await axios.put(API_URL + "updateProfileDetail" , userData)
    return response.data
}

const getUserData = async() => {
    const response = await axios.get(API_URL + "getUserData" )
    return response.data
}


const authService = {
    signin,
    signup,
    signout,
    updateProfileDetail,
    getUserData,
}

export default authService