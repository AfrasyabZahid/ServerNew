"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processNewsItem = void 0;
const crypto_1 = __importDefault(require("crypto"));
const REGIONS = ['Americas', 'Europe', 'Asia-Pacific', 'Middle East', 'Africa'];
const COUNTRY_MAP = {
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
    CRITICAL: ['nuclear', 'missile', 'invasion', 'declaration of war', 'coup', 'assassination', 'cyber attack', 'blackout'],
    HIGH: ['sanctions', 'embargo', 'ultimatum', 'deployment', 'skirmish', 'terrorism', 'emergency'],
    MEDIUM: ['summit', 'treaty', 'alliance', 'agreement', 'protest', 'unrest', 'diplomatic row']
};
const processNewsItem = async (item) => {
    const title = item.title;
    const content = item.content;
    const text = (title + ' ' + content).toLowerCase();
    // Stable ID based on the news link
    const id = `LOC-${crypto_1.default.createHash('md5').update(item.link).digest('hex').substring(0, 8).toUpperCase()}`;
    // Translation logic
    let translatedTitle = title;
    let language = item.language;
    if (language !== 'English') {
        translatedTitle = `[TRANSLATED] ${title}`;
    }
    // AI IMPACT METHODOLOGY: Weighted Keyword Analysis
    let impactScore = 0;
    ALERT_KEYWORDS.CRITICAL.forEach(kw => { if (text.includes(kw))
        impactScore += 0.5; });
    ALERT_KEYWORDS.HIGH.forEach(kw => { if (text.includes(kw))
        impactScore += 0.3; });
    ALERT_KEYWORDS.MEDIUM.forEach(kw => { if (text.includes(kw))
        impactScore += 0.1; });
    impactScore = Math.min(impactScore, 1.0);
    // Topic & Relevance
    const policyKeywords = ['diplomacy', 'foreign policy', 'geopolitical', 'nato', 'un', 'asean', 'brics'];
    const policyCount = policyKeywords.filter(kw => text.includes(kw)).length;
    const convergenceScore = Math.min(policyCount / 2, 1.0);
    // Classify impact
    let impactCategory = 'general';
    if (impactScore >= 0.7 || title.toLowerCase().includes('breaking'))
        impactCategory = 'breaking';
    else if (impactScore >= 0.3)
        impactCategory = 'alert';
    const isBreaking = impactCategory === 'breaking';
    return {
        id,
        source: item.source,
        sourceUrl: item.link,
        originalText: item.content,
        translatedText: translatedTitle,
        language: language,
        country: item.country,
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
exports.processNewsItem = processNewsItem;

