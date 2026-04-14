import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import { formsDataByFormId } from "../../api/FormData";
import { useNavigate } from "react-router-dom";
import { getFormById } from "../../api/Form";
import moment from "moment";

function Analytics({formId  }) {
  const navigate = useNavigate()
  const [checkResponse , setCheckResponse] = useState(false)
  const [start , setStart] = useState(0)
  const [views , setViews] = useState(0)
  const [completeRate , setCompleteRate] = useState(0)
  const [templates , setTemplates] = useState([])
  const [formDatas , setformDatas] = useState([])

  const fetchFormData = async (id)=>{
    const response = await formsDataByFormId(id);
    if(response.status == 200){
      setformDatas(response.data.formDatas)
      setStart(response.data.formDatas.length)
    }else if(response.status == 401){
      localStorage.clear()
      navigate('/')
    }
  }

  const fetchForm = async (id) =>{
    const response = await getFormById(id)
    if(response.status == 200){
      setViews(response.data.form.views)
      setTemplates(response.data.form.formTemplate)
    }else if(response.status == 400){
      console.log(response.data)
    }
  }
  useEffect(()=>{
    if(formId){
      fetchForm(formId)
      fetchFormData(formId)
    }
  },[])
  useEffect(()=>{
    let rate = start /views
    rate = Math.floor(rate*100)
    setCompleteRate(rate)
  } , [views , start])
  return (
    <div className={styles.page}>
      {!formId && <div className={styles.defaultText}>
        <p>No Response Yet collected</p>
      </div> }

      {formId && <div className={styles.container} >
        <div className={styles.states} >
          <div>
            <h4>Views</h4>
            <p>{views}</p>
          </div>
          <div>
            <h4>Starts</h4>
            <p>{start}</p>
          </div>
          <div>
            <h4>Completion rate</h4>
            <p>{`${completeRate} %`}</p>
          </div>
        </div>
        <div className={styles.formData}>
          <table border='1px'>
            <thead>
            <tr>
              <th></th>
              <th>Submitted at</th>
              {templates.map((template) => {
                if (template.type === "Input") {
                  // if(!checkResponse){
                  //   setCheckResponse(true)
                  // }
                  return <th key={template.iName}>{template.iName}</th>;
                }
              })}
            </tr>
            </thead>
            <tbody>
              {formDatas.map((formData , index)=>{
                // console.log(formData)
                return <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{moment(formData.updatedAt).format("MMM D , h:mm a")}</td>
                  {formData.Data.map((data , index)=>{
                    return <td key={index}>{data.value}</td>
                  })}
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>}

    </div>
  );
}

export default Analytics;
