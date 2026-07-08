const express = require("express");

const app = express();
app.use(express.json());

const internships = [
    {
        id: 1,
        company: "Google",
        title: "SDE Intern",
        location: "Bangalore"
    },
    {
        id: 2,
        company: "Microsoft",
        title: "Frontend Intern",
        location: "Hyderabad"
    },
    {
        id: 3,
        company: "Adobe",
        title: "Backend Intern",
        location: "Noida"
    }
];

app.get("/", (req, res) => {
    res.send("Lost from light");
});

app.get("/about", (req, res) => {
    res.send("Succumbed to madness.");
});


app.post("/internships", (req, res) => {

    const internship = req.body;

    internships.push(internship);

    res.status(201).json({
        message: "Internship added successfully",
        internship: internship
    });

});


app.get("/internships", (req, res) => {

    res.json(internships);

});


app.get("/internships/:id", (req, res) => {

    const id = Number(req.params.id);

    const internship = internships.find(
        internship => internship.id === id
    );

    if (!internship) {
        return res.status(404).json({
            message: "Internship not found"
        });
    }

    res.json(internship);

});


app.put("/internships/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = internships.findIndex(
        internship => internship.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Internship not found"
        });
    }

    internships[index] = {
        id: id,
        ...req.body
    };

    res.json({
        message: "Internship updated successfully",
        internship: internships[index]
    });

});


app.delete("/internships/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = internships.findIndex(
        internship => internship.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Internship not found"
        });
    }

    const deletedInternship = internships.splice(index, 1);

    res.json({
        message: "Internship deleted successfully",
        internship: deletedInternship[0]
    });

});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});