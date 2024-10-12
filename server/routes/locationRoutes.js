const express = require('express');
const router = express.Router();
const { getGodowns, getSubGodowns, addLocation } = require('../controllers/locationController');

router.get('/godowns', getGodowns);
router.get('/subgodowns/:parent_id', getSubGodowns);
router.post('/', addLocation);

module.exports = router;