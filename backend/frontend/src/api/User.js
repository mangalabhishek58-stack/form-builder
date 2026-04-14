import axios from "axios";

// const BACKEND_ORIGIN_URL = 'http://localhost:4005/user'
const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_BACKEND_URL}/user`

const Login = async (email , password) =>{
    try {
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/login` , {email , password})
        return response
    } catch (error) {
        return error.response ;
    }
}

const Register = async (userName , email  , password) =>{
    try {
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/register` , {userName , email , password})
        return response
    } catch (error) {
        return error.response ;
    }
}

const updateUser = async (userName , email  , oldPassword , newPassword) =>{
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put(`${BACKEND_ORIGIN_URL}/updateuser` , {userName , email , oldPassword , newPassword} , config)
        return response
    } catch (error) {
        return error.response ;
    }
}

const UserData = async () =>{
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(`${BACKEND_ORIGIN_URL}/getuser` , config)
        return response
    } catch (error) {
        return error.response
    }
}

export {Login , Register , updateUser , UserData}