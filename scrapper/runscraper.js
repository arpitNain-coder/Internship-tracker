const scrapeYC = require("./ycombinator");
const scrapeInternshala = require("./internshala");
const scrapeUnstop = require("./unstop");
const connectDB = require("../config/db");
require("dotenv").config();

async function runAllScrappers() {
    await connectDB();
    console.log("========== SCRAPING STARTED ==========");

    await scrapeYC();
    await scrapeInternshala();
    await scrapeUnstop();

    console.log("========== SCRAPING FINISHED ==========");
}
runAllScrappers();
module.exports = runAllScrappers;
