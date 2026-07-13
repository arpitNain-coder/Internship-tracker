const cron = require("node-cron");
const scrapeInternships = require("../scrapper/runscraper");

cron.schedule("0 */6 * * *", async () => {
    console.log("🕒 Running scheduled scraper...");

    try {
        await runAllScrappers();
        console.log("✅ Scheduled scraping completed.");
    } catch (err) {
        console.error("❌ Scheduled scraping failed:", err);
    }
});