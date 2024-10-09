const express = require('express');
const router = express.Router();
const { getGodownItems, getItem } = require('../controllers/itemController');

router.get('/godown/:godown_id', getGodownItems);
router.get('/:item_id', getItem);

module.exports = router;