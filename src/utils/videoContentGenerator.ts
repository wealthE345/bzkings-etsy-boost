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
const getSubjectSpecificVideo = (subject: string): string => {
  const lowerSubject = subject.toLowerCase();
  
  if (lowerSubject.includes('money') || lowerSubject.includes('cash') || lowerSubject.includes('earn') || lowerSubject.includes('profit')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
  } else if (lowerSubject.includes('tiktok') || lowerSubject.includes('social media')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
  } else if (lowerSubject.includes('facebook') || lowerSubject.includes('fb ads')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  } else if (lowerSubject.includes('clickbank') || lowerSubject.includes('affiliate')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  } else if (lowerSubject.includes('work from home') || lowerSubject.includes('remote work')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";
  } else if (lowerSubject.includes('email marketing') || lowerSubject.includes('email')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
  } else {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
  }
};

// Generate images that match the specific content being discussed
const getSubjectSpecificImages = (subject: string): string[] => {
  const lowerSubject = subject.toLowerCase();
  
  if (lowerSubject.includes('money') || lowerSubject.includes('cash') || lowerSubject.includes('earn')) {
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
  } else if (lowerSubject.includes('facebook') || lowerSubject.includes('fb')) {
    return [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80", // Facebook interface
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80", // Social media analytics
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop&q=80", // Social media marketing
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80", // Advertising
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80", // Facebook ads
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80", // Social media ROI
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80" // Facebook success
    ];
  } else if (lowerSubject.includes('tiktok')) {
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
  } else if (lowerSubject.includes('clickbank')) {
    return [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80", // Affiliate marketing
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80", // Commission earnings
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80", // Digital products
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80", // Online sales
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80", // Marketing funnels
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80", // Conversion rates
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80", // Affiliate success
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80" // ClickBank profits
    ];
  } else {
    // Generic business/marketing images
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

// Enhanced content generation for money-focused videos
const generateMoneyVideoContent = (subject: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "Make Money Online Today",
      narration: "Discover how to make real money online starting today! These proven strategies have helped thousands of people create sustainable income streams from home. No experience required, just dedication and the right system."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "$500+ Daily Earnings",
      narration: "Learn the exact methods successful entrepreneurs use to earn five hundred dollars or more daily. These aren't get-rich-quick schemes, but legitimate business models that generate consistent cash flow when properly implemented."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Multiple Income Streams",
      narration: "Build multiple income streams that work together to maximize your earning potential. Diversification is key to financial security. We'll show you how to create passive income that continues earning while you sleep."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Investment Strategies",
      narration: "Master smart investment strategies that multiply your money over time. Learn about compound interest, dividend investing, and cryptocurrency opportunities that can accelerate your wealth building journey significantly."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Financial Freedom Path",
      narration: "Create your personalized path to financial freedom. Set realistic goals, track your progress, and implement systems that automatically save and invest your money. Financial independence is achievable with the right plan."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Wealth Building System",
      narration: "Implement a complete wealth building system that grows your money exponentially. Learn budgeting, saving, investing, and business creation strategies that wealthy people use to maintain and grow their fortunes."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Scale Your Earnings",
      narration: "Scale your earnings from hundreds to thousands of dollars monthly. Discover automation tools, outsourcing strategies, and systems that allow your income to grow without proportionally increasing your time investment."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Start Your Money Journey!",
      narration: "Your money-making journey starts right now! Take action today and begin implementing these proven strategies. Every successful entrepreneur started with a single step. Make today your financial turning point!"
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "motivational-money",
    videoUrl
  };
};

// Enhanced Facebook content generation
const generateFacebookVideoContent = (subject: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "Facebook Marketing Mastery",
      narration: "Master Facebook marketing with strategies that actually work! With over three billion active users, Facebook remains the most powerful platform for reaching your target audience and growing your business exponentially."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Advanced Facebook Ads",
      narration: "Learn advanced Facebook advertising techniques that maximize your return on investment. Discover how to create high-converting ad campaigns that reach the right people at the right time with surgical precision."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Audience Targeting Secrets",
      narration: "Unlock Facebook's powerful audience targeting capabilities. Learn to create custom audiences, lookalike audiences, and use behavioral targeting to reach people most likely to buy your products or services."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Facebook Business Growth",
      narration: "Transform your Facebook page into a powerful business growth engine. Learn content strategies, engagement techniques, and conversion optimization methods that turn followers into paying customers consistently."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Social Media ROI",
      narration: "Maximize your social media return on investment with proven Facebook strategies. Track meaningful metrics, optimize your campaigns, and scale successful ads to generate predictable business growth and revenue."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Facebook Sales Funnel",
      narration: "Build complete Facebook sales funnels that convert prospects into customers. Learn to create compelling lead magnets, nurture sequences, and sales processes that work seamlessly within the Facebook ecosystem."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Scale Facebook Success",
      narration: "Scale your Facebook marketing success to new heights. Discover automation tools, advanced bidding strategies, and campaign optimization techniques that successful businesses use to dominate their markets."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Dominate Facebook Today!",
      narration: "Start dominating Facebook marketing today! Implement these proven strategies and watch your business grow through targeted, profitable Facebook campaigns that deliver real, measurable results consistently."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "tech-professional",
    videoUrl
  };
};

// Generate synchronized video content based on campaign subject (2 minutes)
export const generateSynchronizedVideoContent = (subject: string): SynchronizedVideoContent => {
  const lowerSubject = subject.toLowerCase();
  const videoUrl = getSubjectSpecificVideo(subject);
  const images = getSubjectSpecificImages(subject);
  
  if (lowerSubject.includes('money') || lowerSubject.includes('cash') || lowerSubject.includes('earn') || lowerSubject.includes('profit')) {
    return generateMoneyVideoContent(subject, videoUrl, images);
  } else if (lowerSubject.includes('facebook') || lowerSubject.includes('fb ads')) {
    return generateFacebookVideoContent(subject, videoUrl, images);
  } else if (lowerSubject.includes('tiktok')) {
    return generateTikTokVideoContent(subject, videoUrl, images);
  } else if (lowerSubject.includes('clickbank')) {
    return generateClickBankVideoContent(subject, videoUrl, images);
  } else if (lowerSubject.includes('work from home')) {
    return generateWorkFromHomeVideoContent(subject, videoUrl, images);
  } else if (lowerSubject.includes('affiliate marketing')) {
    return generateAffiliateMarketingVideoContent(subject, videoUrl, images);
  }
  
  return generateGenericVideoContent(subject, videoUrl, images);
};

const generateTikTokVideoContent = (subject: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 10,
      image: images[0],
      text: "TikTok Money Mastery",
      narration: "Welcome to TikTok Money Mastery! Are you ready to transform your creative passion into serious profit? Today we'll show you exactly how creators are making thousands of dollars monthly through viral TikTok content."
    },
    {
      startTime: 10,
      endTime: 25,
      image: images[1],
      text: "Transform Your Passion Into Profit",
      narration: "The TikTok Creator Fund has revolutionized how content creators earn money. With over one billion active users, TikTok offers unprecedented opportunities for monetization. Whether you're dancing, cooking, teaching, or entertaining, there's a profitable niche waiting for you."
    },
    {
      startTime: 25,
      endTime: 40,
      image: images[2],
      text: "$1000+ Monthly Earnings",
      narration: "Top creators are earning over one thousand dollars monthly through multiple revenue streams. The Creator Fund pays based on views and engagement, but that's just the beginning. Brand partnerships, affiliate marketing, and product sales can multiply your earnings exponentially."
    },
    {
      startTime: 40,
      endTime: 55,
      image: images[3],
      text: "Master the Creator Fund",
      narration: "Understanding the TikTok Creator Fund algorithm is crucial for maximizing your earnings. Consistency, engagement rate, and trending content are key factors. We'll teach you the exact posting schedule and content strategies that top earners use to optimize their fund payments."
    },
    {
      startTime: 55,
      endTime: 70,
      image: images[4],
      text: "Lucrative Brand Partnerships",
      narration: "Brand partnerships are where the real money lies. Companies are paying creators anywhere from five hundred to ten thousand dollars per sponsored post. Building authentic relationships with brands in your niche is essential for long-term success and recurring income."
    },
    {
      startTime: 70,
      endTime: 85,
      image: images[5],
      text: "Viral Content Creation",
      narration: "Creating viral content isn't luck, it's a science. We'll reveal the proven formulas that guarantee engagement. From hook creation in the first three seconds to using trending sounds and hashtags strategically, every element matters for viral success."
    },
    {
      startTime: 85,
      endTime: 100,
      image: images[6],
      text: "Trending Hashtag Strategy",
      narration: "Hashtag research and timing are critical for reaching massive audiences. Using trending hashtags at the right moment can explode your reach from hundreds to millions of views. We'll show you the tools and techniques to identify and capitalize on trending opportunities."
    },
    {
      startTime: 100,
      endTime: 115,
      image: images[7],
      text: "Multiple Income Streams",
      narration: "Diversification is key to sustainable TikTok income. Beyond the Creator Fund and brand deals, successful creators monetize through affiliate marketing, merchandise sales, course creation, and live streaming gifts. Each follower becomes a potential customer across multiple revenue channels."
    },
    {
      startTime: 115,
      endTime: 120,
      image: images[8],
      text: "Start Your Journey Today!",
      narration: "Your TikTok money-making journey starts today! Don't wait for the perfect moment, start creating and implementing these strategies now!"
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "upbeat-social-media",
    videoUrl
  };
};

const generateClickBankVideoContent = (subject: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "ClickBank Profit System",
      narration: "Welcome to the ClickBank profit system that's helping affiliates generate over five hundred dollars daily! ClickBank represents the largest digital product marketplace with thousands of high-converting offers waiting for smart marketers like you."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "$500+ Daily Commissions",
      narration: "Top ClickBank affiliates are earning between five hundred to five thousand dollars daily by promoting the right products to the right audiences. The key is understanding which products convert and how to drive quality traffic that actually buys."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Winning Product Selection",
      narration: "Product selection is everything in ClickBank success. We analyze gravity scores, commission rates, sales pages, and vendor reputation to identify winners. Products with gravity scores between twenty to fifty often provide the best balance of competition and conversion potential."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Traffic Generation Methods",
      narration: "Traffic generation for ClickBank requires understanding buyer intent. Paid advertising through Facebook and Google, content marketing, YouTube reviews, and email marketing all work when executed properly. The key is matching traffic temperature to the right funnel approach."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Email Marketing Funnels",
      narration: "Email marketing funnels are crucial for ClickBank success. Building a list allows you to promote multiple products over time, increasing customer lifetime value. Successful affiliates often make more money from email follow-ups than the initial sale."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Commission Optimization",
      narration: "Advanced ClickBank affiliates optimize every element of their campaigns. From split-testing ad creatives to optimizing landing pages and email sequences, small improvements compound into massive profit increases. We'll show you exactly what to test and how."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Scaling Strategies",
      narration: "Scaling ClickBank campaigns requires systematic approaches. Successful affiliates reinvest profits into more traffic, expand to new products, and build teams to manage multiple campaigns simultaneously. The goal is creating passive income systems."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Claim Your Share Today!",
      narration: "ClickBank processes over two hundred million dollars in sales annually. Your share of this massive marketplace is waiting. Start implementing these proven strategies today and begin your journey to ClickBank success!"
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "professional-business",
    videoUrl
  };
};

const generateFacebookAdsVideoContent = (subject: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "Facebook Ads Mastery",
      narration: "Master Facebook Ads with our comprehensive blueprint! With over three billion active users, Facebook offers unparalleled opportunities for targeted advertising and customer acquisition."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "300% ROI System",
      narration: "Achieve three hundred percent return on investment with proven Facebook advertising strategies. Our system helps you maximize ad spend efficiency and reach your target audience with surgical precision."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Advanced Targeting",
      narration: "Discover advanced Facebook audience targeting strategies that convert browsers into buyers. Learn to leverage custom audiences, lookalike audiences, and behavioral targeting for maximum campaign effectiveness."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "High-Converting Creatives",
      narration: "Create high-converting ad creatives using proven design principles and psychological triggers. Learn the exact frameworks top advertisers use to capture attention and drive immediate action from cold traffic."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Ads Manager Mastery",
      narration: "Master Facebook Ads Manager optimization techniques for maximum performance. Understanding campaign structure, bidding strategies, and performance metrics is crucial for scaling profitable campaigns."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Retargeting That Converts",
      narration: "Build retargeting campaigns that convert prospects into customers. Learn advanced pixel implementation, custom event tracking, and dynamic product ads that bring visitors back to complete purchases."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Smart Budget Optimization",
      narration: "Optimize your advertising budget for maximum return on ad spend. Learn campaign budget optimization, automatic placements, and bid strategies that reduce costs while increasing conversions."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Dominate Facebook Today!",
      narration: "Start dominating Facebook advertising today! Implement these proven strategies and watch your business grow through targeted, profitable advertising campaigns that deliver real results."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "tech-professional",
    videoUrl
  };
};

const generateWorkFromHomeVideoContent = (subject: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "Work From Home Success",
      narration: "Transform your home into a profit-generating headquarters! Discover proven strategies that enable professionals to build sustainable income streams from the comfort of their own homes."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Complete Financial Freedom",
      narration: "Say goodbye to the daily commute and hello to financial freedom! Learn how to build multiple income streams that provide location independence and time flexibility."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "7 Proven Business Models",
      narration: "Discover seven proven online business models for home-based success. From freelancing and consulting to e-commerce and digital products, find the perfect model for your skills and interests."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Step-by-Step Setup",
      narration: "Get comprehensive step-by-step setup guides for each home income stream. Learn the exact tools, processes, and strategies needed to launch your work-from-home business successfully."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "Optimize Your Home Office",
      narration: "Learn home office optimization techniques for maximum productivity and profit. Discover how to create a professional workspace that enhances focus, efficiency, and client interactions."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Perfect Work-Life Balance",
      narration: "Master time management strategies for perfect work-life balance. Learn to set boundaries, manage client expectations, and maintain productivity while enjoying the flexibility of remote work."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Scale Your Home Earnings",
      narration: "Use proven scaling techniques to increase your home-based earnings exponentially. Learn automation strategies, team building, and systems that allow your business to grow beyond your time investment."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Build Your Home Empire!",
      narration: "Start building your home-based empire today! Transform your living space into a thriving business headquarters and achieve the freedom and financial success you deserve."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "inspiring-home",
    videoUrl
  };
};

const generateAffiliateMarketingVideoContent = (subject: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 15,
      image: images[0],
      text: "Affiliate Marketing Mastery",
      narration: "Welcome to Affiliate Marketing Mastery! Learn how to build a sustainable affiliate marketing business that generates passive income through strategic product promotion and audience building."
    },
    {
      startTime: 15,
      endTime: 30,
      image: images[1],
      text: "Commission Domination",
      narration: "Master commission domination strategies that top affiliates use to earn six-figure incomes. Learn to identify high-converting products and build audiences that trust your recommendations."
    },
    {
      startTime: 30,
      endTime: 45,
      image: images[2],
      text: "Profitable Niche Selection",
      narration: "Master profitable niche selection and product promotion strategies. Learn to research market demand, analyze competition, and identify underserved audiences ready to buy affiliate products."
    },
    {
      startTime: 45,
      endTime: 60,
      image: images[3],
      text: "Advanced Traffic Generation",
      narration: "Learn advanced traffic generation strategies that convert visitors into buyers. Master SEO, content marketing, social media promotion, and paid advertising for affiliate success."
    },
    {
      startTime: 60,
      endTime: 75,
      image: images[4],
      text: "High-Converting Products",
      narration: "Discover how to identify and promote high-converting affiliate products effectively. Learn to analyze conversion rates, commission structures, and customer lifetime value for maximum profitability."
    },
    {
      startTime: 75,
      endTime: 90,
      image: images[5],
      text: "Campaign Optimization",
      narration: "Optimize your affiliate campaigns for maximum commissions and profitability. Learn split-testing techniques, conversion tracking, and performance analysis for continuous improvement."
    },
    {
      startTime: 90,
      endTime: 105,
      image: images[6],
      text: "Build Sustainable Income",
      narration: "Build a sustainable affiliate marketing business that generates passive income. Learn to create evergreen content, build email lists, and develop multiple income streams for long-term success."
    },
    {
      startTime: 105,
      endTime: 120,
      image: images[7],
      text: "Start Your Success Journey!",
      narration: "Start your journey to affiliate marketing success today! Implement these proven strategies and build a thriving affiliate business that provides financial freedom and lifestyle flexibility."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "motivational-success",
    videoUrl
  };
};

const generateGenericVideoContent = (subject: string, videoUrl: string, images: string[]): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 20,
      image: images[0],
      text: subject,
      narration: `Discover powerful strategies for ${subject}! This comprehensive system will teach you proven methods that generate real results. Whether you're a beginner or experienced, these techniques will transform your approach.`
    },
    {
      startTime: 20,
      endTime: 40,
      image: images[1],
      text: "Proven Methods",
      narration: "These aren't theoretical concepts, but battle-tested strategies used by successful entrepreneurs worldwide. Every technique has been refined through real-world application and proven to deliver consistent results when properly implemented."
    },
    {
      startTime: 40,
      endTime: 60,
      image: images[2],
      text: "Advanced Techniques",
      narration: "Master advanced techniques that separate professionals from amateurs. These sophisticated strategies require dedication but deliver exponential returns. Learn the insider secrets that top performers use to dominate their markets."
    },
    {
      startTime: 60,
      endTime: 80,
      image: images[3],
      text: "Build Income Streams",
      narration: "Creating multiple income streams is essential for financial security and growth. We'll show you how to systematically build and scale various revenue sources that work together synergistically to maximize your earning potential."
    },
    {
      startTime: 80,
      endTime: 100,
      image: images[4],
      text: "Transform Your Future",
      narration: "This comprehensive system will transform your financial future. By implementing these strategies consistently, you'll build a sustainable business that generates passive income and provides the freedom you've always wanted."
    },
    {
      startTime: 100,
      endTime: 120,
      image: images[5],
      text: "Start Today!",
      narration: "Your journey to success starts today! Don't wait for the perfect moment. Take action now and begin implementing these proven strategies. Your future self will thank you!"
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "inspirational-generic",
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
