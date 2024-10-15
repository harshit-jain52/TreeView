const express = require('express');
const router = express.Router();
const { getGodownItems, getItem, addItem, getSearchedItems } = require('../controllers/itemController');

router.get('/godown/:godown_id', getGodownItems);
router.get('/search', getSearchedItems);
router.get('/:item_id', getItem);
router.post('/', addItem);

module.exports = router;