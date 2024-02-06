const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required']
    }
});
  
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
  