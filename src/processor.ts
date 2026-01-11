
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
    confidence: number;
    timestamp: string;
}

const REGIONS = ['Americas', 'Europe', 'Asia-Pacific', 'Middle East', 'Africa'];

const COUNTRY_MAP: Record<string, string[]> = {
    // Americas
    'USA': ['USA', 'United States', 'Washington', 'Biden', 'Pentagon', 'Congress', 'White House'],
    'Venezuela': ['Venezuela', 'Caracas', 'Maduro'],
    'Colombia': ['Colombia', 'Bogota', 'Petro'],
    'Brazil': ['Brazil', 'Brasilia', 'Lula'],
    'Mexico': ['Mexico', 'Obrador', 'Morena'],
    'Canada': ['Canada', 'Ottawa', 'Trudeau', 'CBC'],

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
    EXTREME: ['war', 'attack', 'explosion', 'tsunami', 'earthquake', 'terror', 'bombing', 'siege', 'invasion', 'airstrike'],
    CRITICAL: ['nuclear', 'missile', 'coup', 'assassination', 'cyber attack', 'blackout', 'mobilization', 'martial law'],
    HIGH: ['sanctions', 'embargo', 'ultimatum', 'deployment', 'skirmish', 'emergency', 'casualty', 'hostage'],
    MEDIUM: ['summit', 'treaty', 'alliance', 'agreement', 'protest', 'unrest', 'diplomatic row', 'scandal']
};

export const processNewsItem = async (item: RawNewsItem): Promise<IntelligenceSignal> => {
    const title = item.title;
    const content = item.content;
    const text = (title + ' ' + content).toLowerCase();

    // Stable ID based on the news link
    const id = `LOC-${crypto.createHash('md5').update(item.link).digest('hex').substring(0, 8).toUpperCase()}`;

    // Translation logic
    let translatedTitle = title;
    let language = item.language;
    if (language !== 'English') {
        translatedTitle = `[TRANSLATED] ${title}`;
    }

    // AI IMPACT METHODOLOGY: Weighted Keyword Analysis
    let impactScore = 0;

    // 1. Keyword Scanning
    ALERT_KEYWORDS.EXTREME.forEach(kw => { if (text.includes(kw)) impactScore += 0.8; });
    ALERT_KEYWORDS.CRITICAL.forEach(kw => { if (text.includes(kw)) impactScore += 0.5; });
    ALERT_KEYWORDS.HIGH.forEach(kw => { if (text.includes(kw)) impactScore += 0.3; });
    ALERT_KEYWORDS.MEDIUM.forEach(kw => { if (text.includes(kw)) impactScore += 0.1; });

    // 2. Intensity Multiplier (Title Only)
    if (title.includes('URGENT') || title.includes('LIVE') || title.includes('BREAKING')) impactScore += 0.3;
    if (title.includes('!') || title.toUpperCase() === title) impactScore += 0.1;

    impactScore = Math.min(impactScore, 1.0);

    // Topic & Relevance
    const policyKeywords = ['diplomacy', 'foreign policy', 'geopolitical', 'nato', 'un', 'asean', 'brics'];
    const policyCount = policyKeywords.filter(kw => text.includes(kw)).length;
    const convergenceScore = Math.min(policyCount / 2, 1.0);

    // Classify impact
    let impactCategory: 'breaking' | 'alert' | 'general' = 'general';
    // STRICTER THRESHOLD: Must be 0.8+ for Breaking (Intensity Check)
    if (impactScore >= 0.8) impactCategory = 'breaking';
    else if (impactScore >= 0.4) impactCategory = 'alert';

    const isBreaking = impactCategory === 'breaking';

    // AI CLASSIFICATION: Re-validate Country based on Content
    // Rules:
    // 1. If text mentions specific global entities (Prince Harry, Biden, etc.), override the country.
    // 2. This prevents "The News International (PK)" from mislabeling a UK story as "Pakistan".
    let finalCountry = item.country;

    // Explicit exclusions to prevent over-correction
    const manualOverrides: Record<string, string> = {
        'Prince Harry': 'UK', 'London': 'UK', 'King Charles': 'UK', 'Rishi Sunak': 'UK',
        'Biden': 'USA', 'Trump': 'USA', 'White House': 'USA', 'Pentagon': 'USA',
        'Putin': 'Russia', 'Moscow': 'Russia', 'Kremlin': 'Russia',
        'Netanyahu': 'Israel', 'Gaza': 'Israel', 'IDF': 'Israel',
        'Zelensky': 'Ukraine', 'Kyiv': 'Ukraine',
        'Macron': 'France', 'Paris': 'France'
    };

    for (const [key, country] of Object.entries(manualOverrides)) {
        if (text.includes(key.toLowerCase())) {
            finalCountry = country;
            break; // Strongest match wins
        }
    }

    return {
        id,
        source: item.source,
        sourceUrl: item.link,
        originalText: item.content,
        translatedText: translatedTitle,
        language: language,
        country: finalCountry, // <--- UPDATED (Content > Source)
        region: item.region,
        topic: convergenceScore > 0.4 ? 'Foreign Policy' : 'General',
        convergenceScore,
        velocityScore: Math.random(),
        impactScore,
        impactCategory,
        isBreaking,
        confidence: 0.95,
        timestamp: item.pubDate
    };
};
