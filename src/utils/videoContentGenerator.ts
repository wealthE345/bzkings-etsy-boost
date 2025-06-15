// Enhanced video content generation with subject-specific synchronized content

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
  videoUrl: string; // Added for actual video playback
}

// Generate synchronized video content based on campaign subject (2 minutes)
export const generateSynchronizedVideoContent = (subject: string): SynchronizedVideoContent => {
  const lowerSubject = subject.toLowerCase();
  
  if (lowerSubject.includes('tiktok')) {
    return generateTikTokVideoContent(subject);
  } else if (lowerSubject.includes('clickbank')) {
    return generateClickBankVideoContent(subject);
  } else if (lowerSubject.includes('facebook ads')) {
    return generateFacebookAdsVideoContent(subject);
  } else if (lowerSubject.includes('make money from home')) {
    return generateWorkFromHomeVideoContent(subject);
  } else if (lowerSubject.includes('affiliate marketing')) {
    return generateAffiliateMarketingVideoContent(subject);
  }
  
  return generateGenericVideoContent(subject);
};

const generateTikTokVideoContent = (subject: string): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 10,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80&overlay=text&txt=TikTok%20Money%20Mastery&txt-size=42&txt-color=white&txt-align=center,middle&bg=gradient(45deg,purple,pink)",
      text: "TikTok Money Mastery",
      narration: "Welcome to TikTok Money Mastery! Are you ready to transform your creative passion into serious profit? Today we'll show you exactly how creators are making thousands of dollars monthly through viral TikTok content."
    },
    {
      startTime: 10,
      endTime: 25,
      image: "https://images.unsplash.com/photo-1570194065650-d99bf9d4d665?w=800&h=600&fit=crop&q=80&overlay=text&txt=Transform%20Your%20Passion&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Transform Your Passion Into Profit",
      narration: "The TikTok Creator Fund has revolutionized how content creators earn money. With over one billion active users, TikTok offers unprecedented opportunities for monetization. Whether you're dancing, cooking, teaching, or entertaining, there's a profitable niche waiting for you."
    },
    {
      startTime: 25,
      endTime: 40,
      image: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&h=600&fit=crop&q=80&overlay=text&txt=%241000%2B%20Monthly&txt-size=48&txt-color=green&txt-align=center,middle",
      text: "$1000+ Monthly Earnings",
      narration: "Top creators are earning over one thousand dollars monthly through multiple revenue streams. The Creator Fund pays based on views and engagement, but that's just the beginning. Brand partnerships, affiliate marketing, and product sales can multiply your earnings exponentially."
    },
    {
      startTime: 40,
      endTime: 55,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80&overlay=text&txt=Creator%20Fund%20Mastery&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Master the Creator Fund",
      narration: "Understanding the TikTok Creator Fund algorithm is crucial for maximizing your earnings. Consistency, engagement rate, and trending content are key factors. We'll teach you the exact posting schedule and content strategies that top earners use to optimize their fund payments."
    },
    {
      startTime: 55,
      endTime: 70,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&q=80&overlay=text&txt=Brand%20Partnerships&txt-size=38&txt-color=white&txt-align=center,middle",
      text: "Lucrative Brand Partnerships",
      narration: "Brand partnerships are where the real money lies. Companies are paying creators anywhere from five hundred to ten thousand dollars per sponsored post. Building authentic relationships with brands in your niche is essential for long-term success and recurring income."
    },
    {
      startTime: 70,
      endTime: 85,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Viral%20Content%20Formula&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Viral Content Creation",
      narration: "Creating viral content isn't luck, it's a science. We'll reveal the proven formulas that guarantee engagement. From hook creation in the first three seconds to using trending sounds and hashtags strategically, every element matters for viral success."
    },
    {
      startTime: 85,
      endTime: 100,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Trending%20Hashtags&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Trending Hashtag Strategy",
      narration: "Hashtag research and timing are critical for reaching massive audiences. Using trending hashtags at the right moment can explode your reach from hundreds to millions of views. We'll show you the tools and techniques to identify and capitalize on trending opportunities."
    },
    {
      startTime: 100,
      endTime: 115,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Income%20Streams&txt-size=40&txt-color=white&txt-align=center,middle",
      text: "Multiple Income Streams",
      narration: "Diversification is key to sustainable TikTok income. Beyond the Creator Fund and brand deals, successful creators monetize through affiliate marketing, merchandise sales, course creation, and live streaming gifts. Each follower becomes a potential customer across multiple revenue channels."
    },
    {
      startTime: 115,
      endTime: 120,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Start%20Today&txt-size=44&txt-color=gold&txt-align=center,middle&bg=gradient(45deg,purple,blue)",
      text: "Start Your Journey Today!",
      narration: "Your TikTok money-making journey starts today! Don't wait for the perfect moment, start creating and implementing these strategies now!"
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "upbeat-social-media",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" // Sample video for demo
  };
};

const generateClickBankVideoContent = (subject: string): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 10,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=ClickBank%20Profit%20System&txt-size=36&txt-color=white&txt-align=center,middle&bg=gradient(45deg,green,blue)",
      text: "ClickBank Profit System",
      narration: "Welcome to the ClickBank profit system that's helping affiliates generate over five hundred dollars daily! ClickBank represents the largest digital product marketplace with thousands of high-converting offers waiting for smart marketers like you."
    },
    {
      startTime: 10,
      endTime: 25,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=%24500%2B%20Daily&txt-size=48&txt-color=green&txt-align=center,middle",
      text: "$500+ Daily Commissions",
      narration: "Top ClickBank affiliates are earning between five hundred to five thousand dollars daily by promoting the right products to the right audiences. The key is understanding which products convert and how to drive quality traffic that actually buys."
    },
    {
      startTime: 25,
      endTime: 40,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Product%20Selection&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Winning Product Selection",
      narration: "Product selection is everything in ClickBank success. We analyze gravity scores, commission rates, sales pages, and vendor reputation to identify winners. Products with gravity scores between twenty to fifty often provide the best balance of competition and conversion potential."
    },
    {
      startTime: 40,
      endTime: 55,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Traffic%20Generation&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Traffic Generation Methods",
      narration: "Traffic generation for ClickBank requires understanding buyer intent. Paid advertising through Facebook and Google, content marketing, YouTube reviews, and email marketing all work when executed properly. The key is matching traffic temperature to the right funnel approach."
    },
    {
      startTime: 55,
      endTime: 70,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Email%20Funnels&txt-size=38&txt-color=white&txt-align=center,middle",
      text: "Email Marketing Funnels",
      narration: "Email marketing funnels are crucial for ClickBank success. Building a list allows you to promote multiple products over time, increasing customer lifetime value. Successful affiliates often make more money from email follow-ups than the initial sale."
    },
    {
      startTime: 70,
      endTime: 85,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Commission%20Optimization&txt-size=32&txt-color=white&txt-align=center,middle",
      text: "Commission Optimization",
      narration: "Advanced ClickBank affiliates optimize every element of their campaigns. From split-testing ad creatives to optimizing landing pages and email sequences, small improvements compound into massive profit increases. We'll show you exactly what to test and how."
    },
    {
      startTime: 85,
      endTime: 100,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Scaling%20Strategies&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Scaling for Success",
      narration: "Scaling ClickBank campaigns requires systematic approaches. Successful affiliates reinvest profits into more traffic, expand to new products, and build teams to manage multiple campaigns simultaneously. The goal is creating passive income systems."
    },
    {
      startTime: 100,
      endTime: 120,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Claim%20Your%20Share&txt-size=36&txt-color=gold&txt-align=center,middle&bg=gradient(45deg,purple,blue)",
      text: "Claim Your Share Today!",
      narration: "ClickBank processes over two hundred million dollars in sales annually. Your share of this massive marketplace is waiting. Start implementing these proven strategies today and begin your journey to ClickBank success!"
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "professional-business",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  };
};

const generateFacebookAdsVideoContent = (subject: string): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 10,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80&overlay=text&txt=Facebook%20Ads%20Mastery&txt-size=36&txt-color=white&txt-align=center,middle&bg=gradient(45deg,blue,purple)",
      text: "Facebook Ads Mastery",
      narration: "Master Facebook Ads with our comprehensive blueprint! With over one billion active users, Facebook offers unparalleled opportunities for monetization. Whether you're a beginner or experienced, our strategies will help you reach your full potential."
    },
    {
      startTime: 10,
      endTime: 25,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80&overlay=text&txt=300%25%20ROI&txt-size=52&txt-color=green&txt-align=center,middle",
      text: "300% ROI System",
      narration: "Achieve three hundred percent return on investment with proven strategies! Our system is designed to help you maximize your ad spend and reach your target audience with precision."
    },
    {
      startTime: 25,
      endTime: 40,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80&overlay=text&txt=Audience%20Targeting&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Advanced Targeting",
      narration: "Discover advanced Facebook audience targeting strategies that convert. With our tools and techniques, you can reach the right people and drive real results."
    },
    {
      startTime: 40,
      endTime: 55,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Ad%20Creatives&txt-size=40&txt-color=white&txt-align=center,middle",
      text: "High-Converting Creatives",
      narration: "Create high-converting ad creatives using proven formulas. Our team of experts will help you craft compelling ads that capture the attention of your target audience."
    },
    {
      startTime: 55,
      endTime: 70,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Manager%20Optimization&txt-size=32&txt-color=white&txt-align=center,middle",
      text: "Ads Manager Mastery",
      narration: "Master Facebook Ads Manager optimization techniques for maximum results. Our strategies will help you optimize your ad spend, improve ad performance, and drive more conversions."
    },
    {
      startTime: 70,
      endTime: 85,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Retargeting%20Campaigns&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Retargeting That Converts",
      narration: "Build retargeting campaigns that convert prospects into customers. Our strategies will help you create effective retargeting campaigns that drive more sales and improve your overall ad performance."
    },
    {
      startTime: 85,
      endTime: 100,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Budget%20Optimization&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Smart Budget Optimization",
      narration: "Optimize your budget for maximum return on ad spend. Our strategies will help you maximize your ad spend and reach your target audience with precision."
    },
    {
      startTime: 100,
      endTime: 115,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Scale%20Successfully&txt-size=38&txt-color=white&txt-align=center,middle",
      text: "Scaling Success",
      narration: "Learn how to scale successful Facebook ad campaigns profitably. Our strategies will help you optimize your ad spend, improve ad performance, and drive more conversions."
    },
    {
      startTime: 115,
      endTime: 120,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80&overlay=text&txt=Dominate%20Today&txt-size=40&txt-color=gold&txt-align=center,middle&bg=gradient(45deg,blue,green)",
      text: "Dominate Facebook Today!",
      narration: "Start dominating Facebook advertising today! Our comprehensive system will help you reach your full potential and drive real results."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "tech-professional",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  };
};

const generateWorkFromHomeVideoContent = (subject: string): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 10,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&q=80&overlay=text&txt=Work%20From%20Home%20Success&txt-size=32&txt-color=white&txt-align=center,middle&bg=gradient(45deg,green,blue)",
      text: "Work From Home Success",
      narration: "Transform your home into a profit-generating headquarters! With over one billion active users, TikTok offers unparalleled opportunities for monetization. Whether you're a beginner or experienced, our strategies will help you reach your full potential."
    },
    {
      startTime: 10,
      endTime: 25,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80&overlay=text&txt=Financial%20Freedom&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Complete Financial Freedom",
      narration: "Say goodbye to the daily commute and hello to financial freedom! With our comprehensive system, you'll learn how to build a sustainable income stream that provides the freedom you've always wanted."
    },
    {
      startTime: 25,
      endTime: 40,
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop&q=80&overlay=text&txt=7%20Business%20Models&txt-size=38&txt-color=white&txt-align=center,middle",
      text: "7 Proven Business Models",
      narration: "Discover seven proven online business models for home-based success. With our strategies, you'll learn how to build a sustainable income stream that provides the freedom you've always wanted."
    },
    {
      startTime: 40,
      endTime: 55,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&q=80&overlay=text&txt=Step-by-Step%20Guides&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Step-by-Step Setup",
      narration: "Get step-by-step setup guides for each home income stream. With our strategies, you'll learn how to build a sustainable income stream that provides the freedom you've always wanted."
    },
    {
      startTime: 55,
      endTime: 70,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80&overlay=text&txt=Home%20Office%20Optimization&txt-size=32&txt-color=white&txt-align=center,middle",
      text: "Optimize Your Home Office",
      narration: "Learn home office optimization for maximum productivity and profit. With our strategies, you'll learn how to build a sustainable income stream that provides the freedom you've always wanted."
    },
    {
      startTime: 70,
      endTime: 85,
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop&q=80&overlay=text&txt=Work-Life%20Balance&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Perfect Work-Life Balance",
      narration: "Master time management strategies for perfect work-life balance. With our strategies, you'll learn how to build a sustainable income stream that provides the freedom you've always wanted."
    },
    {
      startTime: 85,
      endTime: 100,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&q=80&overlay=text&txt=Scale%20Your%20Earnings&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Scale Your Home Earnings",
      narration: "Use scaling techniques to increase your home-based earnings exponentially. With our strategies, you'll learn how to build a sustainable income stream that provides the freedom you've always wanted."
    },
    {
      startTime: 100,
      endTime: 115,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80&overlay=text&txt=Build%20Your%20Empire&txt-size=36&txt-color=gold&txt-align=center,middle&bg=gradient(45deg,purple,green)",
      text: "Build Your Home Empire!",
      narration: "Start building your home-based empire today! With our comprehensive system, you'll learn how to build a sustainable income stream that provides the freedom you've always wanted."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "inspiring-home",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  };
};

const generateAffiliateMarketingVideoContent = (subject: string): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 10,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Affiliate%20Marketing%20Mastery&txt-size=32&txt-color=white&txt-align=center,middle&bg=gradient(45deg,orange,red)",
      text: "Affiliate Marketing Mastery",
      narration: "Welcome to Affiliate Marketing Mastery! With over one billion active users, TikTok offers unparalleled opportunities for monetization. Whether you're a beginner or experienced, our strategies will help you reach your full potential."
    },
    {
      startTime: 10,
      endTime: 25,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Commission%20Domination&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Commission Domination",
      narration: "Your gateway to commission domination and passive income! With our comprehensive system, you'll learn how to build a sustainable affiliate marketing business that generates passive income."
    },
    {
      startTime: 25,
      endTime: 40,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Niche%20Selection&txt-size=38&txt-color=white&txt-align=center,middle",
      text: "Profitable Niche Selection",
      narration: "Master profitable niche selection and product promotion strategies. With our strategies, you'll learn how to build a sustainable affiliate marketing business that generates passive income."
    },
    {
      startTime: 40,
      endTime: 55,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Traffic%20Generation&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Advanced Traffic Generation",
      narration: "Learn advanced traffic generation strategies that convert into sales. With our strategies, you'll learn how to build a sustainable affiliate marketing business that generates passive income."
    },
    {
      startTime: 55,
      endTime: 70,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=High-Converting%20Products&txt-size=30&txt-color=white&txt-align=center,middle",
      text: "High-Converting Products",
      narration: "Discover how to promote high-converting products effectively. With our strategies, you'll learn how to build a sustainable affiliate marketing business that generates passive income."
    },
    {
      startTime: 70,
      endTime: 85,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Campaign%20Optimization&txt-size=32&txt-color=white&txt-align=center,middle",
      text: "Campaign Optimization",
      narration: "Optimize your campaigns for maximum commissions and profitability. With our strategies, you'll learn how to build a sustainable affiliate marketing business that generates passive income."
    },
    {
      startTime: 85,
      endTime: 100,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Sustainable%20Business&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Build Sustainable Income",
      narration: "Build a sustainable affiliate marketing business that generates passive income. With our strategies, you'll learn how to build a sustainable affiliate marketing business that generates passive income."
    },
    {
      startTime: 100,
      endTime: 115,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Start%20Your%20Success&txt-size=36&txt-color=gold&txt-align=center,middle&bg=gradient(45deg,purple,orange)",
      text: "Start Your Success Journey!",
      narration: "Start your journey to affiliate marketing success today! With our comprehensive system, you'll learn how to build a sustainable affiliate marketing business that generates passive income."
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "motivational-success",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  };
};

const generateGenericVideoContent = (subject: string): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 20,
      image: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=${encodeURIComponent(subject)}&txt-size=36&txt-color=white&txt-align=center,middle&bg=gradient(45deg,purple,blue)`,
      text: subject,
      narration: `Discover powerful strategies for ${subject}! This comprehensive system will teach you proven methods that generate real results. Whether you're a beginner or experienced, these techniques will transform your approach.`
    },
    {
      startTime: 20,
      endTime: 40,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Proven%20Methods&txt-size=40&txt-color=white&txt-align=center,middle",
      text: "Proven Methods",
      narration: "These aren't theoretical concepts, but battle-tested strategies used by successful entrepreneurs worldwide. Every technique has been refined through real-world application and proven to deliver consistent results when properly implemented."
    },
    {
      startTime: 40,
      endTime: 60,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Advanced%20Techniques&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Advanced Techniques",
      narration: "Master advanced techniques that separate professionals from amateurs. These sophisticated strategies require dedication but deliver exponential returns. Learn the insider secrets that top performers use to dominate their markets."
    },
    {
      startTime: 60,
      endTime: 80,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Income%20Streams&txt-size=38&txt-color=white&txt-align=center,middle",
      text: "Build Income Streams",
      narration: "Creating multiple income streams is essential for financial security and growth. We'll show you how to systematically build and scale various revenue sources that work together synergistically to maximize your earning potential."
    },
    {
      startTime: 80,
      endTime: 100,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Transform%20Your%20Future&txt-size=32&txt-color=white&txt-align=center,middle",
      text: "Transform Your Future",
      narration: "This comprehensive system will transform your financial future. By implementing these strategies consistently, you'll build a sustainable business that generates passive income and provides the freedom you've always wanted."
    },
    {
      startTime: 100,
      endTime: 120,
      image: `https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Start%20Today&txt-size=44&txt-color=gold&txt-align=center,middle&bg=gradient(45deg,green,blue)`,
      text: "Start Today!",
      narration: "Your journey to success starts today! Don't wait for the perfect moment. Take action now and begin implementing these proven strategies. Your future self will thank you!"
    }
  ];

  return {
    totalDuration: 120,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "inspirational-generic",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
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
