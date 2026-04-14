import axios from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_BACKEND_URL}/formdata`

const CreateData = async (formId , Data ) =>{
    try {
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/create` , {formId , Data} )
        return response
    } catch (error) {
        return error.response ;
    }
}

const updateData = async (formDataId , formId , Data) =>{
    try {
        const response = await axios.put(`${BACKEND_ORIGIN_URL}/update/${formDataId}` , {formId , Data} )
        return response
    } catch (error) {
        return error.response
    }
}
const formsDataByFormId = async (id) =>{
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(`${BACKEND_ORIGIN_URL}/get/${id}` , config)
        return response
    } catch (error) {
        return error.response
    }
}

export{CreateData , updateData , formsDataByFormId}