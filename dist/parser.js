"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllFeeds = exports.FEEDS_COUNT = exports.FEEDS = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const parser = new rss_parser_1.default({
    timeout: 10000,
    requestOptions: {
        rejectUnauthorized: false,
        timeout: 10000,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    }
});
exports.FEEDS = [
    // =========================================================================
    // FINAL DEFINITIVE SOURCE LIST (Emergency Repair: KEYWORD SEARCH for DEAD ZONES)
    // =========================================================================
    // --- Australia (English - OK) ---
    { name: 'ABC News', url: 'https://news.google.com/rss/search?q=site:abc.net.au+when:24h&hl=en-AU&gl=AU&ceid=AU:en', country: 'Australia', region: 'Oceania', language: 'English' },
    { name: 'news.com.au', url: 'https://news.google.com/rss/search?q=site:news.com.au+when:24h&hl=en-AU&gl=AU&ceid=AU:en', country: 'Australia', region: 'Oceania', language: 'English' },
    { name: 'Sydney Morning Herald', url: 'https://news.google.com/rss/search?q=site:smh.com.au+when:24h&hl=en-AU&gl=AU&ceid=AU:en', country: 'Australia', region: 'Oceania', language: 'English' },
    // --- Brazil (Portuguese - OK) ---
    { name: 'Folha de S.Paulo', url: 'https://news.google.com/rss/search?q=site:folha.uol.com.br+when:7d&hl=pt-BR&gl=BR&ceid=BR:pt', country: 'Brazil', region: 'Americas', language: 'Portuguese' },
    { name: 'O Globo', url: 'https://news.google.com/rss/search?q=site:oglobo.globo.com+when:7d&hl=pt-BR&gl=BR&ceid=BR:pt', country: 'Brazil', region: 'Americas', language: 'Portuguese' },
    { name: 'G1', url: 'https://news.google.com/rss/search?q=site:g1.globo.com+when:7d&hl=pt-BR&gl=BR&ceid=BR:pt', country: 'Brazil', region: 'Americas', language: 'Portuguese' },
    // --- China (English - OK) ---
    { name: 'Xinhua News', url: 'https://news.google.com/rss/search?q=site:xinhuanet.com/english+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'China', region: 'Asia-Pacific', language: 'English' },
    { name: 'People’s Daily', url: 'https://news.google.com/rss/search?q=site:en.people.cn+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'China', region: 'Asia-Pacific', language: 'English' },
    { name: 'China Daily', url: 'https://news.google.com/rss/search?q=site:chinadaily.com.cn+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'China', region: 'Asia-Pacific', language: 'English' },
    // --- Ethiopia (SWITCHED TO KEYWORD SEARCH) ---
    { name: 'Addis Standard', url: 'https://news.google.com/rss/search?q="Addis Standard"+when:30d&hl=en-US&gl=US&ceid=US:en', country: 'Ethiopia', region: 'Africa', language: 'English' },
    { name: 'The Reporter', url: 'https://news.google.com/rss/search?q="The Reporter Ethiopia"+when:30d&hl=en-US&gl=US&ceid=US:en', country: 'Ethiopia', region: 'Africa', language: 'English' },
    { name: 'Capital Ethiopia', url: 'https://news.google.com/rss/search?q="Capital Ethiopia"+when:30d&hl=en-US&gl=US&ceid=US:en', country: 'Ethiopia', region: 'Africa', language: 'English' },
    { name: 'ENA', url: 'https://news.google.com/rss/search?q="Ethiopian News Agency"+when:30d&hl=en-US&gl=US&ceid=US:en', country: 'Ethiopia', region: 'Africa', language: 'English' },
    { name: 'ZeHabesha', url: 'https://news.google.com/rss/search?q="ZeHabesha"+when:30d&hl=en-US&gl=US&ceid=US:en', country: 'Ethiopia', region: 'Africa', language: 'English' },
    { name: 'VOA Amharic', url: 'https://news.google.com/rss/search?q="VOA Amharic"+when:30d&hl=am&gl=ET&ceid=ET:am', country: 'Ethiopia', region: 'Africa', language: 'Amharic' },
    // --- ETHIOPIA (Broad Fallback) ---
    { name: 'Ethiopia General', url: 'https://news.google.com/rss/search?q=Ethiopia+Abiy+when:7d&hl=en-US&gl=US&ceid=US:en', country: 'Ethiopia', region: 'Africa', language: 'English' },
    // --- France (Native Site Search - OK) ---
    { name: 'Le Monde', url: 'https://news.google.com/rss/search?q=site:lemonde.fr+when:7d&hl=fr&gl=FR&ceid=FR:fr', country: 'France', region: 'Europe', language: 'French' },
    { name: 'Le Figaro', url: 'https://news.google.com/rss/search?q=site:lefigaro.fr+when:7d&hl=fr&gl=FR&ceid=FR:fr', country: 'France', region: 'Europe', language: 'French' },
    { name: 'France 24', url: 'https://news.google.com/rss/search?q=site:france24.com+when:7d&hl=fr&gl=FR&ceid=FR:fr', country: 'France', region: 'Europe', language: 'French' },
    // --- India (English - OK) ---
    { name: 'Times of India', url: 'https://news.google.com/rss/search?q=site:timesofindia.indiatimes.com+when:24h&hl=en-IN&gl=IN&ceid=IN:en', country: 'India', region: 'Asia-Pacific', language: 'English' },
    { name: 'NDTV', url: 'https://news.google.com/rss/search?q=site:ndtv.com+when:24h&hl=en-IN&gl=IN&ceid=IN:en', country: 'India', region: 'Asia-Pacific', language: 'English' },
    // --- Indonesia (Native Site Search - OK) ---
    { name: 'Kompas', url: 'https://news.google.com/rss/search?q=site:kompas.com+when:30d&hl=id-ID&gl=ID&ceid=ID:id', country: 'Indonesia', region: 'Asia-Pacific', language: 'Indonesian' },
    { name: 'Detik', url: 'https://news.google.com/rss/search?q=site:detik.com+when:30d&hl=id-ID&gl=ID&ceid=ID:id', country: 'Indonesia', region: 'Asia-Pacific', language: 'Indonesian' },
    { name: 'Jakarta Post', url: 'https://news.google.com/rss/search?q="Jakarta Post"+when:30d&hl=en-US&gl=US&ceid=US:en', country: 'Indonesia', region: 'Asia-Pacific', language: 'English' }, // Keyword for Eng
    // --- Iran (Aggressive Fallback) ---
    { name: 'IRNA', url: 'https://news.google.com/rss/search?q="IRNA"&hl=en-US&gl=US&ceid=US:en', country: 'Iran', region: 'Middle East', language: 'English' },
    { name: 'Fars News', url: 'https://news.google.com/rss/search?q="Fars News"&hl=en-US&gl=US&ceid=US:en', country: 'Iran', region: 'Middle East', language: 'English' },
    { name: 'Tasnim News', url: 'https://news.google.com/rss/search?q="Tasnim News"&hl=en-US&gl=US&ceid=US:en', country: 'Iran', region: 'Middle East', language: 'English' },
    { name: 'Al-Alam', url: 'https://news.google.com/rss/search?q="Al-Alam"&hl=en-US&gl=US&ceid=US:en', country: 'Iran', region: 'Middle East', language: 'English' },
    { name: 'Tehran Times', url: 'https://news.google.com/rss/search?q="Tehran Times"&hl=en-US&gl=US&ceid=US:en', country: 'Iran', region: 'Middle East', language: 'English' },
    { name: 'Iran Daily', url: 'https://news.google.com/rss/search?q="Iran Daily"&hl=en-US&gl=US&ceid=US:en', country: 'Iran', region: 'Middle East', language: 'English' },
    { name: 'Iran General', url: 'https://news.google.com/rss/search?q=Iran+Tehran&hl=en-US&gl=US&ceid=US:en', country: 'Iran', region: 'Middle East', language: 'English' },
    // --- Israel (English - OK) ---
    { name: 'Ynet', url: 'https://news.google.com/rss/search?q=site:ynetnews.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Israel', region: 'Middle East', language: 'English' },
    { name: 'Haaretz', url: 'https://news.google.com/rss/search?q=site:haaretz.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Israel', region: 'Middle East', language: 'English' },
    { name: 'Jerusalem Post', url: 'https://news.google.com/rss/search?q=site:jpost.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Israel', region: 'Middle East', language: 'English' },
    // --- Mexico (Spanish - OK) ---
    { name: 'El Universal', url: 'https://news.google.com/rss/search?q=site:eluniversal.com.mx+when:7d&hl=es-MX&gl=MX&ceid=MX:es', country: 'Mexico', region: 'Americas', language: 'Spanish' },
    { name: 'Milenio', url: 'https://news.google.com/rss/search?q=site:milenio.com+when:7d&hl=es-MX&gl=MX&ceid=MX:es', country: 'Mexico', region: 'Americas', language: 'Spanish' },
    // --- New Zealand (SWITCHED TO KEYWORD SEARCH) ---
    { name: 'NZ Herald', url: 'https://news.google.com/rss/search?q="NZ Herald"+when:30d&hl=en-NZ&gl=NZ&ceid=NZ:en', country: 'New Zealand', region: 'Oceania', language: 'English' },
    { name: 'Stuff', url: 'https://news.google.com/rss/search?q="Stuff.co.nz"+when:30d&hl=en-NZ&gl=NZ&ceid=NZ:en', country: 'New Zealand', region: 'Oceania', language: 'English' },
    { name: 'RNZ', url: 'https://news.google.com/rss/search?q="Radio New Zealand"+when:30d&hl=en-NZ&gl=NZ&ceid=NZ:en', country: 'New Zealand', region: 'Oceania', language: 'English' },
    // --- Nigeria (Aggressive Fallback) ---
    { name: 'Punch', url: 'https://news.google.com/rss/search?q="Punch Nigeria"&hl=en-NG&gl=NG&ceid=NG:en', country: 'Nigeria', region: 'Africa', language: 'English' },
    { name: 'The Guardian Nigeria', url: 'https://news.google.com/rss/search?q="Guardian Nigeria"&hl=en-NG&gl=NG&ceid=NG:en', country: 'Nigeria', region: 'Africa', language: 'English' },
    { name: 'Vanguard', url: 'https://news.google.com/rss/search?q="Vanguard Nigeria"&hl=en-NG&gl=NG&ceid=NG:en', country: 'Nigeria', region: 'Africa', language: 'English' },
    { name: 'Nigeria General', url: 'https://news.google.com/rss/search?q=Nigeria+Tinubu&hl=en-NG&gl=NG&ceid=NG:en', country: 'Nigeria', region: 'Africa', language: 'English' },
    // --- Pakistan (English - OK) ---
    { name: 'Dawn', url: 'https://news.google.com/rss/search?q=site:dawn.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Pakistan', region: 'Asia-Pacific', language: 'English' },
    { name: 'The News International', url: 'https://news.google.com/rss/search?q=site:thenews.com.pk+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Pakistan', region: 'Asia-Pacific', language: 'English' },
    // --- Qatar (Broad & Aggressive) ---
    { name: 'Al Jazeera', url: 'https://news.google.com/rss/search?q="Al Jazeera"+when:7d&hl=en-US&gl=US&ceid=US:en', country: 'Qatar', region: 'Middle East', language: 'English' },
    { name: 'Gulf Times', url: 'https://news.google.com/rss/search?q="Gulf Times"+when:30d&hl=en-US&gl=US&ceid=US:en', country: 'Qatar', region: 'Middle East', language: 'English' },
    { name: 'Qatar General', url: 'https://news.google.com/rss/search?q=Qatar+Doha&hl=en-US&gl=US&ceid=US:en', country: 'Qatar', region: 'Middle East', language: 'English' }, // NO TIME LIMIT
    { name: 'Qatar News', url: 'https://news.google.com/rss/search?q="Qatar News Agency"&hl=en-US&gl=US&ceid=US:en', country: 'Qatar', region: 'Middle East', language: 'English' },
    // --- Turkey (Broad & Aggressive) ---
    { name: 'Anadolu Agency', url: 'https://news.google.com/rss/search?q="Anadolu Agency"+when:30d&hl=tr-TR&gl=TR&ceid=TR:tr', country: 'Turkey', region: 'Middle East', language: 'Turkish' },
    { name: 'Turkey General', url: 'https://news.google.com/rss/search?q=Turkey+Erdogan&hl=en-US&gl=US&ceid=US:en', country: 'Turkey', region: 'Middle East', language: 'English' }, // NO TIME LIMIT
    { name: 'Daily Sabah', url: 'https://news.google.com/rss/search?q="Daily Sabah"&hl=en-US&gl=US&ceid=US:en', country: 'Turkey', region: 'Middle East', language: 'English' },
    // --- New Zealand (Broad & Aggressive) ---
    { name: 'NZ Herald', url: 'https://news.google.com/rss/search?q="NZ Herald"&hl=en-NZ&gl=NZ&ceid=NZ:en', country: 'New Zealand', region: 'Oceania', language: 'English' },
    { name: 'Stuff NZ', url: 'https://news.google.com/rss/search?q="Stuff.co.nz"&hl=en-NZ&gl=NZ&ceid=NZ:en', country: 'New Zealand', region: 'Oceania', language: 'English' },
    { name: 'NZ General', url: 'https://news.google.com/rss/search?q="New Zealand"+Wellington&hl=en-NZ&gl=NZ&ceid=NZ:en', country: 'New Zealand', region: 'Oceania', language: 'English' },
    // --- Russia (Native Site Search - OK) ---
    { name: 'RIA Novosti', url: 'https://news.google.com/rss/search?q=site:ria.ru+when:30d&hl=ru&gl=RU&ceid=RU:ru', country: 'Russia', region: 'Europe', language: 'Russian' },
    { name: 'TASS', url: 'https://tass.com/rss/v2.xml', country: 'Russia', region: 'Europe', language: 'English' },
    { name: 'Kommersant', url: 'https://news.google.com/rss/search?q=site:kommersant.ru+when:30d&hl=ru&gl=RU&ceid=RU:ru', country: 'Russia', region: 'Europe', language: 'Russian' },
    { name: 'Meduza', url: 'https://news.google.com/rss/search?q="Meduza"+when:30d&hl=en-US&gl=US&ceid=US:en', country: 'Russia', region: 'Europe', language: 'English' }, // Keyword
    { name: 'Moscow Times', url: 'https://news.google.com/rss/search?q="Moscow Times"+when:30d&hl=en-US&gl=US&ceid=US:en', country: 'Russia', region: 'Europe', language: 'English' }, // Keyword
    { name: 'RT (Russia Today)', url: 'https://news.google.com/rss/search?q="RT news"+when:30d&hl=en-US&gl=US&ceid=US:en', country: 'Russia', region: 'Europe', language: 'English' },
    // --- South Africa (English - OK) ---
    { name: 'News24', url: 'https://news.google.com/rss/search?q=site:news24.com+when:7d&hl=en-ZA&gl=ZA&ceid=ZA:en', country: 'South Africa', region: 'Africa', language: 'English' },
    { name: 'TimesLIVE', url: 'https://news.google.com/rss/search?q=site:timeslive.co.za+when:7d&hl=en-ZA&gl=ZA&ceid=ZA:en', country: 'South Africa', region: 'Africa', language: 'English' },
    // --- Turkey (SWITCHED TO KEYWORD SEARCH due to local routing issues) ---
    { name: 'Hürriyet', url: 'https://news.google.com/rss/search?q="Hurriyet Daily News"+when:7d&hl=en-US&gl=US&ceid=US:en', country: 'Turkey', region: 'Middle East', language: 'English' },
    { name: 'Sabah', url: 'https://news.google.com/rss/search?q="Daily Sabah"+when:7d&hl=en-US&gl=US&ceid=US:en', country: 'Turkey', region: 'Middle East', language: 'English' },
    // --- UK (English - OK) ---
    { name: 'BBC News', url: 'https://news.google.com/rss/search?q=site:bbc.com+when:24h&hl=en-GB&gl=GB&ceid=GB:en', country: 'UK', region: 'Europe', language: 'English' },
    { name: 'The Guardian', url: 'https://news.google.com/rss/search?q=site:theguardian.com+when:24h&hl=en-GB&gl=GB&ceid=GB:en', country: 'UK', region: 'Europe', language: 'English' },
    // --- USA (English - OK) ---
    { name: 'CNN', url: 'https://news.google.com/rss/search?q=site:cnn.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'USA', region: 'Americas', language: 'English' },
    { name: 'The New York Times', url: 'https://news.google.com/rss/search?q=site:nytimes.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'USA', region: 'Americas', language: 'English' },
    { name: 'Washington Post', url: 'https://news.google.com/rss/search?q=site:washingtonpost.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'USA', region: 'Americas', language: 'English' }
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

