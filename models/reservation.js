const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Guest is required']
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: [true, 'Property is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  }
},{
  timestamps: true,
  versionKey: false
});

// Populate Mongoose middleware
reservationSchema.pre(/^find/, function(next){
  this.populate({
      path: 'property',
      select: 'name'
  }).populate({
      path: 'guest',
      select: 'name'
  })
  next();
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
