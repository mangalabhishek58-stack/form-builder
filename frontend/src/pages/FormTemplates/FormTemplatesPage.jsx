import React, { useEffect, useState } from 'react'
import styles from './FormTemplatesPage.module.css'
import Workspace from './Workspace'
import ThemesPage from './ThemesPage'
import Analytics from './Analytics'
import { createForm, getFormById, updateForm } from '../../api/Form'
import { useNavigate } from 'react-router-dom'
import { GrFormCheckmark } from 'react-icons/gr'

function FormTemplatesPage() {
  const navigate = useNavigate()
  const [selectedNav, setSelectedNav] = useState('Flow')
  const [formName, setFormName] = useState('')
  const [formTheme, setFormTheme] = useState('Dark')
  const [formTemplates, setFormTemplates] = useState([])
  const [formId, setFormId] = useState('')
  const [formViews, setFormViews] = useState(null)
  const [inputNumbers, setInputNumbers] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
  const [formLink, setFormLink] = useState('')
  const [copyLink, setCopyLink] = useState(false)
  const path = window.location.pathname.split('/')

  const fetchForm = async (id) => {
    const response = await getFormById(id)
    console.log(response)
    if (response.status == 200) {
      setFormName(response.data.form.formName)
      setFormTheme(response.data.form.formTheme)
      setFormViews(response.data.form.views)
      setFormTemplates(response.data.form.formTemplate)
      setInputNumbers(response.data.form.inputNumbers)
    } else {
      alert(response.data.message)
      navigate('/dashboard')
    }
  }
  useEffect(() => {
    // console.log(path)
    if (path[path.length - 2] == 'update') {
      // console.log(path[path.length - 2])
      setFormId(path[path.length - 1])
      setFormLink(window.location.host + '/form/' + path[path.length - 1])
      fetchForm(path[path.length - 1])
    }
  }, [])
  useEffect(() => {
    if (copyLink) {
      setTimeout(() => {
        setCopyLink(false)
      }, 5000)
    }
  }, [copyLink])
  // useEffect(()=>{
  //   console.log(formTemplates)
  // },[formTemplates])
  
  const copyToClipboard = async (link) => {
    await window.navigator.clipboard.writeText(link)
    setCopyLink(true)
  }

  const createF = async () => {
    const folderId = localStorage.getItem('selectedFolderId')
    const response = await createForm(formName, formTheme, folderId, formTemplates, inputNumbers);
    if (response.status == 201) {
      setFormId(response.data.form._id)
      setFormLink(`${window.location.host}/form/${response.data.form._id}`)
      copyToClipboard(`${window.location.host}/form/${response.data.form._id}`)
      navigate(`/formtemplates/update/${response.data.form._id}`)
      fetchForm(response.data.form._id)
    }else if(response.status == 401){
      localStorage.clear()
      navigate('/')
    }
  }

  const updateF = async () => {
    const folderId = localStorage.getItem('selectedFolderId')
    const response = await updateForm(formId, formName, formTheme, folderId, formTemplates, inputNumbers)
    if (response.status == 201) {
      setFormLink(`${window.location.host}/form/${response.data.updatedForm._id}`)
      copyToClipboard(`${window.location.host}/form/${response.data.updatedForm._id}`)
    }else if(response.status == 401){
      localStorage.clear()
      navigate('/')
    }
  }
  const clickboard = () =>  copyToClipboard(formLink) 

  const handleSave = () =>{
    let errArr = formTemplates.filter((templates , index )=> {
      return templates.required && !templates.value.trim()
      // if(templates.required ){
      //   return index ;
      // }
    })
    if(errArr.length != 0){
      alert('Fill All Required Field')
      return
    }
    formId ? updateF() : createF()
  }
  const selectedStyles = {
    color: '#7EA6FF',
    border: 'solid #7EA6FF 1px'
  }
  return (
    <div className={styles.page}>
      <header>
        <div className={styles.formNameInput}>
          {selectedNav === 'Flow' && <input type="text" value={formName} placeholder='Enter Form Name' onChange={(e) => setFormName(e.target.value)} />}
        </div>
        <div className={styles.navBar}>
          <h5 style={selectedNav === 'Flow' ? selectedStyles : {}} onClick={() => setSelectedNav('Flow')} >Flow</h5>
          <h5 style={selectedNav === 'Theme' ? selectedStyles : {}} onClick={() => setSelectedNav('Theme')}>Theme</h5>
          <h5 style={selectedNav === 'Response' ? selectedStyles : {}} onClick={() => setSelectedNav('Response')}>Response</h5>
        </div>
        <div className={styles.actions}>
          <button style={formId ? { background: '#1A5FFF' } : {}} onClick={()=>{{formId ? clickboard() : ''}}} > Share</button>
          <button style={{ background: 'rgba(74 , 222 , 128 , .8)' }} onClick={() => { handleSave()}}> Save</button>
          <p onClick={() => { navigate('/dashboard') }}>X</p>
        </div>
      </header>

      {copyLink && <div className={styles.copylink}>
        <GrFormCheckmark style={{ width: '1.5rem', height: '1.5rem', color: '#1A5FFF' }} />
        <p>Link Copied</p>
      </div>
      }

      {selectedNav === 'Flow' && <Workspace templates={formTemplates} setTemplates={setFormTemplates} inputNumbers={inputNumbers} setInputNumbers={setInputNumbers} />}
      {selectedNav === 'Theme' && <ThemesPage formTheme={formTheme} setFormTheme={setFormTheme} />}
      {selectedNav === 'Response' && <Analytics formId={formId} />}
    </div>
  )
}

export default FormTemplatesPage
