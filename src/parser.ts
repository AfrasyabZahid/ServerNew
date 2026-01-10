
import Parser from 'rss-parser';

const parser = new Parser({
    timeout: 10000, // 10 seconds timeout for slow feeds
    requestOptions: {
        rejectUnauthorized: false, // Allow self-signed certificates
        timeout: 10000,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    }
});

export interface RawNewsItem {
    title: string;
    link: string;
    content: string;
    pubDate: string;
    source: string;
    country: string;
    region: string;
    language: string;
}

interface FeedConfig {
    name: string;
    url: string;
    country: string;
    region: string;
    language: string;
}

export const FEEDS: FeedConfig[] = [
    // USA
    { name: 'Reuters (US)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-US&gl=US&ceid=US:en', country: 'USA', region: 'Americas', language: 'English' },
    { name: 'Associated Press', url: 'https://news.google.com/rss/search?q=when:24h+source:Associated+Press&hl=en-US&gl=US&ceid=US:en', country: 'USA', region: 'Americas', language: 'English' },

    // China
    { name: 'China Daily', url: 'https://news.google.com/rss/search?q=when:24h+source:China+Daily&hl=en-US&gl=US&ceid=US:en', country: 'China', region: 'Asia-Pacific', language: 'English' },
    { name: 'CGTN', url: 'https://news.google.com/rss/search?q=site:cgtn.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'China', region: 'Asia-Pacific', language: 'English' },

    // UK
    { name: 'BBC News', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', country: 'UK', region: 'Europe', language: 'English' },
    { name: 'Reuters (UK)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-GB&gl=GB&ceid=GB:en', country: 'UK', region: 'Europe', language: 'English' },

    // Russia
    { name: 'TASS', url: 'https://tass.com/rss/v2.xml', country: 'Russia', region: 'Europe', language: 'English' },
    { name: 'RT', url: 'https://www.rt.com/rss/', country: 'Russia', region: 'Europe', language: 'English' },

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

    // Nigeria
    { name: 'Reuters (Nigeria)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters+Nigeria&hl=en-NG&gl=NG&ceid=NG:en', country: 'Nigeria', region: 'Africa', language: 'English' },
    { name: 'Premium Times', url: 'https://www.premiumtimesng.com/feed', country: 'Nigeria', region: 'Africa', language: 'English' },

    // Brazil
    { name: 'Reuters (Brazil)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=pt-BR&gl=BR&ceid=BR:pt', country: 'Brazil', region: 'Americas', language: 'Portuguese' },
    { name: 'Folha de S.Paulo', url: 'https://feeds.folha.uol.com.br/mundo/rss091.xml', country: 'Brazil', region: 'Americas', language: 'Portuguese' },

    // Turkey
    { name: 'Anadolu Agency', url: 'https://news.google.com/rss/search?q=site:aa.com.tr+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Turkey', region: 'Middle East', language: 'English' },
    { name: 'Daily Sabah', url: 'https://news.google.com/rss/search?q=site:dailysabah.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Turkey', region: 'Middle East', language: 'English' },

    // Indonesia
    { name: 'Antara News', url: 'https://news.google.com/rss/search?q=site:antaranews.com+when:24h&hl=en-ID&gl=ID&ceid=ID:en', country: 'Indonesia', region: 'Asia-Pacific', language: 'English' },
    { name: 'Jakarta Post', url: 'https://news.google.com/rss/search?q=site:thejakartapost.com+when:24h&hl=en-ID&gl=ID&ceid=ID:en', country: 'Indonesia', region: 'Asia-Pacific', language: 'English' },

    // India
    { name: 'India News', url: 'https://news.google.com/rss/search?q=India+when:24h&hl=en-IN&gl=IN&ceid=IN:en', country: 'India', region: 'Asia-Pacific', language: 'English' },
    { name: 'NDTV (India)', url: 'https://news.google.com/rss/search?q=site:ndtv.com+when:24h&hl=en-IN&gl=IN&ceid=IN:en', country: 'India', region: 'Asia-Pacific', language: 'English' },
    { name: 'Times of India', url: 'https://news.google.com/rss/search?q=site:timesofindia.indiatimes.com+when:24h&hl=en-IN&gl=IN&ceid=IN:en', country: 'India', region: 'Asia-Pacific', language: 'English' },
    { name: 'Reuters (India)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-IN&gl=IN&ceid=IN:en', country: 'India', region: 'Asia-Pacific', language: 'English' },

    // Pakistan
    { name: 'Dawn', url: 'https://www.dawn.com/feeds/home', country: 'Pakistan', region: 'Asia-Pacific', language: 'English' },
    { name: 'Reuters (Pakistan)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-PK&gl=PK&ceid=PK:en', country: 'Pakistan', region: 'Asia-Pacific', language: 'English' },

    // Japan
    { name: 'Kyodo News', url: 'https://news.google.com/rss/search?q=site:english.kyodonews.net+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Japan', region: 'Asia-Pacific', language: 'English' },
    { name: 'NHK World', url: 'https://www3.nhk.or.jp/rss/news/cat0.xml', country: 'Japan', region: 'Asia-Pacific', language: 'Japanese' },

    // Israel
    { name: 'Reuters (Middle East)', url: 'https://news.google.com/rss/search?q=when:24h+source:Reuters&hl=en-IL&gl=IL&ceid=IL:en', country: 'Israel', region: 'Middle East', language: 'English' },
    { name: 'Jerusalem Post', url: 'https://news.google.com/rss/search?q=site:jpost.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Israel', region: 'Middle East', language: 'English' },
    { name: 'Haaretz', url: 'https://news.google.com/rss/search?q=site:haaretz.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Israel', region: 'Middle East', language: 'English' },

    // Iran
    { name: 'Tehran Times', url: 'https://news.google.com/rss/search?q=site:tehrantimes.com+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Iran', region: 'Middle East', language: 'English' },
    { name: 'Iran News', url: 'https://news.google.com/rss/search?q=Iran+when:24h&hl=en-US&gl=US&ceid=US:en', country: 'Iran', region: 'Middle East', language: 'English' }
];

export const FEEDS_COUNT = FEEDS.length;

export const fetchAllFeeds = async (): Promise<RawNewsItem[]> => {
    const allItems: RawNewsItem[] = [];

    for (const feed of FEEDS) {
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
        } catch (error: any) {
            console.error(`Error fetching ${feed.name} (${feed.url}):`, error?.message || String(error));
            // Continue with other feeds even if one fails
        }
    }

    console.log(`Total items fetched: ${allItems.length}`);
    return allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
};


