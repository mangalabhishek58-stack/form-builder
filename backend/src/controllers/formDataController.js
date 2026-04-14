const FormModel = require('../models/Form')
const FormDataModel = require('../models/FormData')

function createFormData() {
    return async(req , res , next) =>{
        try {
            const { formId , isCompleted , Data} = req.body;

            const formData = new FormDataModel({
                formId , 
                isCompleted ,
                Data,
            })
            await formData.save()
            res.status(201).json({
                status:"Success",
                formDataId : formData._id
            })
        } catch (error) { 
            next('Error For Adding Data' , error)
        }
    }
}

function updateFormData() {
    return async(req , res , next) =>{
        try {
            const formDataId = req.params.id ;
            const { formId , isCompleted , Data} = req.body;
            
            const updatedFormData = await FormDataModel.findByIdAndUpdate(formDataId , {
                formId , 
                isCompleted ,
                Data,
            })
            res.status(201).json({
                status:"Success",
                updatedFormDataId:updateFormData._id
            })
        } catch (error) { 
            next('Error For updating Data' , error)
        }
    }
}

function getFormDataByForm (){
    return async(req , res , next) =>{
        try {
            const formId = req.params.formId ;
            const formDatas = await FormDataModel.find({formId})
            if(!formDatas){
                res.status(400).json({
                    status:'Failed',
                    message:'No Data Exist For This Form'
                })
                return
            }
            res.status(200).json({
                status:'Success' ,
                formDatas
            })
        } catch (error) {
            next("error For Fetching FormData", error);
        }
    }
}

 module.exports = {createFormData , updateFormData , getFormDataByForm}