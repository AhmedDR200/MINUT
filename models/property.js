const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    location: {
      type: String,
      required: [true, 'Location is required']
    }
},{
    timestamps: true,
    versionKey: false
});
  
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;