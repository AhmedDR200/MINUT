const express = require('express');
const router = express.Router();

const{ 
    getAllReservations,
    getSingleReservation,
    createReservation,
    updateReservation,
    deleteReservation
} = require('../controllers/reservationController');

const {
    createReservationValidetor,
    updateReservationValidetor,
    deleteReservationValidetor,
    getReservationValidetor
} = require('../utils/validetors/reservationValidetor');

router.route('/')
.get(getAllReservations)
.post(createReservationValidetor, createReservation)

router.route('/:id')
.get(getReservationValidetor, getSingleReservation)
.put(updateReservationValidetor, updateReservation)
.delete(deleteReservationValidetor, deleteReservation)


module.exports = router;