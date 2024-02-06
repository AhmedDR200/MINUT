const express = require('express');
const router = express.Router();

const{ 
    getAllProperties,
    getSingleProperty,
    createProperty,
    updateProperty,
    deleteProperty
} = require('../controllers/propertyController');

router.route('/')
.get(getAllProperties)
.post(createProperty)

router.route('/:id')
.get(getSingleProperty)
.put(updateProperty)
.delete(deleteProperty)


module.exports = router;