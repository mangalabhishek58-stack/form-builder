const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    folderName:{
        type: String,
        required : true
    },
    // index:{
    //     type: Number,
    //     required : true
    // },
    forms : [
        {
            type : mongoose.ObjectId , 
            ref : 'FormTemplate'
        }
    ],
    userId:{
        type : mongoose.ObjectId,
        ref: "User"
    }
},
{timestamps:true})


module.exports = mongoose.model('Folder' , folderSchema) ;