const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    formName:{
        type: String
    },
    formTheme:{
        type:String
    },
    formTemplate : [
        {
            
        }
    ],
    folderId:{
        type : mongoose.ObjectId,
        ref: "Folder"
    },
    inputNumbers:[
        {
            type:Number
        }
    ],
    views:{
        type:Number ,
        default: 0
    }

},
{timestamps:true})


module.exports = mongoose.model('Form' , formSchema) ;