import React, { useEffect, useState } from 'react'
import { getFormById, updateView } from '../../api/Form'
import bubbleIcon from '../../assets/images/chatIcon.png'
import sendIcon from '../../assets/images/send.png'
import styles from './FormResponsePage.module.css'
import { CreateData, updateData } from '../../api/FormData'

function FormResponsePage() {
    const [formId, setFormId] = useState('')
    const [formTheme, setFormTheme] = useState('Dark')
    const [formTemplates, setFormTemplates] = useState([])
    const [navigate, setNavigate] = useState([true])
    const [formData, setFormData] = useState([])
    const [formDataId, setFormDataId] = useState('')
    const path = window.location.pathname.split('/')

    const updateVi = async (id, view) => {
        const response = await updateView(id, view);
        if (response.status == 201) {
            console.log(response.data)
        }
    }
    const fetchForm = async (id) => {
        const response = await getFormById(id)
        if (response.status == 200) {
            // console.log(response.data.form)
            if (!localStorage.getItem('formViews') || localStorage.getItem('formViews') != id) {
                updateVi(id, response.data.form.views)
                localStorage.setItem('formViews', id)
                
            }
            setFormTheme(response.data.form.formTheme)
            setFormTemplates(response.data.form.formTemplate)
        } else {
            alert('Invalid Url Please Enter Correct Url')
        }
    }

    useEffect(() => {
        setFormId(path[path.length - 1])
        fetchForm(path[path.length - 1])
    }, [])

    return (
        <div className={styles.page} style={formTheme == 'Dark' ? { background: '#1F1F23' } : formTheme == 'TailBlue' ? { background: '#508C9B' } : { background: '#ffffff' }}>
            {formTemplates && formTemplates.map((template, index) => {
                if (navigate[index]) {
                    return template.type == 'Bubble' ? <Bubble key={index} template={template} navigate={navigate} setNavigate={setNavigate} /> :
                        <InputBox key={index} template={template} index={index} 
                            navigate={navigate} setNavigate={setNavigate}
                            formData={formData} setFormData={setFormData} formId={formId}
                            dataId={formDataId} setDataId={setFormDataId} />
                }
            })}
        </div>
    )
}

export default FormResponsePage

function Bubble({ template , navigate , setNavigate }) {
    useEffect(()=>{
        setNavigate([...navigate , true])
    },[])
    return (
        <div className={styles.bubble}>
            <img className={styles.bubbleIcon} src={bubbleIcon} alt="Bubble" />
            {template.inputType == 'Text' && <p>{template.value}</p>}
            {template.inputType == 'Image' && <img className={styles.bubbleImg} src={template.value} alt={template.iName} />}
            {template.inputType == 'GIF' && <img className={styles.bubbleImg} src={template.value} alt={template.iName} />}
            {template.inputType == 'Video' && <video controls >
                <source src={template.value} type='video/mp4' />
                </video>}
        </div>
    )
}
function InputBox({ template, index, navigate , setNavigate , formData, setFormData, formId, dataId, setDataId }) {
    const [inputData, setInputData] = useState({ inputname: '', value: '', selected: false, templateIndex: 0 })
    useEffect(() => {
        setInputData({ ...inputData, inputname: template.iName, templateIndex: index })
        if (template.inputType == 'Button') {
            setInputData({ ...inputData, inputname: template.iName, value: template.value, templateIndex: index })
        }
    }, [])

    const handleSave = () => {
        if(inputData.selected){
            return false
        }
        console.log('btn Click')
        setInputData({ ...inputData, selected: true })
        setFormData([...formData, { ...inputData, selected: true }])
        setNavigate([...navigate , true])
        return true ;
    }
    const handleSaveToDB = async () => {
        const action = handleSave() ;
        if(!action) {
            return
        }
        let response
        if (dataId) {
            console.log('Updated ', dataId)
            response = await updateData(dataId, formId, [...formData, { ...inputData, selected: true }])
            if (response.status == 201) {
                setDataId(response.data.formDataId)
                console.log(formData)
            }
        } else {

            response = await CreateData(formId, [...formData, { ...inputData, selected: true }])
            if (response.status == 201) {
                setDataId(response.data.formDataId)
            }
        }

        console.log(response.data)
    }
    return (
        <div className={styles.input}>
            {template.inputType == 'Button' && <div className={styles.buttonDiv} onClick={handleSaveToDB}
                style={inputData.selected ? { background: '#FF8E21' } : {}}>
                <p>{template.value}</p>
            </div>}

            {template.inputType == 'Rating' && <div className={styles.inputsDiv}>
                <div className={styles.ratingDiv}
                    style={inputData.selected ? { background: '#777777', color: '#fff' } : {}}>
                    {[1, 2, 3, 4, 5].map((num) =>
                        <span key={num}
                            style={{ background: inputData.value == num ? '#FF8E21' : '' }}
                            onClick={() => setInputData({ ...inputData, value: num })
                            } >{num}</span>)}

                </div>
                <div className={styles.saveIcon} onClick={handleSave}
                    style={inputData.selected ? { background: '#777777' } : {}}>
                    <img src={sendIcon} alt="Save" />
                </div>
            </div>}

            {template.inputType == 'Text' && <div className={styles.inputsDiv}>
                <div className={styles.takeInputDiv}>
                    <input type="text" placeholder='Enter your Text'
                        style={inputData.selected ? { background: '#777777', color: '#fff' } : {}}
                        readOnly={inputData.selected}
                        value={inputData.value}
                        onChange={(e) => { setInputData({ ...inputData, value: e.target.value }) }} />
                </div>
                <div className={styles.saveIcon} onClick={handleSave}
                    style={inputData.selected ? { background: '#777777' } : {}}>
                    <img src={sendIcon} alt="Save" />
                </div>
            </div>}

            {template.inputType == 'Number' && <div className={styles.inputsDiv}>
                <div className={styles.takeInputDiv}>
                    <input type="number" placeholder='Enter a Number'
                        style={inputData.selected ? { background: '#777777', color: '#fff' } : {}}
                        readOnly={inputData.selected}
                        value={inputData.value}
                        onChange={(e) => { setInputData({ ...inputData, value: e.target.value }) }} />
                </div>
                <div className={styles.saveIcon} onClick={handleSave}
                    style={inputData.selected ? { background: '#777777' } : {}}>
                    <img src={sendIcon} alt="Save" />
                </div>
            </div>}

            {template.inputType == 'Email' && <div className={styles.inputsDiv}>
                <div className={styles.takeInputDiv}>
                    <input type="email" placeholder='Enter a email'
                        style={inputData.selected ? { background: '#777777', color: '#fff' } : {}}
                        readOnly={inputData.selected}
                        value={inputData.value}
                        onChange={(e) => { setInputData({ ...inputData, value: e.target.value }) }} />
                </div>
                <div className={styles.saveIcon} onClick={handleSave}
                    style={inputData.selected ? { background: '#777777' } : {}}>
                    <img src={sendIcon} alt="Save" />
                </div>
            </div>}

            {template.inputType == 'Phone' && <div className={styles.inputsDiv}>
                <div className={styles.takeInputDiv}>
                    <input type="number" placeholder='Enter a Phone Number'
                        style={inputData.selected ? { background: '#777777', color: '#fff' } : {}}
                        readOnly={inputData.selected}
                        value={inputData.value}
                        onChange={(e) => { setInputData({ ...inputData, value: e.target.value }) }} />
                </div>
                <div className={styles.saveIcon} onClick={handleSave}
                    style={inputData.selected ? { background: '#777777' } : {}}>
                    <img src={sendIcon} alt="Save" />
                </div>
            </div>}

            {template.inputType == 'Date' && <div className={styles.inputsDiv}>
                <div className={styles.takeInputDiv}>
                    <input type="date" placeholder='Select a date'
                        style={inputData.selected ? { background: '#777777', color: '#fff' } : {}}
                        readOnly={inputData.selected}
                        value={inputData.value}
                        onChange={(e) => { setInputData({ ...inputData, value: e.target.value }) }} />
                </div>
                <div className={styles.saveIcon} onClick={handleSave}
                    style={inputData.selected ? { background: '#777777' } : {}}>
                    <img src={sendIcon} alt="Save" />
                </div>
            </div>}
        </div>
    )
}
