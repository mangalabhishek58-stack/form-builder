import axios from "axios";

const BACKEND_ORIGIN_URL = `/folder`

const CreateFolder = async (folderName ) =>{
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/create` , {folderName } , config)
        return response
    } catch (error) {
        return error.response ;
    }
}

const foldersData = async () =>{
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(`${BACKEND_ORIGIN_URL}/find` , config)
        return response
    } catch (error) {
        return error.response
    }
}
const foldersDataById = async (id) =>{
    try {
        const response = await axios.get(`${BACKEND_ORIGIN_URL}/get/${id}`)
        return response
    } catch (error) {
        return error.response
    }
}

const deleteFolderById = async (id) =>{
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

export{CreateFolder , foldersData , foldersDataById , deleteFolderById}