const axios = require("axios");
const cheerio = require("cheerio");
const Internship = require("../models/Internship");
const BASE_URL = "https://internshala.com";

require("dotenv").config();

const connectDB = require("../config/db");

function firstMatch($, el, selectors) {
    for (const sel of selectors) {
        const found = $(el).find(sel).first();
        if (found.length && found.text().trim()) {
            return found.text().trim();
        }
    }
    return null;
}

async function scrapeInternshala(url = `${BASE_URL}/internships/`) {
    const { data } = await axios.get(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
                "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        },
    });

    const $ = cheerio.load(data);
    const internships = [];

    $("div[internshipid]").each((_, el) => {
        const container = $(el);

        const companyName = firstMatch($, container, [
            "p.company-name",
            ".company_name",
        ]);


        const titleAnchor = container
            .find('a[href*="/internship/detail/"]')
            .first();
        const jobTitle = titleAnchor.text().trim() || null;

        const location = firstMatch($, container, [
            "#location_names",
            ".locations",
            "[id^='location_names']",
        ]);

        const salary = firstMatch($, container, [
            ".stipend",
            "#stipend",
            "[id^='stipend']",
        ]);

        let relativeUrl = container.attr("data-href") || titleAnchor.attr("href");
        const url = relativeUrl
            ? relativeUrl.startsWith("http")
                ? relativeUrl
                : `${BASE_URL}${relativeUrl}`
            : null;

        internships.push({
            companyName,
            jobTitle,
            location,
            salary,
            url,
        });
    });

    return internships;
}

async function saveInternships(internships) {
    for (const internship of internships) {
        try {
            await Internship.updateOne(
                { link: internship.url }, // Prevent duplicates
                {
                    company: internship.companyName || "Unknown",
                    title: internship.jobTitle || "Unknown",
                    location: internship.location || "Not specified",
                    source: "Internshala",
                    link: internship.url,
                },
                {
                    upsert: true,
                }
            );
        } catch (err) {
            console.error(`Error saving ${internship.jobTitle}:`, err.message);
        }
    }

    console.log("Internships saved to MongoDB.");
}

(async () => {
    try {
        // Connect to MongoDB first
        await connectDB();

        // Scrape internships
        const results = await scrapeInternshala();

        console.log(`Found ${results.length} internships`);

        // Save them
        await saveInternships(results);

        console.log("✅ Scraping completed successfully.");

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();

module.exports = { scrapeInternshala };