"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllFeeds = exports.FEEDS_COUNT = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const parser = new rss_parser_1.default({
    timeout: 10000, // 10 seconds timeout for slow feeds
});
const FEEDS = [
    // USA
    { name: 'Reuters (US)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-US&gl=US&ceid=US:en', country: 'USA', region: 'Americas', language: 'English' },
    { name: 'Associated Press', url: 'https://news.google.com/rss/search?q=when:24h+source:Associated+Press&hl=en-US&gl=US&ceid=US:en', country: 'USA', region: 'Americas', language: 'English' },
    // China
    { name: 'Xinhua', url: 'https://english.news.cn/rss/rss.xml', country: 'China', region: 'Asia-Pacific', language: 'English' },
    { name: 'CGTN', url: 'https://www.cgtn.com/rss/world.xml', country: 'China', region: 'Asia-Pacific', language: 'English' },
    // UK
    { name: 'BBC News', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', country: 'UK', region: 'Europe', language: 'English' },
    { name: 'Reuters (UK)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-GB&gl=GB&ceid=GB:en', country: 'UK', region: 'Europe', language: 'English' },
    // Russia
    { name: 'TASS', url: 'https://tass.com/rss/v2.xml', country: 'Russia', region: 'Europe', language: 'English' },
    { name: 'RT', url: 'https://www.rt.com/rss/', country: 'Russia', region: 'Europe', language: 'English' },
    // Australia
    { name: 'ABC News Australia', url: 'https://www.abc.net.au/news/feed/2942460/rss.xml', country: 'Australia', region: 'Asia-Pacific', language: 'English' },
    { name: 'Reuters (Australia)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-AU&gl=AU&ceid=AU:en', country: 'Australia', region: 'Asia-Pacific', language: 'English' },
    // New Zealand
    { name: 'RNZ', url: 'https://www.rnz.co.nz/rss/world.xml', country: 'New Zealand', region: 'Asia-Pacific', language: 'English' },
    { name: 'New Zealand Herald', url: 'http://rss.nzherald.co.nz/rss/xml/nzhtsrsscid_000000100.xml', country: 'New Zealand', region: 'Asia-Pacific', language: 'English' },
    // South Africa
    { name: 'Reuters (Africa)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-ZA&gl=ZA&ceid=ZA:en', country: 'South Africa', region: 'Africa', language: 'English' },
    { name: 'News24', url: 'http://feeds.news24.com/articles/news24/TopStories/rss', country: 'South Africa', region: 'Africa', language: 'English' },
    // Ethiopia
    { name: 'ENA', url: 'https://www.ena.et/en/?feed=rss2', country: 'Ethiopia', region: 'Africa', language: 'English' },
    { name: 'Addis Standard', url: 'https://addisstandard.com/feed/', country: 'Ethiopia', region: 'Africa', language: 'English' },
    // Qatar
    { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', country: 'Qatar', region: 'Middle East', language: 'English' },
    { name: 'Gulf Times', url: 'https://www.gulf-times.com/rss/category/1/rss', country: 'Qatar', region: 'Middle East', language: 'English' },
    // Mexico
    { name: 'Reuters (Mexico)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=es-MX&gl=MX&ceid=MX:es', country: 'Mexico', region: 'Americas', language: 'Spanish' },
    { name: 'El Universal', url: 'https://www.eluniversal.com.mx/rss/mundo.xml', country: 'Mexico', region: 'Americas', language: 'Spanish' },
    // France
    { name: 'AFP', url: 'https://news.google.com/rss/search?q=when:24h+source:AFP&hl=en-US&gl=US&ceid=US:en', country: 'France', region: 'Europe', language: 'English' },
    { name: 'France 24', url: 'https://www.france24.com/en/rss', country: 'France', region: 'Europe', language: 'English' },
    // Nigeria
    { name: 'Reuters (Nigeria)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters+Nigeria&hl=en-NG&gl=NG&ceid=NG:en', country: 'Nigeria', region: 'Africa', language: 'English' },
    { name: 'Premium Times', url: 'https://www.premiumtimesng.com/feed', country: 'Nigeria', region: 'Africa', language: 'English' },
    // Brazil
    { name: 'Reuters (Brazil)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=pt-BR&gl=BR&ceid=BR:pt', country: 'Brazil', region: 'Americas', language: 'Portuguese' },
    { name: 'Folha de S.Paulo', url: 'https://feeds.folha.uol.com.br/mundo/rss091.xml', country: 'Brazil', region: 'Americas', language: 'Portuguese' },
    // Turkey
    { name: 'Anadolu Agency', url: 'https://www.aa.com.tr/en/rss/default?cat=general', country: 'Turkey', region: 'Middle East', language: 'English' },
    { name: 'TRT World', url: 'https://www.trtworld.com/rss', country: 'Turkey', region: 'Middle East', language: 'English' },
    // Indonesia
    { name: 'Antara News', url: 'https://en.antaranews.com/rss/latest-news.xml', country: 'Indonesia', region: 'Asia-Pacific', language: 'English' },
    { name: 'Jakarta Post', url: 'https://www.thejakartapost.com/rss', country: 'Indonesia', region: 'Asia-Pacific', language: 'English' },
    // India
    { name: 'Reuters (India)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-IN&gl=IN&ceid=IN:en', country: 'India', region: 'Asia-Pacific', language: 'English' },
    { name: 'The Hindu', url: 'https://www.thehindu.com/news/national/feeder/default.rss', country: 'India', region: 'Asia-Pacific', language: 'English' },
    // Pakistan
    { name: 'Dawn', url: 'https://www.dawn.com/feeds/home', country: 'Pakistan', region: 'Asia-Pacific', language: 'English' },
    { name: 'Reuters (Pakistan)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-PK&gl=PK&ceid=PK:en', country: 'Pakistan', region: 'Asia-Pacific', language: 'English' },
    // Israel
    { name: 'Reuters (Middle East)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-IL&gl=IL&ceid=IL:en', country: 'Israel', region: 'Middle East', language: 'English' },
    { name: 'Times of Israel', url: 'https://www.timesofisrael.com/feed/', country: 'Israel', region: 'Middle East', language: 'English' },
    // Iran
    { name: 'IRNA', url: 'https://en.irna.ir/rss', country: 'Iran', region: 'Middle East', language: 'English' },
    { name: 'Press TV', url: 'https://www.presstv.ir/rss', country: 'Iran', region: 'Middle East', language: 'English' }
];
exports.FEEDS_COUNT = FEEDS.length;
const fetchAllFeeds = async () => {
    let successCount = 0;
    let failureCount = 0;
    const feedPromises = FEEDS.map(async (feed) => {
        try {
            const feedData = await parser.parseURL(feed.url);
            successCount++;
            return feedData.items.map(item => ({
                title: item.title || '',
                link: item.link || '',
                content: item.contentSnippet || item.content || '',
                pubDate: item.pubDate || new Date().toISOString(),
                source: feed.name,
                country: feed.country,
                region: feed.region,
                language: feed.language
            }));
        }
        catch (error) {
            console.error(`[ERROR] Failed to fetch ${feed.name} (${feed.country}):`, error instanceof Error ? error.message : error);
            failureCount++;
            return [];
        }
    });
    const results = await Promise.all(feedPromises);
    const allItems = results.flat();
    console.log(`[STATUS] Feed Fetch Complete: ${successCount} Success, ${failureCount} Failed`);
    return allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
};
exports.fetchAllFeeds = fetchAllFeeds;
