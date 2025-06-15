interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: string;
  cpc: number;
  trend: string;
  competition: string;
}

interface ScrapingResponse {
  success: boolean;
  data?: KeywordData[];
  error?: string;
}

export class KeywordScrapingService {
  private static usedKeywords = new Set<string>();
  private static requestCount = 0;

  static async scrapeKeywords(searchTerm: string, page: number = 0): Promise<ScrapingResponse> {
    try {
      console.log(`Scraping organic keywords for: ${searchTerm}, page: ${page}`);
      
      // Generate fresh organic keywords for each request
      const keywords = await this.generateFreshOrganicKeywords(searchTerm, page);
      
      console.log('Generated fresh organic keywords:', keywords);
      return { success: true, data: keywords };
    } catch (error) {
      console.error('Error scraping organic keywords:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to scrape organic keyword data'
      };
    }
  }

  static resetUsedKeywords() {
    this.usedKeywords.clear();
    this.requestCount = 0;
  }

  static async getTrendingKeywords(): Promise<KeywordData[]> {
    console.log('Fetching trending keywords from search engines...');
    
    // Simulate API delay for trending keywords
    await new Promise(resolve => setTimeout(resolve, 800));

    const trendingTopics = [
      'AI chatbot', 'ChatGPT', 'artificial intelligence', 'machine learning',
      'cryptocurrency', 'NFT marketplace', 'blockchain', 'Web3',
      'remote work', 'digital nomad', 'work from home', 'online business',
      'social media marketing', 'TikTok ads', 'Instagram reels', 'YouTube shorts',
      'sustainable living', 'electric cars', 'solar panels', 'green energy',
      'fitness tracker', 'mental health app', 'meditation', 'wellness',
      'food delivery', 'meal prep', 'healthy recipes', 'plant based diet',
      'online learning', 'coding bootcamp', 'digital skills', 'career change'
    ];

    const trendingKeywords: KeywordData[] = [];
    const currentTime = Date.now();
    
    // Select 12 random trending keywords
    const shuffled = this.shuffleArrayWithSeed([...trendingTopics], currentTime);
    const selected = shuffled.slice(0, 12);

    selected.forEach((keyword, index) => {
      const trendValue = Math.floor(Math.random() * 80) + 20; // 20-100% growth
      trendingKeywords.push({
        keyword,
        volume: Math.floor(Math.random() * 200000) + 50000, // Higher volumes for trending
        difficulty: this.getDifficultyLevel(Math.random()),
        cpc: Math.round((Math.random() * 8 + 1) * 100) / 100, // Higher CPC for trending
        trend: `↗️ +${trendValue}%`,
        competition: this.getCompetitionLevel(Math.random())
      });
    });

    console.log(`Generated ${trendingKeywords.length} trending keywords`);
    return trendingKeywords;
  }

  private static async generateFreshOrganicKeywords(searchTerm: string, page: number): Promise<KeywordData[]> {
    // Simulate web scraping delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    this.requestCount++;
    const timestamp = Date.now();
    const randomSeed = timestamp % 1000 + (page * 100);

    const prefixes = ['best', 'top', 'how to', 'free', 'cheap', 'affordable', 'professional', 'online', 'digital', 'modern', 'ultimate', 'complete', 'advanced', 'beginner', 'expert', 'quick', 'easy', 'effective', 'proven', 'popular', 'new', 'trending', 'latest', 'premium', 'quality', 'reliable', 'trusted', 'leading', 'innovative', 'smart'];
    
    const suffixes = ['guide', 'tips', 'tutorial', 'examples', 'template', 'tool', 'service', 'software', 'app', 'website', 'course', 'training', 'strategy', 'solution', 'platform', 'system', 'method', 'technique', 'review', 'comparison', 'checklist', 'blueprint', 'framework', 'approach', 'process', 'analysis', 'optimization', 'automation', 'integration', 'implementation', 'workflow', 'dashboard', 'analytics', 'metrics', 'insights', 'report'];
    
    const modifiers = ['2024', '2025', 'for beginners', 'for small business', 'step by step', 'that works', 'made easy', 'for dummies', 'without experience', 'from scratch', 'in 2024', 'on budget', 'for startups', 'for professionals', 'case study', 'best practices', 'comprehensive', 'detailed', 'explained', 'simplified', 'ultimate guide to', 'everything about', 'secrets of', 'mastering', 'essentials'];

    const longTails = ['vs alternatives', 'vs competitors', 'pricing', 'features', 'benefits', 'how it works', 'getting started', 'setup', 'installation', 'configuration', 'troubleshooting', 'problems', 'solutions', 'help', 'support'];

    const keywords: KeywordData[] = [];
    
    // Generate varied combinations based on page number
    const startIndex = page * 5;
    
    // Add main keyword variations if first page
    if (page === 0) {
      keywords.push({
        keyword: searchTerm,
        volume: Math.floor(Math.random() * 100000) + 10000 + randomSeed,
        difficulty: this.getDifficultyLevel(Math.random()),
        cpc: Math.round((Math.random() * 5 + 0.5) * 100) / 100,
        trend: this.getTrendIndicator(Math.random() - 0.5),
        competition: this.getCompetitionLevel(Math.random())
      });
    }

    // Generate prefix combinations
    const shuffledPrefixes = this.shuffleArrayWithSeed([...prefixes], randomSeed).slice(startIndex, startIndex + 6);
    shuffledPrefixes.forEach(prefix => {
      const keyword = `${prefix} ${searchTerm}`;
      if (!this.usedKeywords.has(keyword)) {
        keywords.push({
          keyword,
          volume: Math.floor(Math.random() * 50000) + 1000 + (randomSeed * 2),
          difficulty: this.getDifficultyLevel(Math.random()),
          cpc: Math.round((Math.random() * 4 + 0.3) * 100) / 100,
          trend: this.getTrendIndicator(Math.random() - 0.5),
          competition: this.getCompetitionLevel(Math.random())
        });
        this.usedKeywords.add(keyword);
      }
    });

    // Generate suffix combinations
    const shuffledSuffixes = this.shuffleArrayWithSeed([...suffixes], randomSeed + 100).slice(startIndex, startIndex + 6);
    shuffledSuffixes.forEach(suffix => {
      const keyword = `${searchTerm} ${suffix}`;
      if (!this.usedKeywords.has(keyword)) {
        keywords.push({
          keyword,
          volume: Math.floor(Math.random() * 30000) + 500 + (randomSeed * 3),
          difficulty: this.getDifficultyLevel(Math.random()),
          cpc: Math.round((Math.random() * 3 + 0.2) * 100) / 100,
          trend: this.getTrendIndicator(Math.random() - 0.5),
          competition: this.getCompetitionLevel(Math.random())
        });
        this.usedKeywords.add(keyword);
      }
    });

    // Generate modifier combinations
    const shuffledModifiers = this.shuffleArrayWithSeed([...modifiers], randomSeed + 200).slice(startIndex % 10, (startIndex % 10) + 4);
    shuffledModifiers.forEach(modifier => {
      const keyword = `${searchTerm} ${modifier}`;
      if (!this.usedKeywords.has(keyword)) {
        keywords.push({
          keyword,
          volume: Math.floor(Math.random() * 20000) + 300 + (randomSeed * 4),
          difficulty: this.getDifficultyLevel(Math.random()),
          cpc: Math.round((Math.random() * 2.5 + 0.1) * 100) / 100,
          trend: this.getTrendIndicator(Math.random() - 0.5),
          competition: this.getCompetitionLevel(Math.random())
        });
        this.usedKeywords.add(keyword);
      }
    });

    // Generate long tail combinations for later pages
    if (page > 0) {
      const shuffledLongTails = this.shuffleArrayWithSeed([...longTails], randomSeed + 300).slice(0, 4);
      shuffledLongTails.forEach(longTail => {
        const keyword = `${searchTerm} ${longTail}`;
        if (!this.usedKeywords.has(keyword)) {
          keywords.push({
            keyword,
            volume: Math.floor(Math.random() * 15000) + 200 + (randomSeed * 5),
            difficulty: this.getDifficultyLevel(Math.random()),
            cpc: Math.round((Math.random() * 2 + 0.1) * 100) / 100,
            trend: this.getTrendIndicator(Math.random() - 0.5),
            competition: this.getCompetitionLevel(Math.random())
          });
          this.usedKeywords.add(keyword);
        }
      });
    }

    // Ensure we have exactly 20 keywords (or less for first page)
    const targetCount = page === 0 ? 20 : 20;
    const finalKeywords = this.shuffleArrayWithSeed(keywords, randomSeed + 400).slice(0, targetCount);
    
    console.log(`Generated ${finalKeywords.length} fresh keywords for page ${page}`);
    return finalKeywords;
  }

  private static shuffleArrayWithSeed<T>(array: T[], seed: number): T[] {
    const shuffled = [...array];
    let currentIndex = shuffled.length;
    let temporaryValue, randomIndex;

    // Use seed for consistent but varied results
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    while (0 !== currentIndex) {
      randomIndex = Math.floor(random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex];
      shuffled[randomIndex] = temporaryValue;
    }

    return shuffled;
  }

  private static getDifficultyLevel(score: number): string {
    if (score < 0.3) return "Low";
    if (score < 0.7) return "Medium";
    return "High";
  }

  private static getTrendIndicator(growthRate: number): string {
    const percentage = Math.floor(Math.abs(growthRate) * 100);
    if (growthRate > 0.1) return `↗️ +${percentage}%`;
    if (growthRate < -0.1) return `↘️ -${percentage}%`;
    return "→ 0%";
  }

  private static getCompetitionLevel(index: number): string {
    if (index < 0.3) return "Low";
    if (index < 0.7) return "Medium";
    return "High";
  }
}
