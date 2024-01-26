import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API_URL = `${BACKEND_URL}/company/`


const signup = async(userSignupData) =>{
    const response = await axios.post(API_URL + "signup" , userSignupData)
    return response.data
}

const signin = async(userData) => {
    const response = await axios.post(API_URL + "signin" , userData)
    return response.data
}

const signout = async(userData) => {
    const response = await axios.post(API_URL + "signout")
    return response.data
}

const companyAuthService = {
    signin,
    signout,
    signup
}

export default companyAuthService;