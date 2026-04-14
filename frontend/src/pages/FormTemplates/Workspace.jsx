import React from 'react'
import styles from './Workspace.module.css'
import { bubbles, inputs } from '../../assets/data/inputTypes'
import { GrFlagFill } from 'react-icons/gr'
import TemplateBox from '../../components/FormTemplatesPage/TemplateBox'

function Workspace({templates, setTemplates , inputNumbers , setInputNumbers}) {
    const setValue = ( value , idx) =>{
        // const obj = templates[idx]
        setTemplates([...templates.slice(0 , idx) , {...templates[idx] , value} ,  ...templates.slice(idx+1)])
    }
    const deleteTemplate = ( idx) =>{
        const index = templates[idx].numIndex
        setTemplates([...templates.slice(0 , idx) ,  ...templates.slice(idx+1)])
        setInputNumbers([...inputNumbers.slice(0 , index) , inputNumbers[index] - 1 , ...inputNumbers.slice(index+1)])
    }
    const addBubbles = (name , index) =>{
        const obj = {
            type:'Bubble',
            required : true,
            inputType : name ,
            numIndex : index ,
            iName : `${name} ${inputNumbers[index]}`,
            value : ''
        }
        setTemplates([...templates , obj])
        setInputNumbers([...inputNumbers.slice(0 , index) , inputNumbers[index] + 1 , ...inputNumbers.slice(index+1)])
    }
    const addInputs = (name , index) =>{
        let hint ;
        if(name == 'Rating'){
            hint = 'User will tap to rate out of 5'
        }else if(name == 'Date'){
            hint = 'User Will select a date'
        }else{
            hint = `User will input a ${name} on his form`
        }
        const obj = {
            type:'Input',
            required : name == 'Button',
            inputType : name ,
            numIndex : index + 4 ,
            iName : `${name} ${inputNumbers[index + 4]}`,
        }
        name == 'Button' ? obj.value = '' : obj.hint = hint
        setTemplates([...templates , obj])
        setInputNumbers([...inputNumbers.slice(0 , index + 4) , inputNumbers[index + 4] + 1 , ...inputNumbers.slice(index+5)])
    }
    return (
        <div className={styles.page}>
            <div className={styles.inputIconContainer}>
                <h4>Bubbles</h4>
                <div className={styles.bubblesDiv}>
                    {bubbles && bubbles.map((bubble, index) => {
                        return <div className={styles.inputButton} key={index} onClick={() =>{addBubbles( bubble.name , index)}} >
                            <img src={bubble.icons} alt="bubble" />
                            <p>{bubble.name}</p>
                        </div>
                    })}
                </div>
                <h4>Inputs</h4>
                <div className={styles.inputsDiv}>
                    {inputs && inputs.map((input, index) => {
                        return <div className={styles.inputButton} key={index} onClick={() =>{addInputs(input.name , index)}} >
                            <img src={input.icons} alt="bubble" />
                            <p>{input.name}</p>
                        </div>
                    })}
                </div>
            </div>

            
            <div className={styles.templatesDiv}>
                <div className={styles.templateHeading}>
                    <GrFlagFill style={{color:'white'}}/> <h3>Start</h3>
                </div>
                {templates.map((template , index) => <TemplateBox key={index} template={template} index={index} setValue={setValue} deleteTemplate={deleteTemplate} />)}
            </div>

        </div>
    )
}

export default Workspace
