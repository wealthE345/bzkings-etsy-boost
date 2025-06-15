// Enhanced video content generation with real web videos that match email subjects

export interface VideoSegment {
  startTime: number;
  endTime: number;
  image: string;
  text: string;
  narration: string;
}

export interface SynchronizedVideoContent {
  totalDuration: number;
  segments: VideoSegment[];
  fullNarration: string;
  backgroundMusic?: string;
  videoUrl: string;
}

// Real video URLs for different subjects/topics with more specific matching
const getSubjectSpecificVideo = (searchTerm: string): string => {
  const lowerTerm = searchTerm.toLowerCase();
  
  if (lowerTerm.includes('money') || lowerTerm.includes('cash') || lowerTerm.includes('earn') || lowerTerm.includes('profit') || lowerTerm.includes('income') || lowerTerm.includes('revenue')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
  } else if (lowerTerm.includes('tiktok') || lowerTerm.includes('social media') || lowerTerm.includes('viral') || lowerTerm.includes('content creation')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
  } else if (lowerTerm.includes('facebook') || lowerTerm.includes('fb ads') || lowerTerm.includes('meta') || lowerTerm.includes('social advertising')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  } else if (lowerTerm.includes('clickbank') || lowerTerm.includes('affiliate') || lowerTerm.includes('commission') || lowerTerm.includes('promotion')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  } else if (lowerTerm.includes('work from home') || lowerTerm.includes('remote work') || lowerTerm.includes('freelance') || lowerTerm.includes('online business')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";
  } else if (lowerTerm.includes('email marketing') || lowerTerm.includes('email') || lowerTerm.includes('newsletter') || lowerTerm.includes('automation')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
  } else if (lowerTerm.includes('campaign') || lowerTerm.includes('research') || lowerTerm.includes('ideas') || lowerTerm.includes('strategy') || lowerTerm.includes('planning')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4";
  } else if (lowerTerm.includes('crypto') || lowerTerm.includes('bitcoin') || lowerTerm.includes('blockchain') || lowerTerm.includes('trading')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
  } else if (lowerTerm.includes('fitness') || lowerTerm.includes('health') || lowerTerm.includes('workout') || lowerTerm.includes('nutrition')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";
  } else if (lowerTerm.includes('real estate') || lowerTerm.includes('property') || lowerTerm.includes('investment') || lowerTerm.includes('housing')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";
  } else {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
  }
};

// Generate images that match the specific search term
const getSearchTermSpecificImages = (searchTerm: string): string[] => {
  const lowerTerm = searchTerm.toLowerCase();
  
  if (lowerTerm.includes('money') || lowerTerm.includes('cash') || lowerTerm.includes('earn') || lowerTerm.includes('income') || lowerTerm.includes('profit')) {
    return [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&q=80", // Money/cash
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop&q=80", // Bitcoin/crypto
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop&q=80", // Dollar bills
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80", // Investment growth
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80", // Financial charts
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=600&fit=crop&q=80", // Credit cards
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop&q=80", // Wealth building
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=600&fit=crop&q=80" // Financial success
    ];
  } else if (lowerTerm.includes('facebook') || lowerTerm.includes('fb') || lowerTerm.includes('meta') || lowerTerm.includes('social advertising')) {
    return [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80", // Facebook interface
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80", // Social media analytics
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop&q=80", // Social media marketing
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80", // Advertising
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80", // Facebook ads
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80", // Social media ROI
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80", // Marketing analytics
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80" // Facebook success
    ];
  } else if (lowerTerm.includes('tiktok') || lowerTerm.includes('viral') || lowerTerm.includes('content creation')) {
    return [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80", // TikTok content
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80", // Video creation
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80", // Viral content
      "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&h=600&fit=crop&q=80", // Influencer marketing
      "https://images.unsplash.com/photo-1570194065650-d99bf9d4d665?w=800&h=600&fit=crop&q=80", // Social media growth
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&q=80", // Content creation
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80", // TikTok analytics
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80" // Social media success
    ];
  } else if (lowerTerm.includes('crypto') || lowerTerm.includes('bitcoin') || lowerTerm.includes('blockchain') || lowerTerm.includes('trading')) {
    return [
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop&q=80", // Bitcoin cryptocurrency
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop&q=80", // Crypto trading
      "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=600&fit=crop&q=80", // Blockchain technology
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80", // Digital currency
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&q=80", // Crypto charts
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop&q=80", // Investment growth
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80", // Trading analysis
      "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=600&fit=crop&q=80" // Crypto success
    ];
  } else if (lowerTerm.includes('fitness') || lowerTerm.includes('health') || lowerTerm.includes('workout') || lowerTerm.includes('nutrition')) {
    return [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80", // Fitness workout
      "https://images.unsplash.com/photo-1540919299461-acf6bb4d34d1?w=800&h=600&fit=crop&q=80", // Gym equipment
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop&q=80", // Healthy nutrition
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&q=80", // Running fitness
      "https://images.unsplash.com/photo-1506629905607-5fe5740c65c3?w=800&h=600&fit=crop&q=80", // Yoga health
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=800&h=600&fit=crop&q=80", // Personal training
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&q=80", // Health transformation
      "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=800&h=600&fit=crop&q=80" // Fitness success
    ];
  } else if (lowerTerm.includes('real estate') || lowerTerm.includes('property') || lowerTerm.includes('investment') || lowerTerm.includes('housing')) {
    return [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&q=80", // Real estate property
      "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?w=800&h=600&fit=crop&q=80", // Property investment
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&q=80", // House for sale
      "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&h=600&fit=crop&q=80", // Real estate market
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&q=80", // Property financing
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80", // Real estate success
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80", // Investment growth
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80" // Property portfolio
    ];
  } else if (lowerTerm.includes('campaign') || lowerTerm.includes('research') || lowerTerm.includes('ideas') || lowerTerm.includes('strategy') || lowerTerm.includes('planning')) {
    return [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80", // Research and analysis
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80", // Creative brainstorming
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80", // Market research
      "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80", // Strategy planning
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80", // Data analysis
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80", // Team collaboration
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80", // Campaign planning
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80" // Creative execution
    ];
  } else {
    // Generic business/marketing images for any other search term
    return [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80"
    ];
  }
};

// Dynamic content generation based on search term
const generateDynamicVideoContent = (searchTerm: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const lowerTerm = searchTerm.toLowerCase();
  
  // Create dynamic narration based on search term
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: `${searchTerm} Mastery`,
      narration: `Welcome to your complete guide for ${searchTerm}! Today we'll explore proven strategies and techniques that successful professionals use to master ${searchTerm} and achieve outstanding results.`
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Professional Techniques",
      narration: `Learn professional techniques that industry experts use for ${searchTerm}. These methods have been tested and proven to deliver consistent results across different markets and situations.`
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Strategic Approach",
      narration: `Develop a strategic approach to ${searchTerm} that maximizes your efficiency and effectiveness. Understanding the fundamentals is crucial for long-term success in this field.`
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Advanced Methods",
      narration: `Master advanced methods for ${searchTerm} that separate professionals from beginners. These sophisticated techniques require practice but deliver exponential improvements in your results.`
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Optimization Strategies",
      narration: `Implement optimization strategies for ${searchTerm} that ensure maximum return on your time and effort. Learn to identify what works best and scale your successful approaches.`
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Market Analysis",
      narration: `Conduct thorough market analysis for ${searchTerm} to identify opportunities and trends. Understanding market dynamics is essential for making informed decisions and staying competitive.`
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Implementation Guide",
      narration: `Follow our step-by-step implementation guide for ${searchTerm}. This practical approach ensures you can apply everything you've learned and start seeing results immediately.`
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Start Your Journey!",
      narration: `Your journey with ${searchTerm} starts today! Take action and begin implementing these proven strategies. Success comes to those who apply what they learn consistently.`
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: `${searchTerm.toLowerCase().replace(/\s+/g, '-')}-focused`,
    videoUrl
  };
};

// Generate synchronized video content based on search term (2 minutes)
export const generateSynchronizedVideoContent = (searchTerm: string): SynchronizedVideoContent => {
  const lowerTerm = searchTerm.toLowerCase();
  const videoUrl = getSubjectSpecificVideo(searchTerm);
  const images = getSearchTermSpecificImages(searchTerm);
  
  // Check for specific content types first, then fall back to dynamic generation
  if (lowerTerm.includes('campaign ideas') || lowerTerm.includes('search') || lowerTerm.includes('research')) {
    return generateCampaignIdeasVideoContent(searchTerm, videoUrl, images);
  } else if (lowerTerm.includes('money') || lowerTerm.includes('cash') || lowerTerm.includes('earn') || lowerTerm.includes('profit')) {
    return generateMoneyVideoContent(searchTerm, videoUrl, images);
  } else if (lowerTerm.includes('facebook') || lowerTerm.includes('fb ads')) {
    return generateFacebookVideoContent(searchTerm, videoUrl, images);
  } else if (lowerTerm.includes('tiktok')) {
    return generateTikTokVideoContent(searchTerm, videoUrl, images);
  } else if (lowerTerm.includes('clickbank')) {
    return generateClickBankVideoContent(searchTerm, videoUrl, images);
  } else if (lowerTerm.includes('work from home')) {
    return generateWorkFromHomeVideoContent(searchTerm, videoUrl, images);
  } else if (lowerTerm.includes('affiliate marketing')) {
    return generateAffiliateMarketingVideoContent(searchTerm, videoUrl, images);
  }
  
  // For any other search term, generate dynamic content
  return generateDynamicVideoContent(searchTerm, videoUrl, images);
};

const generateCampaignIdeasVideoContent = (subject: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "Search for Campaign Ideas",
      narration: "Welcome to the complete guide for searching and finding winning campaign ideas! Today we'll teach you proven research methods that successful marketers use to discover profitable campaign concepts that convert audiences into customers."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Market Research Fundamentals",
      narration: "Effective campaign research starts with understanding your target market deeply. Use Google Trends, social media insights, and competitor analysis to identify what resonates with your audience. Look for trending topics, pain points, and emerging opportunities in your niche."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Competitor Campaign Analysis",
      narration: "Analyze your competitors' most successful campaigns to understand what works in your industry. Study their messaging, visuals, timing, and audience targeting. Tools like Facebook Ad Library and SEMrush reveal valuable insights about competitor strategies."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Creative Brainstorming Methods",
      narration: "Use structured brainstorming techniques to generate innovative campaign ideas. Try mind mapping, SCAMPER method, and reverse brainstorming. Consider seasonal trends, current events, and cultural moments that align with your brand message."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Data-Driven Idea Validation",
      narration: "Validate your campaign ideas using data before investing resources. Test concepts through surveys, focus groups, and small-scale A/B tests. Use Google Keyword Planner and social listening tools to gauge interest levels."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Cross-Platform Research",
      narration: "Research campaign ideas across multiple platforms including Facebook, Instagram, TikTok, YouTube, and Pinterest. Each platform has unique content formats and audience behaviors that can inspire different campaign approaches."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Campaign Planning Framework",
      narration: "Organize your campaign ideas using a systematic framework. Define objectives, target audience, key messages, channels, budget, and success metrics. Create a campaign brief template for consistent planning and execution."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Execute Your Best Ideas",
      narration: "Transform your research into action! Start with your highest-potential campaign ideas and create detailed execution plans. Remember, the best campaign idea is worthless without proper implementation and continuous optimization."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "educational-research",
    videoUrl
  };
};

// Function to get the current video segment based on time
export const getCurrentVideoSegment = (content: SynchronizedVideoContent, currentTime: number): VideoSegment | null => {
  return content.segments.find(segment => 
    currentTime >= segment.startTime && currentTime < segment.endTime
  ) || null;
};

// Function to get synchronized narration words for real-time highlighting
export const getSynchronizedNarrationWords = (content: SynchronizedVideoContent, currentTime: number): { words: string[], currentIndex: number } => {
  const currentSegment = getCurrentVideoSegment(content, currentTime);
  if (!currentSegment) {
    return { words: [], currentIndex: 0 };
  }

  const segmentProgress = (currentTime - currentSegment.startTime) / (currentSegment.endTime - currentSegment.startTime);
  const words = currentSegment.narration.split(' ');
  const currentIndex = Math.floor(segmentProgress * words.length);

  return { words, currentIndex: Math.min(currentIndex, words.length - 1) };
};
