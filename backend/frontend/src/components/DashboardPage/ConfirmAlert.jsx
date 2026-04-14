import React from 'react'
import styles from './Alert.module.css'

function ConfirmAlert({text , action , closePrompt}) {
  const handleConfirm = ()=>{
    action()
    closePrompt()
  }
  return (
    <div className={styles.page}>
      <h3 style={{textAlign:'center'}}>{text} </h3>
      <div className={styles.action}>
        <h3 className={styles.confirm} onClick={handleConfirm} >Confirm</h3>
        <div className={styles.divider}></div>
        <h3 onClick={closePrompt} > Cancel</h3>
      </div>
    </div>
  )
}

export default ConfirmAlert
