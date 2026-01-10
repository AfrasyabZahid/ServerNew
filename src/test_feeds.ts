
import Parser from 'rss-parser';
import { FEEDS } from './parser';

const parser = new Parser({
    timeout: 15000,
    requestOptions: {
        rejectUnauthorized: false,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36' }
    }
});

async function checkAllFeeds() {
    console.log(`\n🔍 DIAGNOSTIC START: Testing all ${FEEDS.length} feeds...\n`);

    let successCount = 0;
    let failCount = 0;

    for (const feed of FEEDS) {
        process.stdout.write(`Testing [${feed.country}] ${feed.name}... `);
        try {
            const res = await parser.parseURL(feed.url);
            if (res.items.length > 0) {
                console.log(`✅ OK (${res.items.length} signals)`);
                successCount++;
            } else {
                console.log(`⚠️  EMPTY (0 signals)`);
                // Empty is technically a success connection-wise, but effectively a failure for news
                successCount++;
            }
        } catch (error: any) {
            console.log(`❌ FAILED`);
            console.log(`   Reason: ${error.message}`);
            failCount++;
        }
    }

    console.log(`\n📊 RESULTS: ${successCount} Working / ${failCount} Failed`);
}

checkAllFeeds();
