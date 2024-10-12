const express = require('express');
const router = express.Router();
const { getGodownItems, getItem, addItem } = require('../controllers/itemController');

router.get('/godown/:godown_id', getGodownItems);
router.get('/:item_id', getItem);
router.post('/', addItem);

module.exports = router;