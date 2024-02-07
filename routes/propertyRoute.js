const express = require('express');
const router = express.Router();

const{ 
    getAllProperties,
    getSingleProperty,
    createProperty,
    updateProperty,
    deleteProperty
} = require('../controllers/propertyController');

const {
    createPropertyValidetor,
    updatePropertyValidetor,
    deletePropertyValidetor,
    getPropertyValidetor
} = require('../utils/validetors/propertyValidetor');


router.route('/')
.get(getAllProperties)
.post(createPropertyValidetor, createProperty)

router.route('/:id')
.get(getPropertyValidetor, getSingleProperty)
.put(updatePropertyValidetor, updateProperty)
.delete(deletePropertyValidetor, deleteProperty)


module.exports = router;