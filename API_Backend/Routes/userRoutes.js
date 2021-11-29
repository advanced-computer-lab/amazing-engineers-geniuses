const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/flight/viewReservations', userController.viewReservations);
router.post('/flight/cancelReservations', userController.cancelReservation);

module.exports = router;