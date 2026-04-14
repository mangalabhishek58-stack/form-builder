import React, { act, useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { UserData } from '../../api/User'
import { useNavigate } from 'react-router-dom'
import { HiMiniFolderPlus, } from 'react-icons/hi2'
import ConfirmAlert from '../../components/DashboardPage/ConfirmAlert'
import { GrAdd } from 'react-icons/gr'
import AddPrompt from '../../components/DashboardPage/AddPrompt'
import FormCard from '../../components/DashboardPage/FormCard'
import { CreateFolder, deleteFolderById, foldersData } from '../../api/Folder'
import deleteIcon from '../../assets/images/delete.png'
import { deleteForm , getForm } from '../../api/Form'

function Dashboard() {
    const [deleteIndex , setDeleteIndex] = useState(null)
    const [username , setUsername] = useState('Harshit')
    const [action , setActions] = useState('workspace')
    const [folders , addFolders] = useState([])
    const [forms , setForms] = useState([])
    const [foldersDeatils , setFoldersDetails] = useState([])
    const [selectedFolder , setSelectedFolder] = useState('')
    const [deleteFolderAlert , setDeleteFolderAlert] = useState(false)
    const [deleteFormAlert , setDeleteFormAlert] = useState(false)
    const [createFolderPrompt , setCreateFolderPrompt] = useState(false)

    const navigate = useNavigate()

    const closeDeleteFolderAlert = () => setDeleteFolderAlert(false)
    const closeDeleteFormAlert = () => setDeleteFormAlert(false)
    const closeCreateFolderPrompt = () => setCreateFolderPrompt(false)

    const confirmation = () => removeFolder(deleteIndex)
    const deleteFormConfirmation = () => removeForm(deleteIndex)


    const showDeleteAlert = (index) => {
        setDeleteIndex(index)
        setDeleteFormAlert(true)
    }

    const fetchForm = async (folderId) =>{
        // console.log(folderId)
        const response = await getForm(folderId)
        // console.log(response)
        if(response.status == 200){
            setForms(response.data.forms)
        }
    }

    const fetchUser = async () =>{
        const response = await UserData()
        if(response.status == 200){
            setUsername(response.data.user.userName)
            addFolders(response.data.user.folders)
            setSelectedFolder(response.data.user.folders[0])
            fetchForm(response.data.user.folders[0])
        }else if( response.status == 400 || response.status == 401){
            localStorage.clear()
            navigate('/')
        }
    }
    const fetchfolder = async () =>{
        const response = await foldersData()
        // console.log(response.data)
        if(response.status == 200){
            setFoldersDetails(response.data.folders)
        }
    }
    const addFolder = async(fname) =>{
        // console.log(fname , index)
        const response = await CreateFolder(fname )
        if(response.status == 201){
            addFolders([...folders , response.data.folder._id])
            setFoldersDetails([...foldersDeatils , response.data.folder])
        }
    }
    const removeFolder = async (index) =>{
        if(selectedFolder == foldersDeatils[index]._id){
            setSelectedFolder(folders[0]) ;
        }
        const response = await deleteFolderById(foldersDeatils[index]._id);
        if(response.status == 201){
            const arr = folders.filter((folderId , idx) => folderId != foldersDeatils[index]._id)
            addFolders(arr)
            setFoldersDetails([...foldersDeatils.slice(0 , index) , ...foldersDeatils.slice(index + 1)])
        }
    }
    const removeForm = async (index) =>{
        const response = await deleteForm(forms[index]._id);
        if(response.status == 201){
            // fetchForm()
            setForms([...forms.slice(0 , index) , ...forms.slice(index + 1)])
        }
    }

    const createTemplate = () =>{
        localStorage.setItem('selectedFolderId' , selectedFolder)
        navigate('/formtemplates/create')
    }

    useEffect(()=>{
        fetchUser()
        fetchfolder()
    },[])
    // useEffect(()=>{
    //     console.log(forms)
    // },[forms])
    useEffect(()=>{
        if(action == "Logout"){
            localStorage.clear()
            navigate('/')
        }else if(action == "setting"){
            navigate('/setting')
        }
    }, [ action ])
    return (
        <div className={styles.page} >
            <header>
                <select onChange={e => setActions(e.target.value)} >
                    <option value="workspace" >{`${username}'s workspace`} </option>
                    <option value="setting" >Settings </option>
                    <option value="Logout" >Log Out </option>
                </select>
            </header>

            <div className={styles.workspace} > 
                <div className={styles.folderStr} >
                    <div style={{width:'15vw'}} onClick={()=> setCreateFolderPrompt(true)} >
                        <h5><HiMiniFolderPlus />create a folder</h5> 
                    </div>
                    {foldersDeatils.length > 1 && foldersDeatils.map((folder , index) =>{
                        if(folder._id != folders[0]){
                            return <div key={index} style={{justifyContent:'space-between'}} onClick={()=> {
                                setSelectedFolder(folder._id);
                                fetchForm(folder._id)
                            }} >
                            <h5>{folder.folderName}</h5>
                            <span onClick={(e)=> {
                                e.stopPropagation()
                                setDeleteIndex(index)
                                setDeleteFolderAlert(true)
                            }}><img src={deleteIcon} alt="X" /></span>
                          </div>
                        }
                    })}
                </div>
                <div className={styles.typebotStr} >
                    <div className={styles.createTypebot} onClick={createTemplate} >
                        <GrAdd className={styles.plusIcon} />
                        <p>Create a typebot</p>
                    </div>
                    {forms && forms.map((form , index)=>{
                        return <FormCard key={index} formData={form} index={index} styles={styles} action={showDeleteAlert} />
                    })}
                    {createFolderPrompt && <AddPrompt closePrompt={closeCreateFolderPrompt} action={addFolder} />}
                    {deleteFolderAlert && <ConfirmAlert text='Are you sure you want to delete this folder ?' action={confirmation} closePrompt={closeDeleteFolderAlert} />}
                    {deleteFormAlert && <ConfirmAlert text='Are you sure you want to delete this form ?' action={deleteFormConfirmation} closePrompt={closeDeleteFormAlert} />}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
