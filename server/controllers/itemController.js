const Item = require("../models/itemModel");
const Location = require("../models/locationModel");

const getGodownItems = async (req, res) => {
    const { godown_id } = req.params;
    try {
        const items = await Item.find({ godown_id }).select("item_id name");
        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getItem = async (req, res) => {
    const { item_id } = req.params;
    try {
        const item = await Item.findOne({ item_id });
        const godown = await Location.findOne({ id: item.godown_id });
        res.status(200).json({item, godown});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getGodownItems, getItem };