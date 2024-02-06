const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      unique: true
    }
},{
    timestamps: true,
    versionKey: false
});
  
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;