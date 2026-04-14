import React, { useEffect, useState } from 'react'
import deleteIcon from '../../assets/images/delete.png'

function TemplateBox({ template, index, setValue, deleteTemplate }) {
    const [placeholder, setPlaceHolder] = useState('Enter Text For Display')
    useEffect(() => {
        // if(template.inputType == '')
        if (template.type == 'Bubble') {
            template.inputType != 'Text' ? setPlaceHolder(`Paste ${template.inputType} Url Here`) : setPlaceHolder('Enter Text For Display')
        } else {
            setPlaceHolder('Enter Button Name For Display')
        }

    }, [])
    const deleteIconStyles = {
        width: '35px' ,
        height: '35px',
        background: '#D9D9D9',
        display: 'flex',
        justifyContent : 'center' ,
        alignItems : 'center' ,
        position: 'absolute' ,
        right: '-17.5px' ,
        top: '-17.5px',
        borderRadius: '50%'
    }
    const errorStyles = {
        input:{
            border:'1px solid #F55050'
        },
        error:{
            color:'#522224' ,
            fontSize: '.65rem',
            fontWeight: '500'
        }

    }
    return (
        <div style={{ position: 'relative' }}>
            <span style={deleteIconStyles} onClick={()=> deleteTemplate(index)}>
                <img src={deleteIcon} alt="X" width='24px' height='24px' />
            </span>
            <h3>{template.type == 'Bubble' ? template.iName : `Input ${template.iName}`}</h3>
            {template.required && 
            <input type="text" 
            style={template.value.trim().length === 0 ? errorStyles.input : {}} 
            placeholder={placeholder} value={template.value} onChange={(e) => setValue(e.target.value, index)} />}
            {template.required && template.value.trim().length === 0 && <span style={errorStyles.error}>Required True</span>}
            {!template.required && <p>{`Hint : ${template.hint}`}</p>}
        </div>
    )
}

export default TemplateBox
