"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const parser_1 = require("./parser");
const processor_1 = require("./processor");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let processedSignals = [];
// Background worker to fetch and process news
const updateNewsBuffer = async () => {
    console.log('--- RELOADING WITH 5000 LIMIT ---');
    console.log(`[${new Date().toLocaleTimeString()}] Fetching news from ${parser_1.FEEDS_COUNT} global sources...`);
    const rawItems = await (0, parser_1.fetchAllFeeds)();
    console.log(`[STATUS] Raw items fetched: ${rawItems.length}`);
    if (rawItems.length === 0) {
        console.warn("[WARN] No raw items fetched. Check feed configurations or network.");
        return;
    }
    const newSignals = await Promise.all(rawItems.map(item => (0, processor_1.processNewsItem)(item)) // NO LIMIT: Process everything
    );
    console.log(`[STATUS] Processed new signals: ${newSignals.length}`);
    // Keep unique signals based on ID and normalized title (for cross-source deduplication)
    const merged = [...newSignals, ...processedSignals];
    // Advanced deduplication: By ID (link), Normalized Title, AND Country Quota
    const seenTitles = new Set();
    const seenIds = new Set();
    const countryCounts = {}; // Track items per country
    processedSignals = merged.filter((signal) => {
        const normalizedTitle = signal.translatedText.toLowerCase()
            .replace(/[^a-z0-9]/g, '') // Remove special characters
            .substring(0, 100); // Compare first 100 chars
        // Check Country Quota (Target 170 per country)
        const currentCountryCount = countryCounts[signal.country] || 0;
        // --- MINIMUM THRESHOLD LOGIC (Target 30) ---
        // If a country has < 30 items, we RELAX the deduplication.
        // We only check for exact ID matches, ignoring "similar title" checks.
        // This ensures we squeeze every possible signal out of low-volume sources.
        const isLowVolume = currentCountryCount < 30;
        // Check Duplicates
        // 1. Exact ID Match (Always reject exact duplicates)
        if (seenIds.has(signal.id)) {
            return false;
        }
        // 2. Fuzzy Title Match (Skip this if we are desperate for content)
        if (!isLowVolume && seenTitles.has(normalizedTitle)) {
            return false;
        }
        if (currentCountryCount >= 170) {
            return false; // Skip if quota exceeded to save space for others
        }
        // Approve Signal
        countryCounts[signal.country] = currentCountryCount + 1;
        seenIds.add(signal.id);
        seenTitles.add(normalizedTitle);
        return true;
    }).slice(0, 10000); // Massive buffer to hold 30d history for all countries
    // --- DEBUG: LOG COUNTS PER COUNTRY ---
    const counts = {};
    processedSignals.forEach(s => { counts[s.country] = (counts[s.country] || 0) + 1; });
    console.log('[DEBUG] Final Buffer Counts:', JSON.stringify(counts, null, 2));
    // -------------------------------------
    console.log(`[${new Date().toLocaleTimeString()}] Buffer updated. Total unique signals: ${processedSignals.length}`);
};
// Initial fetch and sequential polling
const runBufferUpdate = async () => {
    await updateNewsBuffer();
    setTimeout(runBufferUpdate, 300000); // Update every 5 minutes after completion
};
runBufferUpdate();
app.get('/api/news', (req, res) => {
    res.json(processedSignals);
});
app.get('/api/news/latest', (req, res) => {
    const latest = processedSignals.length > 0 ? processedSignals[0] : null;
    res.json(latest);
});
app.listen(PORT, () => {
    console.log(`GlobalNews Backend running at port ${PORT}`);
    console.log(`Monitoring ${parser_1.FEEDS_COUNT} RSS feeds for real-time intelligence.`);
});
