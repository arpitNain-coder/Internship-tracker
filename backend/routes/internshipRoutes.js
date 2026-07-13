const express = require("express");
const router = express.Router();

const {
    createInternship,
    getInternships,
    getInternshipById,
    updateInternship,
    deleteInternship,
} = require("../controller/internshipController");


router.post("/", createInternship);

router.get("/", getInternships);

router.get("/:id", getInternshipById);

router.put("/:id", updateInternship);

router.delete("/:id", deleteInternship);


module.exports = router;