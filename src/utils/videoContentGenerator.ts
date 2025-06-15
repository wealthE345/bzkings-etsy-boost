
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
}

// Generate synchronized video content based on campaign subject
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
      endTime: 3,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80&overlay=text&txt=TikTok%20Money%20Mastery&txt-size=42&txt-color=white&txt-align=center,middle&bg=gradient(45deg,purple,pink)",
      text: "TikTok Money Mastery",
      narration: "Welcome to TikTok Money Mastery!"
    },
    {
      startTime: 3,
      endTime: 8,
      image: "https://images.unsplash.com/photo-1570194065650-d99bf9d4d665?w=800&h=600&fit=crop&q=80&overlay=text&txt=Transform%20Your%20Passion&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Transform Your Passion Into Profit",
      narration: "Transform your TikTok passion into serious profit!"
    },
    {
      startTime: 8,
      endTime: 13,
      image: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&h=600&fit=crop&q=80&overlay=text&txt=%241000%2B%20Monthly&txt-size=48&txt-color=green&txt-align=center,middle",
      text: "$1000+ Monthly Earnings",
      narration: "Learn how creators are earning thousands monthly through viral content."
    },
    {
      startTime: 13,
      endTime: 18,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80&overlay=text&txt=Creator%20Fund%20Mastery&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Master the Creator Fund",
      narration: "Master the TikTok Creator Fund and maximize your earnings."
    },
    {
      startTime: 18,
      endTime: 23,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&q=80&overlay=text&txt=Brand%20Partnerships&txt-size=38&txt-color=white&txt-align=center,middle",
      text: "Lucrative Brand Partnerships",
      narration: "Build your personal brand and negotiate lucrative partnerships."
    },
    {
      startTime: 23,
      endTime: 28,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Viral%20Content%20Formula&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Viral Content Creation",
      narration: "Create engaging viral videos that capture millions of views."
    },
    {
      startTime: 28,
      endTime: 33,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Trending%20Hashtags&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Trending Hashtag Strategy",
      narration: "Use trending hashtags effectively to reach massive audiences."
    },
    {
      startTime: 33,
      endTime: 38,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Income%20Streams&txt-size=40&txt-color=white&txt-align=center,middle",
      text: "Multiple Income Streams",
      narration: "Turn your followers into multiple profitable income streams."
    },
    {
      startTime: 38,
      endTime: 42,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Start%20Today&txt-size=44&txt-color=gold&txt-align=center,middle&bg=gradient(45deg,purple,blue)",
      text: "Start Your Journey Today!",
      narration: "Start your TikTok money-making journey today!"
    }
  ];

  return {
    totalDuration: 42,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "upbeat-social-media"
  };
};

const generateClickBankVideoContent = (subject: string): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 3,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=ClickBank%20Profit%20System&txt-size=36&txt-color=white&txt-align=center,middle&bg=gradient(45deg,green,blue)",
      text: "ClickBank Profit System",
      narration: "Unlock the ClickBank profit system!"
    },
    {
      startTime: 3,
      endTime: 8,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=%24500%2B%20Daily&txt-size=48&txt-color=green&txt-align=center,middle",
      text: "$500+ Daily Commissions",
      narration: "Generate five hundred plus dollars daily for smart affiliates!"
    },
    {
      startTime: 8,
      endTime: 13,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Product%20Selection&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Winning Product Selection",
      narration: "Learn high-converting product selection strategies specific to ClickBank."
    },
    {
      startTime: 13,
      endTime: 18,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Traffic%20Generation&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Traffic Generation Methods",
      narration: "Master traffic generation methods that work with ClickBank offers."
    },
    {
      startTime: 18,
      endTime: 23,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Email%20Funnels&txt-size=38&txt-color=white&txt-align=center,middle",
      text: "Email Marketing Funnels",
      narration: "Build email marketing funnels optimized for ClickBank success."
    },
    {
      startTime: 23,
      endTime: 28,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Commission%20Optimization&txt-size=32&txt-color=white&txt-align=center,middle",
      text: "Commission Optimization",
      narration: "Use advanced promotion techniques and commission optimization tactics."
    },
    {
      startTime: 28,
      endTime: 33,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Scaling%20Strategies&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Scaling for Success",
      narration: "Learn scaling strategies for sustainable ClickBank income."
    },
    {
      startTime: 33,
      endTime: 37,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Claim%20Your%20Share&txt-size=36&txt-color=gold&txt-align=center,middle&bg=gradient(45deg,purple,blue)",
      text: "Claim Your Share Today!",
      narration: "Ready to claim your share of ClickBank profits? Get started now!"
    }
  ];

  return {
    totalDuration: 37,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "professional-business"
  };
};

const generateFacebookAdsVideoContent = (subject: string): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 3,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80&overlay=text&txt=Facebook%20Ads%20Mastery&txt-size=36&txt-color=white&txt-align=center,middle&bg=gradient(45deg,blue,purple)",
      text: "Facebook Ads Mastery",
      narration: "Master Facebook Ads with our comprehensive blueprint!"
    },
    {
      startTime: 3,
      endTime: 8,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80&overlay=text&txt=300%25%20ROI&txt-size=52&txt-color=green&txt-align=center,middle",
      text: "300% ROI System",
      narration: "Achieve three hundred percent return on investment with proven strategies!"
    },
    {
      startTime: 8,
      endTime: 13,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80&overlay=text&txt=Audience%20Targeting&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Advanced Targeting",
      narration: "Discover advanced Facebook audience targeting strategies that convert."
    },
    {
      startTime: 13,
      endTime: 18,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Ad%20Creatives&txt-size=40&txt-color=white&txt-align=center,middle",
      text: "High-Converting Creatives",
      narration: "Create high-converting ad creatives using proven formulas."
    },
    {
      startTime: 18,
      endTime: 23,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Manager%20Optimization&txt-size=32&txt-color=white&txt-align=center,middle",
      text: "Ads Manager Mastery",
      narration: "Master Facebook Ads Manager optimization techniques for maximum results."
    },
    {
      startTime: 23,
      endTime: 28,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Retargeting%20Campaigns&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Retargeting That Converts",
      narration: "Build retargeting campaigns that convert prospects into customers."
    },
    {
      startTime: 28,
      endTime: 33,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Budget%20Optimization&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Smart Budget Optimization",
      narration: "Optimize your budget for maximum return on ad spend."
    },
    {
      startTime: 33,
      endTime: 38,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Scale%20Successfully&txt-size=38&txt-color=white&txt-align=center,middle",
      text: "Scaling Success",
      narration: "Learn how to scale successful Facebook ad campaigns profitably."
    },
    {
      startTime: 38,
      endTime: 42,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80&overlay=text&txt=Dominate%20Today&txt-size=40&txt-color=gold&txt-align=center,middle&bg=gradient(45deg,blue,green)",
      text: "Dominate Facebook Today!",
      narration: "Start dominating Facebook advertising today!"
    }
  ];

  return {
    totalDuration: 42,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "tech-professional"
  };
};

const generateWorkFromHomeVideoContent = (subject: string): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 3,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&q=80&overlay=text&txt=Work%20From%20Home%20Success&txt-size=32&txt-color=white&txt-align=center,middle&bg=gradient(45deg,green,blue)",
      text: "Work From Home Success",
      narration: "Transform your home into a profit-generating headquarters!"
    },
    {
      startTime: 3,
      endTime: 8,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80&overlay=text&txt=Financial%20Freedom&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Complete Financial Freedom",
      narration: "Say goodbye to the daily commute and hello to financial freedom!"
    },
    {
      startTime: 8,
      endTime: 13,
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop&q=80&overlay=text&txt=7%20Business%20Models&txt-size=38&txt-color=white&txt-align=center,middle",
      text: "7 Proven Business Models",
      narration: "Discover seven proven online business models for home-based success."
    },
    {
      startTime: 13,
      endTime: 18,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&q=80&overlay=text&txt=Step-by-Step%20Guides&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Step-by-Step Setup",
      narration: "Get step-by-step setup guides for each home income stream."
    },
    {
      startTime: 18,
      endTime: 23,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80&overlay=text&txt=Home%20Office%20Optimization&txt-size=32&txt-color=white&txt-align=center,middle",
      text: "Optimize Your Home Office",
      narration: "Learn home office optimization for maximum productivity and profit."
    },
    {
      startTime: 23,
      endTime: 28,
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop&q=80&overlay=text&txt=Work-Life%20Balance&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Perfect Work-Life Balance",
      narration: "Master time management strategies for perfect work-life balance."
    },
    {
      startTime: 28,
      endTime: 33,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&q=80&overlay=text&txt=Scale%20Your%20Earnings&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Scale Your Home Earnings",
      narration: "Use scaling techniques to increase your home-based earnings exponentially."
    },
    {
      startTime: 33,
      endTime: 37,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80&overlay=text&txt=Build%20Your%20Empire&txt-size=36&txt-color=gold&txt-align=center,middle&bg=gradient(45deg,purple,green)",
      text: "Build Your Home Empire!",
      narration: "Start building your home-based empire today!"
    }
  ];

  return {
    totalDuration: 37,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "inspiring-home"
  };
};

const generateAffiliateMarketingVideoContent = (subject: string): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 3,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Affiliate%20Marketing%20Mastery&txt-size=32&txt-color=white&txt-align=center,middle&bg=gradient(45deg,orange,red)",
      text: "Affiliate Marketing Mastery",
      narration: "Welcome to Affiliate Marketing Mastery!"
    },
    {
      startTime: 3,
      endTime: 8,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Commission%20Domination&txt-size=36&txt-color=white&txt-align=center,middle",
      text: "Commission Domination",
      narration: "Your gateway to commission domination and passive income!"
    },
    {
      startTime: 8,
      endTime: 13,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Niche%20Selection&txt-size=38&txt-color=white&txt-align=center,middle",
      text: "Profitable Niche Selection",
      narration: "Master profitable niche selection and product promotion strategies."
    },
    {
      startTime: 13,
      endTime: 18,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Traffic%20Generation&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Advanced Traffic Generation",
      narration: "Learn advanced traffic generation strategies that convert into sales."
    },
    {
      startTime: 18,
      endTime: 23,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=High-Converting%20Products&txt-size=30&txt-color=white&txt-align=center,middle",
      text: "High-Converting Products",
      narration: "Discover how to promote high-converting products effectively."
    },
    {
      startTime: 23,
      endTime: 28,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Campaign%20Optimization&txt-size=32&txt-color=white&txt-align=center,middle",
      text: "Campaign Optimization",
      narration: "Optimize your campaigns for maximum commissions and profitability."
    },
    {
      startTime: 28,
      endTime: 33,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Sustainable%20Business&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Build Sustainable Income",
      narration: "Build a sustainable affiliate marketing business that generates passive income."
    },
    {
      startTime: 33,
      endTime: 37,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Start%20Your%20Success&txt-size=36&txt-color=gold&txt-align=center,middle&bg=gradient(45deg,purple,orange)",
      text: "Start Your Success Journey!",
      narration: "Start your journey to affiliate marketing success today!"
    }
  ];

  return {
    totalDuration: 37,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "motivational-success"
  };
};

const generateGenericVideoContent = (subject: string): SynchronizedVideoContent => {
  const segments: VideoSegment[] = [
    {
      startTime: 0,
      endTime: 5,
      image: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=${encodeURIComponent(subject)}&txt-size=36&txt-color=white&txt-align=center,middle&bg=gradient(45deg,purple,blue)`,
      text: subject,
      narration: `Discover powerful strategies for ${subject}!`
    },
    {
      startTime: 5,
      endTime: 10,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Proven%20Methods&txt-size=40&txt-color=white&txt-align=center,middle",
      text: "Proven Methods",
      narration: "Learn proven methods that generate real results."
    },
    {
      startTime: 10,
      endTime: 15,
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Advanced%20Techniques&txt-size=34&txt-color=white&txt-align=center,middle",
      text: "Advanced Techniques",
      narration: "Master advanced techniques used by successful entrepreneurs."
    },
    {
      startTime: 15,
      endTime: 20,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&overlay=text&txt=Income%20Streams&txt-size=38&txt-color=white&txt-align=center,middle",
      text: "Build Income Streams",
      narration: "Build sustainable income streams and scale systematically."
    },
    {
      startTime: 20,
      endTime: 25,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&overlay=text&txt=Transform%20Your%20Future&txt-size=32&txt-color=white&txt-align=center,middle",
      text: "Transform Your Future",
      narration: "Transform your financial future with our comprehensive system."
    },
    {
      startTime: 25,
      endTime: 30,
      image: `https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&q=80&overlay=text&txt=Start%20Today&txt-size=44&txt-color=gold&txt-align=center,middle&bg=gradient(45deg,green,blue)`,
      text: "Start Today!",
      narration: "Start your journey to success today!"
    }
  ];

  return {
    totalDuration: 30,
    segments,
    fullNarration: segments.map(s => s.narration).join(' '),
    backgroundMusic: "inspirational-generic"
  };
};

// Function to get the current video segment based on time
export const getCurrentVideoSegment = (content: SynchronizedVideoContent, currentTime: number): VideoSegment | null => {
  return content.segments.find(segment => 
    currentTime >= segment.startTime && currentTime < segment.endTime
  ) || null;
};

// Function to get synchronized narration text for real-time highlighting
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
