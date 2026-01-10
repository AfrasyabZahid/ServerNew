import express from 'express';
import cors from 'cors';
import { fetchAllFeeds, FEEDS_COUNT } from './parser';
import { processNewsItem, IntelligenceSignal } from './processor';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let processedSignals: IntelligenceSignal[] = [];

// Background worker to fetch and process news
const updateNewsBuffer = async () => {
    console.log(`[${new Date().toLocaleTimeString()}] Fetching news from ${FEEDS_COUNT} global sources...`);
    const rawItems = await fetchAllFeeds();
    console.log(`[STATUS] Raw items fetched: ${rawItems.length}`);

    if (rawItems.length === 0) {
        console.warn("[WARN] No raw items fetched. Check feed configurations or network.");
        return;
    }

    const newSignals = await Promise.all(
        rawItems.slice(0, 300).map(item => processNewsItem(item))
    );
    console.log(`[STATUS] Processed new signals: ${newSignals.length}`);

    // Keep unique signals based on ID and normalized title (for cross-source deduplication)
    const merged = [...newSignals, ...processedSignals];

    // Advanced deduplication: By ID (link) AND by normalized Title
    const seenTitles = new Set<string>();
    const seenIds = new Set<string>();

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
    console.log(`Monitoring ${FEEDS_COUNT} RSS feeds for real-time intelligence.`);
});

