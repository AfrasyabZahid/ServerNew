"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rss_parser_1 = __importDefault(require("rss-parser"));
const parser_1 = require("./parser");
const parser = new rss_parser_1.default({
    timeout: 15000,
    requestOptions: {
        rejectUnauthorized: false,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36' }
    }
});
async function checkAllFeeds() {
    console.log(`\n🔍 DIAGNOSTIC START: Testing all ${parser_1.FEEDS.length} feeds...\n`);
    let successCount = 0;
    let failCount = 0;
    for (const feed of parser_1.FEEDS) {
        process.stdout.write(`Testing [${feed.country}] ${feed.name}... `);
        try {
            const res = await parser.parseURL(feed.url);
            if (res.items.length > 0) {
                console.log(`✅ OK (${res.items.length} signals)`);
                successCount++;
            }
            else {
                console.log(`⚠️  EMPTY (0 signals)`);
                // Empty is technically a success connection-wise, but effectively a failure for news
                successCount++;
            }
        }
        catch (error) {
            console.log(`❌ FAILED`);
            console.log(`   Reason: ${error.message}`);
            failCount++;
        }
    }
    console.log(`\n📊 RESULTS: ${successCount} Working / ${failCount} Failed`);
}
checkAllFeeds();

