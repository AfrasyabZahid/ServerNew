
import crypto from 'crypto';
import { RawNewsItem } from './parser';

export interface IntelligenceSignal {
    id: string;
    source: string;
    sourceUrl: string;
    originalText: string;
    translatedText: string;
    language: string;
    country: string;
    region: string;
    topic: string;
    convergenceScore: number;
    velocityScore: number;
    impactScore: number;
    impactCategory: 'breaking' | 'alert' | 'general';
    isBreaking: boolean;
    isTranslated: boolean;
    confidence: number;
    timestamp: string;
}

// ------------------------------------------------------------------
// CONFIGURATION
// ------------------------------------------------------------------
// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE:
const TRANSLATION_PROXY_URL = "https://script.google.com/macros/s/AKfycbyCj4-N9LXPqUJ5o22utKytLevucg7GvPVMaMqwWBJfBCQYq30GVGO_WRF7vq9T8VaZOw/exec";
// ------------------------------------------------------------------

const REGIONS = ['Americas', 'Europe', 'Asia-Pacific', 'Middle East', 'Africa'];

const COUNTRY_MAP: Record<string, string[]> = {
    // Americas
    'USA': ['USA', 'United States', 'Washington', 'Biden', 'Pentagon', 'Congress', 'White House'],
    'Venezuela': ['Venezuela', 'Caracas', 'Maduro'],
    'Colombia': ['Colombia', 'Bogota', 'Petro'],
    'Brazil': ['Brazil', 'Brasilia', 'Lula'],
    'Mexico': ['Mexico', 'Obrador', 'Morena'],
    'Canada': ['Canada', 'Ottawa', 'Trudeau', 'CBC'],
    'Greenland': ['Greenland', 'Nuuk', 'Denmark', 'Arctic'], // Added Manual Override

    // East Asia & Pacific
    'China': ['China', 'Beijing', 'Xi Jinping', 'Taiwan', 'Shanghai', 'CCP', 'PLA'],
    'Japan': ['Japan', 'Tokyo', 'Kishida'],
    'S. Korea': ['South Korea', 'Seoul', 'Yoon Suk Yeol'],
    'N. Korea': ['North Korea', 'Pyongyang', 'Kim Jong Un'],
    'Australia': ['Australia', 'Canberra', 'Albanese', 'ABC News'],
    'New Zealand': ['New Zealand', 'Wellington', 'Luxon', 'RNZ'],

    // Middle East
    'Israel': ['Israel', 'Tel Aviv', 'Netanyahu', 'Gaza', 'IDF', 'Hamas'],
    'Iran': ['Iran', 'Tehran', 'Khamenei', 'Raisi'],
    'Saudi Arabia': ['Saudi Arabia', 'Riyadh', 'MBS', 'Bin Salman'],
    'Turkey': ['Turkey', 'Ankara', 'Erdogan'],
    'Egypt': ['Egypt', 'Cairo', 'Al-Sisi'],
    'Qatar': ['Qatar', 'Doha', 'Al Jazeera'],

    // Europe
    'Russia': ['Russia', 'Moscow', 'Putin', 'Kremlin', 'Wagner'],
    'Ukraine': ['Ukraine', 'Kyiv', 'Zelensky'],
    'UK': ['UK', 'United Kingdom', 'London', 'Downing Street', 'Sunak'],
    'Germany': ['Germany', 'Berlin', 'Scholz'],
    'France': ['France', 'Paris', 'Macron'],

    // Africa
    'Nigeria': ['Nigeria', 'Abuja', 'Tinubu'],
    'S. Africa': ['South Africa', 'Pretoria', 'Ramaphosa'],
    'Ethiopia': ['Ethiopia', 'Addis Ababa', 'Abiy Ahmed'],

    // South Asia
    'India': ['India', 'New Delhi', 'Modi'],
    'Pakistan': ['Pakistan', 'Islamabad', 'Sharif', 'Dawn']
};

const ALERT_KEYWORDS = {
    EXTREME: ['war', 'attack', 'explosion', 'tsunami', 'earthquake', 'terror', 'bombing', 'siege', 'invasion', 'airstrike', 'genocide', 'annexation', 'massacre'],
    CRITICAL: ['nuclear', 'missile', 'coup', 'assassination', 'cyber attack', 'blackout', 'mobilization', 'martial law', 'threaten', 'threatens', 'threatening', 'missiles', 'warfare'],
    HIGH: ['sanctions', 'embargo', 'ultimatum', 'deployment', 'skirmish', 'emergency', 'casualty', 'hostage', 'sovereignty', 'territorial', 'military', 'troops', 'conflict'],
    MEDIUM: ['summit', 'treaty', 'alliance', 'agreement', 'protest', 'unrest', 'diplomatic row', 'scandal', 'visit', 'talks', 'delegation', 'lawmakers', 'senate', 'parliament']
};

export const processNewsItem = async (item: RawNewsItem): Promise<IntelligenceSignal> => {
    const title = item.title;
    const content = item.content;
    const text = (title + ' ' + content).toLowerCase();
    const titleLower = title.toLowerCase();

    // Stable ID based on the news link
    const id = `LOC-${crypto.createHash('md5').update(item.link).digest('hex').substring(0, 8).toUpperCase()}`;

    // Translation logic
    let translatedTitle = title;
    let isTranslated = false;
    let language = item.language;

    if (language !== 'English') {
        try {
            if (TRANSLATION_PROXY_URL && TRANSLATION_PROXY_URL.startsWith('http')) {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 sec timeout

                const response = await fetch(TRANSLATION_PROXY_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: title, source: '', target: 'en' }),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (response.ok) {
                    const data: any = await response.json();
                    if (data && data.translation) {
                        translatedTitle = data.translation;
                        isTranslated = true;
                    }
                }
            } else {
                // Fallback or warning if no URL configured
                // console.warn('No Translation Proxy URL configured. Skipping translation.');
            }
        } catch (err) {
            console.error(`Translation Proxy failed for: ${title}`, err);
            translatedTitle = title;
        }
    }

    // --- REFINED AI IMPACT METHODOLOGY ---
    let impactScore = 0.05; // Base 5% impact for any global news signal
    const translatedLower = translatedTitle.toLowerCase();

    // 1. Title Priority Scanning (Double Weight - Scan Translated Text)
    ALERT_KEYWORDS.EXTREME.forEach(kw => { if (translatedLower.includes(kw)) impactScore += 0.8; });
    ALERT_KEYWORDS.CRITICAL.forEach(kw => { if (translatedLower.includes(kw)) impactScore += 0.5; });
    ALERT_KEYWORDS.HIGH.forEach(kw => { if (translatedLower.includes(kw)) impactScore += 0.3; });
    ALERT_KEYWORDS.MEDIUM.forEach(kw => { if (translatedLower.includes(kw)) impactScore += 0.15; });

    // 2. Content Secondary Scanning (Single Weight - Scan Original Content)
    // Note: Keywords are in English, if content is not, this might miss unless translated.
    // For now, we prioritize the Title which IS translated.
    ALERT_KEYWORDS.EXTREME.forEach(kw => { if (!translatedLower.includes(kw) && text.includes(kw)) impactScore += 0.4; });
    ALERT_KEYWORDS.CRITICAL.forEach(kw => { if (!translatedLower.includes(kw) && text.includes(kw)) impactScore += 0.25; });
    ALERT_KEYWORDS.HIGH.forEach(kw => { if (!translatedLower.includes(kw) && text.includes(kw)) impactScore += 0.15; });
    ALERT_KEYWORDS.MEDIUM.forEach(kw => { if (!translatedLower.includes(kw) && text.includes(kw)) impactScore += 0.05; });

    // 3. Multipliers & Context
    if (translatedTitle.includes('URGENT') || translatedTitle.includes('LIVE') || translatedTitle.includes('BREAKING')) impactScore += 0.35;
    if (translatedTitle.includes('!') || (translatedTitle.length > 20 && translatedTitle.toUpperCase() === translatedTitle)) impactScore += 0.1;

    // Geographical Scale Multiplier
    const globalTerms = ['world', 'global', 'un', 'international', 'nato', 'brics'];
    globalTerms.forEach(term => { if (text.includes(term)) impactScore += 0.05; });

    impactScore = Math.min(impactScore, 0.99); // Cap just below 100% for realism

    // Topic & Relevance
    const policyKeywords = ['diplomacy', 'foreign policy', 'geopolitical', 'nato', 'un', 'asean', 'brics', 'sovereignty', 'territory'];
    const policyCount = policyKeywords.filter(kw => text.includes(kw)).length;
    const convergenceScore = Math.min(policyCount / 2, 1.0);

    // Classify impact
    let impactCategory: 'breaking' | 'alert' | 'general' = 'general';
    if (impactScore >= 0.75) impactCategory = 'breaking';
    else if (impactScore >= 0.35) impactCategory = 'alert';

    const isBreaking = impactCategory === 'breaking';

    // AI CLASSIFICATION: Re-validate Country based on Content
    let finalCountry = item.country;
    const manualOverrides: Record<string, string> = {
        'Prince Harry': 'UK', 'London': 'UK', 'King Charles': 'UK', 'Rishi Sunak': 'UK',
        'Biden': 'USA', 'Trump': 'USA', 'White House': 'USA', 'Pentagon': 'USA',
        'Putin': 'Russia', 'Moscow': 'Russia', 'Kremlin': 'Russia',
        'Netanyahu': 'Israel', 'Gaza': 'Israel', 'IDF': 'Israel',
        'Zelensky': 'Ukraine', 'Kyiv': 'Ukraine',
        'Macron': 'France', 'Paris': 'France', 'Greenland': 'USA'
    };

    for (const [key, country] of Object.entries(manualOverrides)) {
        if (text.includes(key.toLowerCase())) {
            finalCountry = country;
            break;
        }
    }

    return {
        id,
        source: item.source,
        sourceUrl: item.link,
        originalText: item.content,
        translatedText: translatedTitle,
        language: language,
        country: finalCountry,
        region: item.region,
        topic: (convergenceScore > 0.4 || impactScore > 0.5) ? 'Foreign Policy' : 'General',
        convergenceScore,
        velocityScore: Math.random(),
        impactScore,
        impactCategory,
        isBreaking,
        isTranslated,
        confidence: 0.95,
        timestamp: item.pubDate
    };
};
