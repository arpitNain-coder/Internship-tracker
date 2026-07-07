const express = require("express");

const app = express();

const internships = [
    {
        company: "Google",
        title: "SDE Intern",
        location: "Bangalore"
    },
    {
        company: "Microsoft",
        title: "Frontend Intern",
        location: "Hyderabad"
    },
    {
        company: "Adobe",
        title: "Backend Intern",
        location: "Noida"
    }
];

app.get("/", (req, res) => {
    res.json(internships);
});

app.get("/about", (req, res) => {
    res.send("succumbed to madness.")
});

app.get("/internships", (req, res) => {
    res.send("Source of madness")
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});