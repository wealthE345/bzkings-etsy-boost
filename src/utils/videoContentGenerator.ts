// Enhanced video content generation with real web videos that match email subjects

export interface VideoSegment {
  startTime: number;
  endTime: number;
  image: string;
  text: string;
  narration: string;
  videoScript: string; // Added video script that matches narration
}

export interface SynchronizedVideoContent {
  totalDuration: number;
  segments: VideoSegment[];
  fullNarration: string;
  fullVideoScript: string; // Added full video script
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
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7c52f?w=800&h=600&fit=crop&q=80", // Credit cards
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

// Dynamic content generation based on search term with video scripts
const generateDynamicVideoContent = (searchTerm: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const lowerTerm = searchTerm.toLowerCase();
  
  // Create dynamic narration and video script based on search term
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: `${searchTerm} Mastery`,
      narration: `Welcome to your complete guide for ${searchTerm}! Today we'll explore proven strategies and techniques that successful professionals use to master ${searchTerm} and achieve outstanding results.`,
      videoScript: `Show: Professional ${searchTerm} examples, industry leaders, success stories. Cut to: Strategy overview and methodology. Display: ${searchTerm} mastery framework and key concepts.`
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Professional Techniques",
      narration: `Learn professional techniques that industry experts use for ${searchTerm}. These methods have been tested and proven to deliver consistent results across different markets and situations.`,
      videoScript: "Show: Real estate properties, stock market charts, dividend payments. Cut to: Passive income streams visualization. Display: Assets vs liabilities comparison graphics."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Strategic Approach",
      narration: `Develop a strategic approach to ${searchTerm} that maximizes your efficiency and effectiveness. Understanding the fundamentals is crucial for long-term success in this field.`,
      videoScript: "Show: Stock trading platforms, cryptocurrency exchanges, real estate investments. Cut to: Portfolio diversification charts. Display: Compound interest growth animations."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Advanced Methods",
      narration: `Master advanced methods for ${searchTerm} that separate professionals from beginners. These sophisticated techniques require practice but deliver exponential improvements in your results.`,
      videoScript: "Show: High-performing Facebook ad examples, creative variations. Cut to: A/B testing results and conversion rates. Display: Before/after ad performance comparisons."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Optimization Strategies",
      narration: `Implement optimization strategies for ${searchTerm} that ensure maximum return on your time and effort. Learn to identify what works best and scale your successful approaches.`,
      videoScript: "Show: Multiple income sources: business, investments, royalties. Cut to: Income stream diagrams. Display: Risk protection through diversification graphics."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Market Analysis",
      narration: `Conduct thorough market analysis for ${searchTerm} to identify opportunities and trends. Understanding market dynamics is essential for making informed decisions and staying competitive.`,
      videoScript: "Show: Google Trends interface, social media analytics, market research tools. Cut to: Audience analysis and demographic insights. Display: Market data visualization and trend identification."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Implementation Guide",
      narration: `Follow our step-by-step implementation guide for ${searchTerm}. This practical approach ensures you can apply everything you've learned and start seeing results immediately.`,
      videoScript: "Show: Success stories, profitable campaigns, marketing transformations. Cut to: Implementation roadmap and action steps. Display: Call-to-action for immediate implementation."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Start Your Journey!",
      narration: `Your journey with ${searchTerm} starts today! Take action and begin implementing these proven strategies. Success comes to those who apply what they learn consistently.`,
      videoScript: "Show: Financial freedom lifestyle, early retirement, passive income life. Cut to: Success testimonials and transformations. Display: Call-to-action for immediate implementation."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    fullVideoScript: segments.map(s => s.videoScript).join(' '),
    backgroundMusic: `${searchTerm.toLowerCase().replace(/\s+/g, '-')}-focused`,
    videoUrl
  };
};

// Money-specific video content with matching video script
const generateMoneyVideoContent = (searchTerm: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "Financial Success Secrets",
      narration: `Welcome to the ultimate money-making masterclass! Today we'll reveal the exact strategies that millionaires use to build wealth and generate multiple income streams that work around the clock.`,
      videoScript: "Show: Luxury cars, expensive watches, and success symbols. Cut to: Charts showing exponential wealth growth. Display: Dollar signs and money graphics flowing upward."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Wealth Building Fundamentals",
      narration: `Discover the fundamental principles of wealth building that separate the rich from everyone else. Learn how to create passive income streams and build assets that appreciate over time.`,
      videoScript: "Show: Real estate properties, stock market charts, dividend payments. Cut to: Passive income streams visualization. Display: Assets vs liabilities comparison graphics."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Investment Strategies",
      narration: `Master proven investment strategies that compound your wealth exponentially. From stocks and real estate to digital assets, we'll show you how to diversify and maximize returns.`,
      videoScript: "Show: Stock trading platforms, cryptocurrency exchanges, real estate investments. Cut to: Portfolio diversification charts. Display: Compound interest growth animations."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Income Diversification",
      narration: `Learn how to create multiple income streams that protect you from economic uncertainty. Diversification is the key to financial security and accelerated wealth building.`,
      videoScript: "Show: Multiple income sources: business, investments, royalties. Cut to: Income stream diagrams. Display: Risk protection through diversification graphics."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Financial Analytics",
      narration: `Use data and analytics to optimize your financial decisions. Track your progress, identify opportunities, and make informed choices that accelerate your path to financial freedom.`,
      videoScript: "Show: Financial dashboards, analytics tools, performance metrics. Cut to: Data visualization charts. Display: ROI calculations and profit optimization."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Market Opportunities",
      narration: `Identify and capitalize on emerging market opportunities before the masses catch on. Early adopters in trending markets often see the highest returns on investment.`,
      videoScript: "Show: Emerging market trends, cryptocurrency booms, tech innovations. Cut to: Early investment success stories. Display: Market timing and opportunity windows."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Wealth Acceleration",
      narration: `Implement advanced wealth acceleration techniques that fast-track your journey to financial independence. These strategies can compress decades of wealth building into years.`,
      videoScript: "Show: Accelerated growth strategies, leverage techniques, wealth multipliers. Cut to: Before/after financial transformations. Display: Time compression wealth building."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Financial Freedom",
      narration: `Your financial freedom journey starts now! Take action on these proven money-making strategies and join thousands who have already achieved financial independence.`,
      videoScript: "Show: Financial freedom lifestyle, early retirement, passive income life. Cut to: Success testimonials and transformations. Display: Call-to-action for immediate implementation."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    fullVideoScript: segments.map(s => s.videoScript).join(' '),
    backgroundMusic: "money-focused",
    videoUrl
  };
};

// Facebook-specific video content with matching video script
const generateFacebookVideoContent = (searchTerm: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "Facebook Marketing Mastery",
      narration: `Welcome to Facebook Marketing Mastery! Today we'll reveal the exact strategies that top marketers use to dominate Facebook advertising and generate massive ROI from their campaigns.`,
      videoScript: "Show: Facebook Ads Manager interface, successful campaign dashboards. Cut to: ROI statistics and performance metrics. Display: Facebook logo and advertising success graphics."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Advanced Targeting",
      narration: `Master Facebook's powerful targeting capabilities to reach your ideal customers with precision. Learn to use custom audiences, lookalike audiences, and interest targeting effectively.`,
      videoScript: "Show: Facebook audience targeting interface, demographic selection tools. Cut to: Precision targeting visualizations. Display: Audience overlap and targeting accuracy metrics."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Ad Creative Optimization",
      narration: `Create high-converting Facebook ad creatives that stop the scroll and drive action. We'll show you the psychology behind effective ad design and copywriting.`,
      videoScript: "Show: High-performing Facebook ad examples, creative variations. Cut to: A/B testing results and conversion rates. Display: Before/after ad performance comparisons."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Campaign Scaling",
      narration: `Learn how to scale your successful Facebook campaigns while maintaining profitability. Discover the secrets of budget optimization and campaign structure.`,
      videoScript: "Show: Campaign scaling dashboards, budget allocation strategies. Cut to: Profit margin maintenance during scaling. Display: Growth trajectories and scaling success metrics."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Analytics & Optimization",
      narration: `Use Facebook Analytics to optimize your campaigns for maximum performance. Track the right metrics and make data-driven decisions that improve your ROI.`,
      videoScript: "Show: Facebook Analytics dashboard, key performance indicators. Cut to: Data analysis and optimization techniques. Display: ROI improvement charts and metric tracking."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Retargeting Strategies",
      narration: `Implement powerful retargeting strategies that convert visitors into customers. Learn to create custom audiences based on website behavior and engagement.`,
      videoScript: "Show: Facebook Pixel setup, retargeting audience creation. Cut to: Conversion funnel optimization. Display: Retargeting campaign performance and customer journey."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Advanced Techniques",
      narration: `Master advanced Facebook advertising techniques including dynamic ads, catalog marketing, and cross-platform campaign optimization for maximum reach.`,
      videoScript: "Show: Dynamic product ads, catalog integration, cross-platform campaigns. Cut to: Advanced automation features. Display: Multi-platform advertising ecosystem."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Facebook Success",
      narration: `Start dominating Facebook advertising today! Apply these proven strategies and join successful marketers who are generating consistent profits from Facebook ads.`,
      videoScript: "Show: Success stories, profitable campaigns, marketing transformations. Cut to: Implementation roadmap and action steps. Display: Call-to-action for immediate Facebook success."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    fullVideoScript: segments.map(s => s.videoScript).join(' '),
    backgroundMusic: "facebook-focused",
    videoUrl
  };
};

// TikTok-specific video content with matching video script
const generateTikTokVideoContent = (searchTerm: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "TikTok Money Machine",
      narration: `Welcome to the TikTok Money Machine! Discover how ordinary creators are earning thousands monthly through TikTok using viral content strategies and monetization techniques.`,
      videoScript: "Show: TikTok creators, viral content examples, monetization strategies. Cut to: Success stories and revenue streams. Display: TikTok monetization success and growth."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Viral Content Creation",
      narration: `Learn the science behind viral TikTok content. Master trending formats, hashtag strategies, and engagement techniques that guarantee millions of views.`,
      videoScript: "Show: TikTok trending formats, hashtag examples, engagement tips. Cut to: Viral content examples and audience engagement. Display: TikTok content creation and viral success."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "TikTok Algorithm Mastery",
      narration: `Understand and exploit the TikTok algorithm to maximize your reach. Learn optimal posting times, content structure, and engagement strategies that boost visibility.`,
      videoScript: "Show: TikTok algorithm insights, posting tips, content structure. Cut to: TikTok algorithm examples and visibility optimization. Display: TikTok algorithm mastery and visibility."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Monetization Strategies",
      narration: `Discover multiple ways to monetize your TikTok presence including Creator Fund, brand partnerships, affiliate marketing, and product promotion strategies.`,
      videoScript: "Show: Creator Fund, brand partnerships, affiliate marketing, product promotion examples. Cut to: Monetization success stories and revenue streams. Display: TikTok monetization strategies and success."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Audience Growth",
      narration: `Build a massive, engaged TikTok following using proven growth tactics. Learn to create content that converts viewers into loyal followers and customers.`,
      videoScript: "Show: TikTok growth tactics, content examples, audience engagement. Cut to: TikTok growth success stories and audience engagement. Display: TikTok audience growth and engagement."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Brand Partnerships",
      narration: `Secure lucrative brand partnerships and sponsorship deals. Learn how to pitch brands, negotiate rates, and create sponsored content that drives results.`,
      videoScript: "Show: Brand partnership examples, negotiation tips, sponsored content examples. Cut to: Brand partnership success stories and revenue streams. Display: TikTok brand partnerships and success."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Scaling Your Success",
      narration: `Scale your TikTok success across multiple platforms and income streams. Learn to repurpose content and build a sustainable creator business.`,
      videoScript: "Show: TikTok scaling tactics, content examples, audience engagement. Cut to: TikTok scaling success stories and audience engagement. Display: TikTok scaling and success."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "TikTok Millionaire",
      narration: `Start your TikTok money journey today! Implement these proven strategies and join creators who are building million-dollar businesses on TikTok.`,
      videoScript: "Show: TikTok millionaire examples, success stories, revenue streams. Cut to: TikTok millionaire success and implementation. Display: Call-to-action for TikTok millionaire success."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    fullVideoScript: segments.map(s => s.videoScript).join(' '),
    backgroundMusic: "tiktok-focused",
    videoUrl
  };
};

// ClickBank-specific video content with matching video script
const generateClickBankVideoContent = (searchTerm: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "ClickBank Profit System",
      narration: `Welcome to the ClickBank Profit System! Learn how smart affiliates are generating $500+ daily commissions by promoting high-converting ClickBank products.`,
      videoScript: "Show: ClickBank affiliate examples, commission rates, product examples. Cut to: Affiliate success stories and revenue streams. Display: ClickBank affiliate success and commission."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Product Selection Mastery",
      narration: `Master the art of selecting winning ClickBank products. Learn to analyze gravity scores, commission rates, and sales pages to identify profitable opportunities.`,
      videoScript: "Show: ClickBank product examples, commission analysis, sales page examples. Cut to: Product selection success stories and revenue streams. Display: ClickBank product selection and success."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Traffic Generation",
      narration: `Discover proven traffic generation methods that work perfectly with ClickBank offers. From SEO to paid advertising, we'll show you what converts.`,
      videoScript: "Show: ClickBank traffic generation examples, SEO strategies, paid advertising examples. Cut to: Traffic generation success stories and revenue streams. Display: ClickBank traffic generation and success."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Commission Optimization",
      narration: `Optimize your ClickBank campaigns for maximum commissions. Learn split-testing techniques and conversion optimization strategies that increase your earnings.`,
      videoScript: "Show: ClickBank campaign examples, split-testing techniques, conversion optimization examples. Cut to: Commission optimization success stories and revenue streams. Display: ClickBank commission optimization and success."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Email Marketing",
      narration: `Build profitable email funnels that promote ClickBank products effectively. Learn to create sequences that build trust and drive consistent sales.`,
      videoScript: "Show: ClickBank email marketing examples, sequence examples, sales results. Cut to: Email marketing success stories and revenue streams. Display: ClickBank email marketing and success."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Scaling Strategies",
      narration: `Scale your ClickBank affiliate business to multiple income streams. Learn to promote multiple products and build a sustainable affiliate empire.`,
      videoScript: "Show: ClickBank affiliate scaling examples, product promotion examples, empire building examples. Cut to: Scaling strategies success stories and revenue streams. Display: ClickBank affiliate scaling and success."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Advanced Techniques",
      narration: `Implement advanced ClickBank strategies including review sites, YouTube marketing, and social media promotion for maximum reach and conversions.`,
      videoScript: "Show: ClickBank advanced strategies examples, review site examples, YouTube marketing examples. Cut to: Advanced techniques success stories and revenue streams. Display: ClickBank advanced techniques and success."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "ClickBank Success",
      narration: `Start earning ClickBank commissions today! Apply these proven strategies and join successful affiliates making serious money with ClickBank products.`,
      videoScript: "Show: ClickBank success stories, revenue streams, commission examples. Cut to: ClickBank success roadmap and action steps. Display: Call-to-action for ClickBank success."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    fullVideoScript: segments.map(s => s.videoScript).join(' '),
    backgroundMusic: "clickbank-focused",
    videoUrl
  };
};

// Work from Home-specific video content with matching video script
const generateWorkFromHomeVideoContent = (searchTerm: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "Work From Home Success",
      narration: `Welcome to Work From Home Success! Discover how to build a thriving home-based business with multiple income streams and achieve true location independence.`,
      videoScript: "Show: Home-based business examples, success stories, income streams. Cut to: Home business models and strategies. Display: Home business success and income streams."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Home Business Models",
      narration: `Explore proven home business models that generate consistent income. From freelancing to e-commerce, find the perfect business model for your skills and goals.`,
      videoScript: "Show: Home business model examples, success stories, income streams. Cut to: Home business model strategies and examples. Display: Home business models and success."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Productivity Optimization",
      narration: `Master productivity techniques that maximize your earning potential from home. Learn time management, workspace optimization, and focus strategies.`,
      videoScript: "Show: Productivity techniques examples, success stories, income streams. Cut to: Productivity optimization strategies and examples. Display: Productivity optimization and success."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Income Diversification",
      narration: `Create multiple income streams that protect you from economic uncertainty. Learn to build passive income while working from the comfort of your home.`,
      videoScript: "Show: Income diversification examples, success stories, income streams. Cut to: Income diversification strategies and examples. Display: Income diversification and success."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Digital Marketing",
      narration: `Master digital marketing techniques essential for home-based businesses. Learn SEO, social media marketing, and online advertising strategies.`,
      videoScript: "Show: Digital marketing examples, success stories, income streams. Cut to: Digital marketing strategies and examples. Display: Digital marketing and success."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Business Scaling",
      narration: `Scale your home business to six-figure income levels. Learn automation, outsourcing, and systems that allow you to work less while earning more.`,
      videoScript: "Show: Home business scaling examples, success stories, income streams. Cut to: Home business scaling strategies and examples. Display: Home business scaling and success."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Financial Freedom",
      narration: `Achieve financial freedom through your home-based business. Learn investment strategies and wealth building techniques for long-term security.`,
      videoScript: "Show: Financial freedom examples, success stories, income streams. Cut to: Financial freedom strategies and examples. Display: Financial freedom and success."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Home Business Empire",
      narration: `Start building your home business empire today! Take action on these proven strategies and join thousands who have achieved success working from home.`,
      videoScript: "Show: Home business empire examples, success stories, income streams. Cut to: Home business empire roadmap and action steps. Display: Call-to-action for home business empire."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    fullVideoScript: segments.map(s => s.videoScript).join(' '),
    backgroundMusic: "work-from-home-focused",
    videoUrl
  };
};

// Affiliate Marketing-specific video content with matching video script
const generateAffiliateMarketingVideoContent = (searchTerm: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "Affiliate Marketing Mastery",
      narration: `Welcome to Affiliate Marketing Mastery! Learn how to build a profitable affiliate business that generates passive income through proven promotion strategies.`,
      videoScript: "Show: Affiliate marketing examples, success stories, income streams. Cut to: Affiliate marketing strategies and examples. Display: Affiliate marketing success and income streams."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Niche Selection",
      narration: `Master the art of profitable niche selection. Learn to identify high-converting niches with low competition and high commission potential.`,
      videoScript: "Show: Niche selection examples, success stories, income streams. Cut to: Niche selection strategies and examples. Display: Niche selection and success."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Product Research",
      narration: `Discover how to find and evaluate affiliate products that convert. Learn to analyze commission structures, sales pages, and market demand.`,
      videoScript: "Show: Product research examples, success stories, income streams. Cut to: Product research strategies and examples. Display: Product research and success."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Content Marketing",
      narration: `Create compelling content that drives affiliate sales. Master review writing, comparison posts, and content that builds trust and authority.`,
      videoScript: "Show: Content marketing examples, success stories, income streams. Cut to: Content marketing strategies and examples. Display: Content marketing and success."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Traffic Strategies",
      narration: `Generate targeted traffic that converts into affiliate commissions. Learn SEO, paid advertising, and social media strategies that work.`,
      videoScript: "Show: Traffic strategies examples, success stories, income streams. Cut to: Traffic strategies strategies and examples. Display: Traffic strategies and success."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Conversion Optimization",
      narration: `Optimize your affiliate campaigns for maximum conversions. Learn split-testing, landing page optimization, and psychological triggers that increase sales.`,
      videoScript: "Show: Conversion optimization examples, success stories, income streams. Cut to: Conversion optimization strategies and examples. Display: Conversion optimization and success."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Scaling Success",
      narration: `Scale your affiliate marketing business to multiple income streams. Learn to promote multiple products and build a sustainable affiliate empire.`,
      videoScript: "Show: Scaling success examples, success stories, income streams. Cut to: Scaling success strategies and examples. Display: Scaling success and success."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Affiliate Success",
      narration: `Start your affiliate marketing journey today! Apply these proven strategies and join successful affiliates earning consistent commissions online.`,
      videoScript: "Show: Affiliate success examples, success stories, income streams. Cut to: Affiliate success roadmap and action steps. Display: Call-to-action for affiliate success."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    fullVideoScript: segments.map(s => s.videoScript).join(' '),
    backgroundMusic: "affiliate-marketing-focused",
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
      narration: "Welcome to the complete guide for searching and finding winning campaign ideas! Today we'll teach you proven research methods that successful marketers use to discover profitable campaign concepts that convert audiences into customers.",
      videoScript: "Show: Marketing research tools, competitor analysis dashboards, trending topics. Cut to: Campaign ideation process and brainstorming sessions. Display: Research methodology and idea generation frameworks."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Market Research Fundamentals",
      narration: "Effective campaign research starts with understanding your target market deeply. Use Google Trends, social media insights, and competitor analysis to identify what resonates with your audience. Look for trending topics, pain points, and emerging opportunities in your niche.",
      videoScript: "Show: Google Trends interface, social media analytics, market research tools. Cut to: Audience analysis and demographic insights. Display: Market data visualization and trend identification."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Competitor Campaign Analysis",
      narration: "Analyze your competitors' most successful campaigns to understand what works in your industry. Study their messaging, visuals, timing, and audience targeting. Tools like Facebook Ad Library and SEMrush reveal valuable insights about competitor strategies.",
      videoScript: "Show: Facebook Ad Library, SEMrush, competitor campaign examples. Cut to: Competitor campaign analysis and insights. Display: Competitor campaign strategies and success."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Creative Brainstorming Methods",
      narration: "Use structured brainstorming techniques to generate innovative campaign ideas. Try mind mapping, SCAMPER method, and reverse brainstorming. Consider seasonal trends, current events, and cultural moments that align with your brand message.",
      videoScript: "Show: Brainstorming techniques examples, creative brainstorming examples. Cut to: Creative brainstorming strategies and examples. Display: Creative brainstorming and success."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Data-Driven Idea Validation",
      narration: "Validate your campaign ideas using data before investing resources. Test concepts through surveys, focus groups, and small-scale A/B tests. Use Google Keyword Planner and social listening tools to gauge interest levels.",
      videoScript: "Show: Data validation examples, survey examples, A/B test examples. Cut to: Data validation and interest level assessment. Display: Data validation and success."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Cross-Platform Research",
      narration: "Research campaign ideas across multiple platforms including Facebook, Instagram, TikTok, YouTube, and Pinterest. Each platform has unique content formats and audience behaviors that can inspire different campaign approaches.",
      videoScript: "Show: Cross-platform research examples, platform examples. Cut to: Cross-platform research and inspiration. Display: Cross-platform research and success."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Campaign Planning Framework",
      narration: "Organize your campaign ideas using a systematic framework. Define objectives, target audience, key messages, channels, budget, and success metrics. Create a campaign brief template for consistent planning and execution.",
      videoScript: "Show: Campaign planning framework examples, campaign brief examples. Cut to: Campaign planning framework and template creation. Display: Campaign planning framework and success."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Execute Your Best Ideas",
      narration: "Transform your research into action! Start with your highest-potential campaign ideas and create detailed execution plans. Remember, the best campaign idea is worthless without proper implementation and continuous optimization.",
      videoScript: "Show: Campaign execution examples, execution plan examples. Cut to: Campaign execution and optimization. Display: Campaign execution and success."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    fullVideoScript: segments.map(s => s.videoScript).join(' '),
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

// Function to get synchronized video script for real-time display
export const getSynchronizedVideoScript = (content: SynchronizedVideoContent, currentTime: number): string => {
  const currentSegment = getCurrentVideoSegment(content, currentTime);
  return currentSegment?.videoScript || '';
};
