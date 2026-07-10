    const dns = require("dns");
    dns.setServers(["8.8.8.8", "8.8.4.4"]);

    const mongoose = require("mongoose");

    async function connectDB() {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("✅ MongoDB Connected");
        } catch (err) {
            console.log("❌ Database Connection Failed");
            console.log(err);
            process.exit(1);
        }
    }

    module.exports = connectDB;