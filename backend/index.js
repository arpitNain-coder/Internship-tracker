const express = require("express");
const connectDB = require("./config/db");
const internshipRoutes = require("./routes/internshipRoutes");
require("dotenv").config({ path: __dirname + "/.env" });
connectDB();
require("./scheduler/cron");

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Lost from Light")
})

app.use("/internships", internshipRoutes);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});