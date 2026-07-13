const axios = require("axios");
const fs = require("fs");
const Internship = require("../models/Internship");



async function saveInternships(internships) {
    for (const internship of internships) {
        try {
            await Internship.updateOne(
                { link: internship.url }, 
                {
                    company: internship.companyName || "Unknown",
                    title: internship.jobTitle || "Unknown",
                    location: internship.location || "Not specified",
                    source: "Unstop",
                    link: internship.url,
                },
                {
                    upsert: true,
                }
            );
        } catch (err) {
            console.error(
                `Error saving ${internship.jobTitle}:`,
                err.message
            );
        }
    }

    console.log(`Saved ${internships.length} Unstop internships.`);
}

const BASE_API_URL =
    "https://unstop.com/api/public/opportunity/search-result";

const HEADERS = {
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    Accept: "application/json",
    Referer: "https://unstop.com/internships?oppstatus=open",
};

const MAX_PAGES = 10;
const DELAY_MS = 400; 

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatSalary(jobDetail) {
    if (!jobDetail) return "Not disclosed";
    if (jobDetail.paid_unpaid === "unpaid") return "Unpaid";
    if (jobDetail.not_disclosed) return "Not disclosed";

    const { min_salary, max_salary, pay_in } = jobDetail;
    if (min_salary == null && max_salary == null) return "Not disclosed";
    if (min_salary === max_salary) return `₹${min_salary} /${pay_in}`;
    if (min_salary == null) return `Up to ₹${max_salary} /${pay_in}`;
    if (max_salary == null) return `₹${min_salary}+ /${pay_in}`;
    return `₹${min_salary} - ${max_salary} /${pay_in}`;
}

function formatLocation(item) {
    if (item.region === "online") return "Remote (WFH)";

    const locs = item.jobDetail?.locations?.length
        ? item.jobDetail.locations
        : item.locations?.map((l) => l.city).filter(Boolean);

    if (locs && locs.length) return locs.join(", ");
    return "Not specified";
}

function parseItem(item) {
    return {
        companyName: item.organisation?.name ?? null,
        jobTitle: item.title ?? null,
        location: formatLocation(item),
        salary: formatSalary(item.jobDetail),
        url:
            item.seo_url ??
            (item.public_url ? `https://unstop.com/${item.public_url}` : null),
    };
}

async function fetchPage(page) {
    const { data } = await axios.get(BASE_API_URL, {
        params: { opportunity: "internships", oppstatus: "open", page },
        headers: HEADERS,
    });
    return data.data;
}

async function scrapeAllInternships() {
    const all = [];

    const firstPage = await fetchPage(1);
    all.push(...firstPage.data.map(parseItem));

    const totalPages = Math.min(firstPage.last_page, MAX_PAGES);
    console.log(
        `Total available: ${firstPage.total} internships across ${firstPage.last_page} pages. ` +
            `Fetching ${totalPages} page(s) (MAX_PAGES=${MAX_PAGES}).`
    );

    for (let page = 2; page <= totalPages; page++) {
        await sleep(DELAY_MS);
        const pageData = await fetchPage(page);
        all.push(...pageData.data.map(parseItem));
        console.log(`Fetched page ${page}/${totalPages} (${all.length} so far)`);
    }

    return all;
}

async function runUnstopScraper() {
    try {
        const results = await scrapeAllInternships();

        console.log(`Found ${results.length} internships`);

        await saveInternships(results);

        console.log("✅ Unstop scraping completed.");
    } catch (err) {
        console.error("Unstop scraper failed:", err);
    }
}

module.exports = runUnstopScraper;