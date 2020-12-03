const express = require('express');
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('quantity')
    .not()
    .isEmpty(),
    check('upccode')
    .not()
    .isEmpty(),
    check('location')
    .not()
    .isEmpty(),
    check('date')
    .not()
    .isEmpty(),
    check('time')
    .not()
    .isEmpty()
  ],
  placesControllers.createPlace
);

router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('quantity')
    .not()
    .isEmpty(),
    check('upccode')
    .not()
    .isEmpty(),
    check('location')
    .not()
    .isEmpty(),
    check('date')
    .not()
    .isEmpty(),
    check('time')
    .not()
    .isEmpty()
  ],
  placesControllers.updatePlace
);

router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
