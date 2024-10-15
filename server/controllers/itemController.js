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
        let godown = await Location.findOne({ id: item.godown_id });
        let godowns = [godown];

        while (godown.parent_godown) {
            godown = await Location.findOne({ id: godown.parent_godown });
            godowns.push(godown);
        }

        res.status(200).json({item, godowns});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const addItem = async (req, res) => {
    try {
        const item = await Item.create({...req.body});
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getSearchedItems = async (req, res) => {
    const { query, categories } = req.query;
    const categoriesArr = categories.split(",");
    try {
        let items;
        items = await Item.find({ 
            name: { $regex: query, $options: 'i' },
            category: { $in: categoriesArr }
        }).select('name category');
        
        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getGodownItems, getItem, addItem, getSearchedItems };