const express = require('express')
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { getFormDataByForm, createFormData, updateFormData } = require('../controllers/formDataController');



router.post('/create' , createFormData())

router.put('/update/:id' , updateFormData())

router.get('/get/:formId' , verifyToken , getFormDataByForm())


module.exports = router 