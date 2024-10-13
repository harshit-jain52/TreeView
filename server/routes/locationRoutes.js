const express = require('express');
const router = express.Router();
const { getGodowns, getSubGodowns, addLocation, getSearchedLocations } = require('../controllers/locationController');

router.get('/godowns', getGodowns);
router.get('/subgodowns/:parent_id', getSubGodowns);
router.get('/search/:query', getSearchedLocations);
router.post('/', addLocation);

module.exports = router;