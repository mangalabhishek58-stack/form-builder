const express = require('express')
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const {getFoldersByUser, createFolder, deletefolderById, getFoldersById} = require('../controllers/folderController')

// post get put delete 

router.get('/', (req, res) => {
    res.json({
        message: 'Folder Route Is working Fine',
        status: 'Success'
    })
})

router.get('/find' , verifyToken , getFoldersByUser())

router.get('/get/:id' , getFoldersById())

router.post('/create', verifyToken , createFolder())

router.delete('/delete/:id', verifyToken , deletefolderById())


module.exports = router 
