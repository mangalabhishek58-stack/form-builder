import axios from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_BACKEND_URL}/form`

const createForm = async (formName , formTheme , folderId , formTemplate , inputNumbers) =>{
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/create` , {formName , formTheme , folderId , formTemplate , inputNumbers } , config)
        return response
    } catch (error) {
        return error.response ;
    }
}

const updateForm = async (formId , formName , formTheme , folderId , formTemplate , inputNumbers) =>{
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put(`${BACKEND_ORIGIN_URL}/update/${formId}` , {formName , formTheme , folderId , formTemplate , inputNumbers } , config)
        return response
    } catch (error) {
        return error.response ;
    }
}
const updateView = async (formId , view) =>{
    try {
        const response = await axios.put(`${BACKEND_ORIGIN_URL}/updateview/${formId}`, {view} )
        return response
    } catch (error) {
        return error.response ;
    }
}

const getForm = async (folderId) =>{
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/find` , {folderId} , config )
        return response
    } catch (error) {
        return error.response
    }
}
const getFormById = async (id) =>{
    try {
        const response = await axios.get(`${BACKEND_ORIGIN_URL}/get/${id}`)
        return response
    } catch (error) {
        return error.response
    }
}

const deleteForm = async (id) =>{
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.delete(`${BACKEND_ORIGIN_URL}/delete/${id}` , config)
        return response
    } catch (error) {
        return error.response
    }
}

export{createForm , updateForm , getForm , getFormById , deleteForm , updateView}