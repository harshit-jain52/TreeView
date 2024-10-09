const express = require('express');
const router = express.Router();
const { getGodowns, getSubGodowns } = require('../controllers/locationController');

router.get('/godowns', getGodowns);
router.get('/subgodowns/:parent_id', getSubGodowns);

module.exports = router;