const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const Internship = require("../models/Internship");




async function scrapeYC() {

    try {
        const response = await axios.get("https://www.ycombinator.com/jobs", {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

        const $ = cheerio.load(response.data);

        const pageDataRaw = $("div[data-page]").attr("data-page");

        if (!pageDataRaw) {
            console.log("Could not find data-page attribute");
            return;
        }

        const pageData = JSON.parse(pageDataRaw);

        const jobPostings = pageData.props.jobPostings;

        console.log(`Found ${jobPostings.length} jobs\n`);

        const jobs = jobPostings.map(job => ({
            title: job.title,
            company: job.companyName,
            location: job.location,
            source:"Y Combinator",
            link: `https://www.ycombinator.com${job.url}`,
        }));

        // jobs.forEach(job => {
        //     console.log("-------------------");
        //     console.log(`${job.title} @ ${job.company}`);
        //     console.log(`Location: ${job.location}`);
        //     console.log(`Salary: ${job.salaryRange || "Not listed"}`);
        //     console.log(`URL: ${job.url}`);
        // });

        await Internship.deleteMany({
            source: "Y Combinator"
        });

        await Internship.insertMany(jobs);

        // Optional: save as JSON for later use
        fs.writeFileSync("yc_jobs.json", JSON.stringify(jobs, null, 2));
        console.log(`\nSaved ${jobs.length} jobs to yc_jobs.json`);

    } catch (err) {
        console.log(err.message);
    }

    
}

module.exports = scrapeYC;