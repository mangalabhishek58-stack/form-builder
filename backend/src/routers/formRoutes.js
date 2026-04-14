const express = require('express')
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const { getFormsByFolder, getFormsById, createForm, updateForm, deleteForm, updateViews } = require('../controllers/formController');

// post get put delete 

router.get('/', (req, res) => {
    res.json({
        message: 'Form Templates Route Is working Fine',
        status: 'Success'
    })
})

router.post('/find' , verifyToken , getFormsByFolder())

router.get('/get/:id' , getFormsById())

router.post('/create', verifyToken , createForm())

router.put('/update/:id', verifyToken , updateForm())

router.put('/updateview/:id',  updateViews())

router.delete('/delete/:id', verifyToken , deleteForm())

module.exports = router 
