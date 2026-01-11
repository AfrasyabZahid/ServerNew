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

    // FAIR SHARE REGIONAL PROCESSING LOGIC
    const itemsByCountry: Record<string, any[]> = {};
    rawItems.forEach(item => {
        if (!itemsByCountry[item.country]) itemsByCountry[item.country] = [];
        itemsByCountry[item.country].push(item);
    });

    const prioritizedItems: any[] = [];
    const remainingItems: any[] = [];

    // Phase 1: Take up to 40 items from every country to ensure diversity
    Object.values(itemsByCountry).forEach(countryItems => {
        const shuffled = countryItems.sort(() => Math.random() - 0.5);
        prioritizedItems.push(...shuffled.slice(0, 40));
        remainingItems.push(...shuffled.slice(40));
    });

    // Phase 2: Fill the rest of the buffer with remaining items (shuffled)
    const finalRawItems = [
        ...prioritizedItems,
        ...remainingItems.sort(() => Math.random() - 0.5)
    ].slice(0, 2000);

    console.log(`[STATUS] Fair-Share selection complete. Processing ${finalRawItems.length} items.`);

    const newSignals = await Promise.all(
        finalRawItems.map(item => processNewsItem(item))
    );
    console.log(`[STATUS] Processed new signals: ${newSignals.length}`);

    // Keep unique signals based on ID and normalized title (for cross-source deduplication)
    const merged = [...newSignals, ...processedSignals];

    // Advanced deduplication: By ID (link) AND by normalized Title
    const seenTitles = new Set<string>();
    const seenIds = new Set<string>();

    processedSignals = merged.filter((signal) => {
        // More specific normalization to avoid collisions
        const normalizedTitle = signal.translatedText.toLowerCase()
            .replace(/[^a-z0-9]/g, '')
            .substring(0, 150);

        if (seenIds.has(signal.id) || seenTitles.has(normalizedTitle)) {
            return false;
        }

        seenIds.add(signal.id);
        seenTitles.add(normalizedTitle);
        return true;
    }).slice(0, 1500);

    // LOG REGIONAL DIVERSITY STATUS
    const countryStats: Record<string, number> = {};
    processedSignals.forEach(s => {
        countryStats[s.country] = (countryStats[s.country] || 0) + 1;
    });

    console.log(`[STATUS] Regional Diversity Audit (Live Buffer):`);
    Object.entries(countryStats)
        .sort((a, b) => b[1] - a[1])
        .forEach(([c, n]) => console.log(` - ${c.padEnd(15)}: ${n}`));

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





