import React from 'react'
import deleteIcon from '../../assets/images/delete.png'
import { useNavigate } from 'react-router-dom'

function FormCard({ formData, index, action, styles }) {
  const navigate = useNavigate()
  const updateForm = () => {
    localStorage.setItem('selectedFolderId' , formData.folderId)
    navigate(`/formtemplates/update/${formData._id}`)
  }
  const deleteForm = async () => {
    action(index)
  }
  const deleteIconStyles = {
    width: '35px',
    height: '35px',
    background: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: '-17.5px',
    top: '-17.5px',
    borderRadius: '50%'
  }
  return (
    <div className={styles.createTypebot} style={{ background: 'rgba(255, 255, 255, .5)' }} onClick={updateForm} >
      <p>{formData.formName ? formData.formName : 'New form'}</p>
      <span onClick={(e) => {
        e.stopPropagation()
        action(index)
      }} style={deleteIconStyles}>
        <img src={deleteIcon} alt="X" width='24px' height='24px' />
      </span>
    </div>
  )
}

export default FormCard
