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

const getSearchedLocations = async (req, res) => {
    const { query } = req.params;
    try {
        const locations = await Location.find({ name: { $regex: query, $options: 'i' } });
        
        const locationsWithAbsoluteAddress = await Promise.all(locations.map(async location => {
            let absolute_address = location.name;
            let curr = location;

            while (curr.parent_godown) {
                curr = await Location.findOne({id:curr.parent_godown});
                absolute_address = `${curr.name} > ${absolute_address}`;
            }

            return {
                ...location._doc,
                absolute_address
            };
        }));

        res.status(200).json(locationsWithAbsoluteAddress);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getGodowns, getSubGodowns, addLocation, getSearchedLocations };