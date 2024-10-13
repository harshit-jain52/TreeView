const Location = require("../models/locationModel");

const getGodowns = async (req, res) => {
    try {
        const godowns = await Location.find({ parent_godown: null });
        res.status(200).json(godowns);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getSubGodowns = async (req, res) => {
    const { parent_id } = req.params;
    try {
        const godowns = await Location.find({ parent_godown: parent_id });
        res.status(200).json(godowns);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const addLocation = async (req, res) => {
    try {
        const location = await Location.create({...req.body});
        res.status(200).json(location);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getGodowns, getSubGodowns, addLocation };