"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllFeeds = exports.FEEDS_COUNT = exports.FEEDS = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const parser = new rss_parser_1.default({
    timeout: 10000, // 10 seconds timeout for slow feeds
    requestOptions: {
        rejectUnauthorized: false, // Allow self-signed certificates
        timeout: 10000,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    }
});
exports.FEEDS = [
    // USA
    { name: 'Reuters (US)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-US&gl=US&ceid=US:en', country: 'USA', region: 'Americas', language: 'English' },
    { name: 'Associated Press', url: 'https://news.google.com/rss/search?q=when:24h+source:Associated+Press&hl=en-US&gl=US&ceid=US:en', country: 'USA', region: 'Americas', language: 'English' },
    { name: 'CNN', url: 'http://rss.cnn.com/rss/edition_world.rss', country: 'USA', region: 'Americas', language: 'English' },
    { name: 'NYT (World)', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', country: 'USA', region: 'Americas', language: 'English' },
    { name: 'Washington Post', url: 'https://news.google.com/rss/search?q=when:24h+source:Washington+Post&hl=en-US&gl=US&ceid=US:en', country: 'USA', region: 'Americas', language: 'English' },
    { name: 'Fox News (World)', url: 'http://feeds.foxnews.com/foxnews/world', country: 'USA', region: 'Americas', language: 'English' },
    // China
    { name: 'China Daily', url: 'https://news.google.com/rss/search?q=when:24h+source:China+Daily&hl=en-US&gl=US&ceid=US:en', country: 'China', region: 'Asia-Pacific', language: 'English' },
    { name: 'CGTN', url: 'https://news.google.com/rss/search?q=site:cgtn.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'China', region: 'Asia-Pacific', language: 'English' },
    { name: 'Xinhua', url: 'https://news.google.com/rss/search?q=site:xinhuanet.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'China', region: 'Asia-Pacific', language: 'English' },
    { name: 'Global Times', url: 'https://news.google.com/rss/search?q=site:globaltimes.cn+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'China', region: 'Asia-Pacific', language: 'English' },
    { name: 'SCMP', url: 'https://www.scmp.com/rss/2/feed', country: 'China', region: 'Asia-Pacific', language: 'English' },
    // UK
    { name: 'BBC News', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', country: 'UK', region: 'Europe', language: 'English' },
    { name: 'Reuters (UK)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-GB&gl=GB&ceid=GB:en', country: 'UK', region: 'Europe', language: 'English' },
    { name: 'The Guardian (World)', url: 'https://www.theguardian.com/world/rss', country: 'UK', region: 'Europe', language: 'English' },
    { name: 'The Independent', url: 'https://www.independent.co.uk/news/world/rss', country: 'UK', region: 'Europe', language: 'English' },
    { name: 'The Telegraph', url: 'https://www.telegraph.co.uk/rss.xml', country: 'UK', region: 'Europe', language: 'English' },
    // Russia
    { name: 'TASS', url: 'https://tass.com/rss/v2.xml', country: 'Russia', region: 'Europe', language: 'English' },
    { name: 'RT', url: 'https://www.rt.com/rss/', country: 'Russia', region: 'Europe', language: 'English' },
    { name: 'Sputnik News', url: 'https://news.google.com/rss/search?q=site:sputniknews.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Russia', region: 'Europe', language: 'English' },
    { name: 'Moscow Times', url: 'https://www.themoscowtimes.com/feeds/news', country: 'Russia', region: 'Europe', language: 'English' },
    // Australia
    { name: 'ABC News', url: 'https://news.google.com/rss/search?q=site:abc.net.au+when:24h&hl=en-AU&gl=AU&ceid=AU:en', country: 'Australia', region: 'Oceania', language: 'English' },
    { name: 'Sydney Morning Herald', url: 'https://news.google.com/rss/search?q=site:smh.com.au+when:24h&hl=en-AU&gl=AU&ceid=AU:en', country: 'Australia', region: 'Oceania', language: 'English' },
    { name: '9News', url: 'https://news.google.com/rss/search?q=site:9news.com.au+when:24h&hl=en-AU&gl=AU&ceid=AU:en', country: 'Australia', region: 'Oceania', language: 'English' },
    // New Zealand
    { name: 'RNZ', url: 'https://www.rnz.co.nz/rss/world.xml', country: 'New Zealand', region: 'Oceania', language: 'English' },
    { name: 'NZ Herald', url: 'https://news.google.com/rss/search?q=site:nzherald.co.nz+when:24h&hl=en-NZ&gl=NZ&ceid=NZ:en', country: 'New Zealand', region: 'Oceania', language: 'English' },
    // South Africa
    { name: 'Reuters (Africa)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-ZA&gl=ZA&ceid=ZA:en', country: 'South Africa', region: 'Africa', language: 'English' },
    { name: 'News24', url: 'https://news.google.com/rss/search?q=site:news24.com+when:24h&hl=en-ZA&gl=ZA&ceid=ZA:en', country: 'South Africa', region: 'Africa', language: 'English' },
    // Ethiopia
    { name: 'Ethiopia News', url: 'https://news.google.com/rss/search?q=Ethiopia+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Ethiopia', region: 'Africa', language: 'English' },
    { name: 'Addis Standard', url: 'https://news.google.com/rss/search?q=site:addisstandard.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Ethiopia', region: 'Africa', language: 'English' },
    // Qatar
    { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', country: 'Qatar', region: 'Middle East', language: 'English' },
    { name: 'Gulf Times', url: 'https://news.google.com/rss/search?q=site:gulf-times.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Qatar', region: 'Middle East', language: 'English' },
    // Mexico
    { name: 'Reuters (Mexico)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=es-MX&gl=MX&ceid=MX:es', country: 'Mexico', region: 'Americas', language: 'Spanish' },
    { name: 'El Universal', url: 'https://news.google.com/rss/search?q=site:eluniversal.com.mx+when:24h&hl=es-MX&gl=MX&ceid=MX:es', country: 'Mexico', region: 'Americas', language: 'Spanish' },
    // France
    { name: 'AFP', url: 'https://news.google.com/rss/search?q=when:24h+source:AFP&hl=en-US&gl=US&ceid=US:en', country: 'France', region: 'Europe', language: 'English' },
    { name: 'France 24', url: 'https://www.france24.com/en/rss', country: 'France', region: 'Europe', language: 'English' },
    { name: 'Le Monde (English)', url: 'https://www.lemonde.fr/en/rss/une.xml', country: 'France', region: 'Europe', language: 'English' },
    { name: 'RFI (World)', url: 'https://www.rfi.fr/en/rss', country: 'France', region: 'Europe', language: 'English' },
    // Nigeria
    { name: 'Reuters (Nigeria)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters+Nigeria&hl=en-NG&gl=NG&ceid=NG:en', country: 'Nigeria', region: 'Africa', language: 'English' },
    { name: 'Premium Times', url: 'https://www.premiumtimesng.com/feed', country: 'Nigeria', region: 'Africa', language: 'English' },
    // Brazil - Optimized Volume
    { name: 'UOL Notícias (BR)', url: 'https://noticias.uol.com.br/feed/index.xml', country: 'Brazil', region: 'Americas', language: 'Portuguese' },
    { name: 'Brazil Intel Pulse', url: 'https://news.google.com/rss/search?q=Brazil+geopolitics+OR+security&hl=en-US&gl=US&ceid=US:en', country: 'Brazil', region: 'Americas', language: 'English' },
    { name: 'Folha de S.Paulo', url: 'https://feeds.folha.uol.com.br/mundo/rss091.xml', country: 'Brazil', region: 'Americas', language: 'Portuguese' },
    { name: 'Globo Mundo', url: 'https://g1.globo.com/rss/g1/mundo/', country: 'Brazil', region: 'Americas', language: 'Portuguese' },
    // Indonesia - Optimized Volume
    { name: 'Indonesia News Pulse', url: 'https://news.google.com/rss/search?q=Indonesia+geopolitics+OR+defense&hl=en-US&gl=US&ceid=US:en', country: 'Indonesia', region: 'Asia-Pacific', language: 'English' },
    { name: 'Kompas International', url: 'https://nasional.kompas.com/rss', country: 'Indonesia', region: 'Asia-Pacific', language: 'Indonesian' },
    { name: 'Jakarta Post National', url: 'https://news.google.com/rss/search?q=site:thejakartapost.com&hl=en-US&gl=US&ceid=US:en', country: 'Indonesia', region: 'Asia-Pacific', language: 'English' },
    { name: 'Antara Headline', url: 'https://www.antaranews.com/rss/terkini.xml', country: 'Indonesia', region: 'Asia-Pacific', language: 'Indonesian' },
    // Pakistan - Optimized Volume
    { name: 'Pakistan Intel Search', url: 'https://news.google.com/rss/search?q=Pakistan+geopolitics+OR+military&hl=en-US&gl=US&ceid=US:en', country: 'Pakistan', region: 'Asia-Pacific', language: 'English' },
    { name: 'Dawn Intelligence', url: 'https://news.google.com/rss/search?q=site:dawn.com&hl=en-US&gl=US&ceid=US:en', country: 'Pakistan', region: 'Asia-Pacific', language: 'English' },
    { name: 'The Nation Feed', url: 'https://nation.com.pk/rss/home', country: 'Pakistan', region: 'Asia-Pacific', language: 'English' },
    // India - High Volume
    { name: 'India Global Intel', url: 'https://news.google.com/rss/search?q=India+foreign+policy+OR+security&hl=en-US&gl=US&ceid=US:en', country: 'India', region: 'Asia-Pacific', language: 'English' },
    { name: 'Times of India World', url: 'https://news.google.com/rss/search?q=site:timesofindia.indiatimes.com/world&hl=en-US&gl=US&ceid=US:en', country: 'India', region: 'Asia-Pacific', language: 'English' },
    { name: 'NDTV World', url: 'https://news.google.com/rss/search?q=site:ndtv.com/world-news&hl=en-US&gl=US&ceid=US:en', country: 'India', region: 'Asia-Pacific', language: 'English' },
    // Ethiopia - Optimized Volume
    { name: 'Ethiopia Region Watch', url: 'https://news.google.com/rss/search?q=Ethiopia+OR+Addis+Ababa&hl=en-US&gl=US&ceid=US:en', country: 'Ethiopia', region: 'Africa', language: 'English' },
    { name: 'Ethiopian Monitor Global', url: 'https://news.google.com/rss/search?q=site:ethiopianmonitor.com&hl=en-US&gl=US&ceid=US:en', country: 'Ethiopia', region: 'Africa', language: 'English' },
    // Qatar - High Volume
    { name: 'Qatar Regional Intel', url: 'https://news.google.com/rss/search?q=Qatar+foreign+policy&hl=en-US&gl=US&ceid=US:en', country: 'Qatar', region: 'Middle East', language: 'English' },
    { name: 'Al Jazeera World', url: 'https://www.aljazeera.com/xml/rss/all.xml', country: 'Qatar', region: 'Middle East', language: 'English' },
    // South Africa
    { name: 'South Africa News Search', url: 'https://news.google.com/rss/search?q=South+Africa+geopolitics&hl=en-US&gl=US&ceid=US:en', country: 'South Africa', region: 'Africa', language: 'English' },
    { name: 'News24 Search', url: 'https://news.google.com/rss/search?q=site:news24.com&hl=en-ZA&gl=ZA&ceid=ZA:en', country: 'South Africa', region: 'Africa', language: 'English' },
    // Turkey - Native & Global
    { name: 'Haberturk World', url: 'https://www.haberturk.com/rss/kategori/dunya.xml', country: 'Turkey', region: 'Middle East', language: 'Turkish' },
    { name: 'Turkey Intel Search', url: 'https://news.google.com/rss/search?q=Turkey+geopolitics+OR+defense&hl=en-US&gl=US&ceid=US:en', country: 'Turkey', region: 'Middle East', language: 'English' },
    { name: 'TRT World Feed', url: 'https://www.trtworld.com/rss', country: 'Turkey', region: 'Middle East', language: 'English' },
    // Israel
    { name: 'Jerusalem Post World', url: 'https://www.jpost.com/rss/rssfeeds.aspx?techno=1', country: 'Israel', region: 'Middle East', language: 'English' },
    { name: 'Times of Israel World', url: 'https://www.timesofisrael.com/feed/', country: 'Israel', region: 'Middle East', language: 'English' },
    { name: 'Haaretz World', url: 'https://www.haaretz.com/cmlink/1.4651346', country: 'Israel', region: 'Middle East', language: 'English' },
    // Nigeria
    { name: 'Nigeria Intelligence', url: 'https://news.google.com/rss/search?q=Nigeria+security+OR+geopolitics&hl=en-US&gl=US&ceid=US:en', country: 'Nigeria', region: 'Africa', language: 'English' },
    { name: 'Punch Nigeria RSS', url: 'https://punchng.com/feed/', country: 'Nigeria', region: 'Africa', language: 'English' },
    // Mexico
    { name: 'Mexico Intel Pulse', url: 'https://news.google.com/rss/search?q=Mexico+geopolitics+OR+security&hl=en-US&gl=US&ceid=US:en', country: 'Mexico', region: 'Americas', language: 'English' },
    { name: 'El Universal Search', url: 'https://news.google.com/rss/search?q=site:eluniversal.com.mx&hl=es-MX&gl=MX&ceid=MX:es', country: 'Mexico', region: 'Americas', language: 'Spanish' },
    // Iran
    { name: 'Iran News Search', url: 'https://news.google.com/rss/search?q=Iran+geopolitics+OR+sanctions&hl=en-US&gl=US&ceid=US:en', country: 'Iran', region: 'Middle East', language: 'English' },
    { name: 'Tehran Times Search', url: 'https://news.google.com/rss/search?q=site:tehrantimes.com&hl=en-US&gl=US&ceid=US:en', country: 'Iran', region: 'Middle East', language: 'English' }
];
exports.FEEDS_COUNT = exports.FEEDS.length;
const fetchAllFeeds = async () => {
    const allItems = [];
    for (const feed of exports.FEEDS) {
        try {
            console.log(`Fetching feed: ${feed.name} (${feed.url})`);
            const feedData = await parser.parseURL(feed.url);
            if (!feedData || !feedData.items) {
                console.warn(`No items found in feed: ${feed.name}`);
                continue;
            }
            const items = feedData.items
                .filter(item => item) // Filter out null/undefined items
                .map(item => ({
                title: item.title || 'No title',
                link: item.link || '#',
                content: item.content || item.summary || item.description || '',
                pubDate: item.pubDate || new Date().toISOString(),
                source: feed.name,
                country: feed.country,
                region: feed.region,
                language: feed.language
            }));
            console.log(`Found ${items.length} items in ${feed.name}`);
            allItems.push(...items);
        }
        catch (error) {
            console.error(`Error fetching ${feed.name} (${feed.url}):`, error?.message || String(error));
            // Continue with other feeds even if one fails
        }
    }
    console.log(`Total items fetched: ${allItems.length}`);
    return allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
};
exports.fetchAllFeeds = fetchAllFeeds;
