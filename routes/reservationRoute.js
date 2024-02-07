const express = require('express');
const router = express.Router();

const{ 
    getAllReservations,
    getSingleReservation,
    createReservation,
    updateReservation,
    deleteReservation
} = require('../controllers/reservationController');

router.route('/')
.get(getAllReservations)
.post(createReservation)

router.route('/:id')
.get(getSingleReservation)
.put(updateReservation)
.delete(deleteReservation)


module.exports = router;