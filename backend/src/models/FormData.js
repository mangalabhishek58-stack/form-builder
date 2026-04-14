const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    Data : [
        {
            
        }
    ],
    isCompleted:{
        type: Boolean,
        default: false
    },
    formId:{
        type : mongoose.ObjectId,
        ref: "Form"
    }
    

},
{timestamps:true})


module.exports = mongoose.model('FormData' , formDataSchema) ;