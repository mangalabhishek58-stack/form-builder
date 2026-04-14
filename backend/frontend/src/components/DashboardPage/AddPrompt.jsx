import React, { useState } from 'react'
import styles from './Alert.module.css'

function AddPrompt({closePrompt , action}) {
    const [folderName , setFolderName] = useState('')
    const handleSubmit = () =>{
      if(folderName){
        action(folderName)
        closePrompt()
      }
    }
  return (
    <div className={styles.page} style={{minHeight:'250px'}}>
      <h3>Create New Folder </h3>
      <input type="text" 
      placeholder='Enter folder name' 
      value={folderName}  
      onChange={(e)=> setFolderName(e.target.value) } />
      <div className={styles.action}>
        <h3 className={styles.confirm} onClick={handleSubmit} >Done</h3>
        <div className={styles.divider}></div>
        <h3 onClick={closePrompt} > Cancel</h3>
      </div>
    </div>
  )
}

export default AddPrompt
