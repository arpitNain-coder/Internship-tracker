const Internship = require("../models/Internship");

const createInternship = async (req, res) => {
    try {
        const internship = await Internship.create(req.body);

        res.status(201).json({
            message: "Internship added successfully",
            internship,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getInternships = async (req, res) => {
    try {
        const internships = await Internship.find();
        res.json(internships);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getInternshipById = async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found",
            });
        }

        res.json(internship);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateInternship = async (req, res) => {
    try {
        const internship = await Internship.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found",
            });
        }

        res.json({
            message: "Internship updated successfully",
            internship,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteInternship = async (req, res) => {
    try {
        const internship = await Internship.findByIdAndDelete(req.params.id);

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found",
            });
        }

        res.json({
            message: "Internship deleted successfully",
            internship,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createInternship,
    getInternships,
    getInternshipById,
    updateInternship,
    deleteInternship,
};