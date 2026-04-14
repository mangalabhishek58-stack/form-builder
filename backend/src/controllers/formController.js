const FolderModel = require('../models/Folder');
const FormModel = require('../models/Form')

function getFormsByFolder (){
    return async(req , res , next) =>{
        try {
            // const UserId = req.user_id ;
            const {folderId} = req.body ;
            const forms = await FormModel.find({folderId })
            if(!forms){
                res.status(400).json({
                    status:'Failed',
                    message:'No Form Exist'
                })
                return
            }
            res.status(200).json({
                status:'Success' ,
                forms
            })
        } catch (error) {
            next("error For Fetching Form", error);
        }
    }
}

function getFormsById (){
    return async(req , res , next) =>{
        try {
            const FormId = req.params.id ;
            const form = await FormModel.findById(FormId)
            if(!form){
                res.status(400).json({
                    status:'Failed',
                    message:'Incorrect Form Id'
                })
                return
            }
            res.status(200).json({
                status:'Success' ,
                form
            })
        } catch (error) {
            next("Invalid Url or Form", error);
        }
    }
}

function createForm() {
    return async(req , res , next) =>{
        try {
            const { formName , formTheme , folderId , formTemplate ,inputNumbers} = req.body;
            const existingFolder = await FolderModel.findById(folderId)
            // console.log(existingFolder)
            if(existingFolder.userId != req.user_id){
                // console.log('Id Not Matched')
                res.status(400).json({
                    status:'Falied',
                    message:'Invaid User crete form from your Id'
                })
                return         
            }
            
            const form = new FormModel({
                formName,
                formTheme ,
                formTemplate ,
                folderId  : existingFolder,
                inputNumbers
            })
            await form.save()
            existingFolder.forms.push(form)
            await existingFolder.save()
            res.status(201).json({
                status:"Success",
                form
            })
        } catch (error) { 
            next('Error For Creating Form' , error)
        }
    }
}

function updateForm() {
    return async(req , res , next) =>{
        try {
            const formId = req.params.id ;
            const { formName , formTheme , folderId , formTemplate ,inputNumbers} = req.body;
            const existingFolder = await FolderModel.findById(folderId)
            if(existingFolder.userId != req.user_id){
                res.status(400).json({
                    status:'Falied',
                    message:'Invaid User You Do Not Update This Form'
                })
                return         
            }
            
            const updatedForm = await FormModel.findByIdAndUpdate(formId , {
                formName ,
                formTheme ,
                folderId : existingFolder , 
                formTemplate ,
                inputNumbers 
            })
            res.status(201).json({
                status:"Success",
                updatedForm
            })
        } catch (error) { 
            next('Error For updating form' , error)
        }
    }
}

function updateViews (){
    return async(req , res , next) =>{
        try {
            const formId = req.params.id ;
            const {view} = req.body ;
            const updatedForm = await FormModel.findByIdAndUpdate(formId , {
                views: view + 1 
            })
            res.status(201).json({
                status:'Success' ,
                Views : updateForm.views
            })
        } catch (error) {
            next("Invalid Form", error);
        }
    }
}

function deleteForm (){
    return async(req , res , next) =>{
        try {
            const FormId = req.params.id ;
            const form = await FormModel.findById(FormId)
            const folderId = form.folderId ;
            const existingFolder = await FolderModel.findById(folderId)
            const arr = existingFolder.forms.filter((id)=> id != FormId)
            existingFolder.forms = arr ;
            await FormModel.findByIdAndDelete(FormId)
            await existingFolder.save()
            res.status(201).json({
                status:'Success',
                message:'Form Delete Successfully',
                formId: FormId
            })
        } catch (error) {
            next("Error For Deleting Form" ,error)
        }
    }
}

module.exports = {
    createForm ,
    updateForm ,
    deleteForm , 
    updateViews ,
    getFormsByFolder,
    getFormsById
}