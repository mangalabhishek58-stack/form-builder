const FolderModel = require('../models/Folder');
const User = require('../models/User');

function getFoldersByUser (){
    return async(req , res , next) =>{
        try {
            const UserId = req.user_id ;
            const folders = await FolderModel.find({userId: UserId })
            res.status(200).json({
                status:'Success' ,
                folders
            })
        } catch (error) {
            next("error For Fetching Folder", error);
        }
    }
}

function getFoldersById (){
    return async(req , res , next) =>{
        try {
            const folderId = req.params.id ;
            const folder = await FolderModel.findById(folderId)
            res.status(200).json({
                status:'Success' ,
                folder
            })
        } catch (error) {
            next("error For Fetching Folder", error);
        }
    }
}

function createFolder() {
    return async(req , res , next) =>{
        try {
            const { folderName } = req.body;
            const existingUser = await User.findById(req.user_id)
            const folder = new FolderModel({
                folderName,
                // index,
                userId : existingUser
            })
            await folder.save()
            existingUser.folders.push(folder)
            await existingUser.save()
            res.status(201).json({
                status:"Success",
                folder
            })
        } catch (error) { 
            next('Error For Creating Folder' , error)
        }
    }
}

function deletefolderById (){
    return async(req , res , next) =>{
        try {
            const folderId = req.params.id ;
            const existingUser = await User.findById(req.user_id)
            const arr = existingUser.folders.filter((id)=> id != folderId)
            await FolderModel.findByIdAndDelete(folderId);
            existingUser.folders = arr ;
            await existingUser.save()
            res.status(201).json({
                status:'Success',
                message:'Folder Delete Successfully',
                FolderId: folderId
            })
        } catch (error) {
            next("Error For Deleting Folder" ,error)
        }
    }
}

module.exports = {
    getFoldersByUser,
    getFoldersById ,
    createFolder,
    deletefolderById
}