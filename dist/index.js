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
    console.log(`[${new Date().toLocaleTimeString()}] Fetching news from ${parser_1.FEEDS_COUNT} global sources...`);
    const rawItems = await (0, parser_1.fetchAllFeeds)();
    console.log(`[STATUS] Raw items fetched: ${rawItems.length}`);
    if (rawItems.length === 0) {
        console.warn("[WARN] No raw items fetched. Check feed configurations or network.");
        return;
    }
    const newSignals = await Promise.all(rawItems.slice(0, 300).map(item => (0, processor_1.processNewsItem)(item)));
    console.log(`[STATUS] Processed new signals: ${newSignals.length}`);
    // Keep unique signals based on ID and normalized title (for cross-source deduplication)
    const merged = [...newSignals, ...processedSignals];
    // Advanced deduplication: By ID (link) AND by normalized Title
    const seenTitles = new Set();
    const seenIds = new Set();
    processedSignals = merged.filter((signal) => {
        const normalizedTitle = signal.translatedText.toLowerCase()
            .replace(/[^a-z0-9]/g, '') // Remove special characters
            .substring(0, 100); // Compare first 100 chars
        if (seenIds.has(signal.id) || seenTitles.has(normalizedTitle)) {
            return false;
        }
        seenIds.add(signal.id);
        seenTitles.add(normalizedTitle);
        return true;
    }).slice(0, 500);
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

