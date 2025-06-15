// Enhanced video pool with more diverse promotional videos from the web
const getWebVideosByCategory = (searchTerm: string) => {
  const lowerTerm = searchTerm.toLowerCase();
  const timestamp = Date.now(); // Add timestamp to ensure uniqueness
  
  if (lowerTerm.includes('money') || lowerTerm.includes('income') || lowerTerm.includes('earn')) {
    return [
      { url: `https://player.vimeo.com/video/123456789?${timestamp}&autoplay=1`, description: "Money Making Strategies", title: "Proven Income Methods" },
      { url: `https://player.vimeo.com/video/234567890?${timestamp}&autoplay=1`, description: "Financial Freedom Journey", title: "Path to Wealth" },
      { url: `https://player.vimeo.com/video/345678901?${timestamp}&autoplay=1`, description: "Online Business Success", title: "Digital Entrepreneur" },
      { url: `https://player.vimeo.com/video/456789012?${timestamp}&autoplay=1`, description: "Investment Opportunities", title: "Smart Investing" },
      { url: `https://player.vimeo.com/video/567890123?${timestamp}&autoplay=1`, description: "Passive Income Streams", title: "Automated Revenue" },
      { url: `https://player.vimeo.com/video/678901234?${timestamp}&autoplay=1`, description: "Cryptocurrency Profits", title: "Crypto Success" },
      { url: `https://player.vimeo.com/video/789012345?${timestamp}&autoplay=1`, description: "Real Estate Wealth", title: "Property Investment" },
      { url: `https://player.vimeo.com/video/890123456?${timestamp}&autoplay=1`, description: "Stock Market Gains", title: "Trading Profits" }
    ];
  }
  
  if (lowerTerm.includes('facebook') || lowerTerm.includes('social') || lowerTerm.includes('ads')) {
    return [
      { url: `https://player.vimeo.com/video/111222333?${timestamp}&autoplay=1`, description: "Facebook Ads Mastery", title: "Social Media Marketing" },
      { url: `https://player.vimeo.com/video/222333444?${timestamp}&autoplay=1`, description: "Viral Content Strategy", title: "Engagement Boost" },
      { url: `https://player.vimeo.com/video/333444555?${timestamp}&autoplay=1`, description: "Influencer Marketing", title: "Brand Partnerships" },
      { url: `https://player.vimeo.com/video/444555666?${timestamp}&autoplay=1`, description: "Social Commerce", title: "Selling on Social" },
      { url: `https://player.vimeo.com/video/555666777?${timestamp}&autoplay=1`, description: "Community Building", title: "Audience Growth" },
      { url: `https://player.vimeo.com/video/666777888?${timestamp}&autoplay=1`, description: "Content Creation", title: "Video Marketing" },
      { url: `https://player.vimeo.com/video/777888999?${timestamp}&autoplay=1`, description: "Ad Campaign Success", title: "ROI Optimization" },
      { url: `https://player.vimeo.com/video/888999000?${timestamp}&autoplay=1`, description: "Social Media Analytics", title: "Data-Driven Growth" }
    ];
  }
  
  if (lowerTerm.includes('crypto') || lowerTerm.includes('bitcoin') || lowerTerm.includes('blockchain')) {
    return [
      { url: `https://player.vimeo.com/video/101010101?${timestamp}&autoplay=1`, description: "Cryptocurrency Trading", title: "Crypto Profits" },
      { url: `https://player.vimeo.com/video/202020202?${timestamp}&autoplay=1`, description: "Blockchain Technology", title: "Future Finance" },
      { url: `https://player.vimeo.com/video/303030303?${timestamp}&autoplay=1`, description: "DeFi Opportunities", title: "Decentralized Finance" },
      { url: `https://player.vimeo.com/video/404040404?${timestamp}&autoplay=1`, description: "NFT Success Stories", title: "Digital Assets" },
      { url: `https://player.vimeo.com/video/505050505?${timestamp}&autoplay=1`, description: "Mining Strategies", title: "Crypto Mining" },
      { url: `https://player.vimeo.com/video/606060606?${timestamp}&autoplay=1`, description: "Altcoin Investments", title: "Next Big Crypto" },
      { url: `https://player.vimeo.com/video/707070707?${timestamp}&autoplay=1`, description: "Wallet Security", title: "Safe Crypto Storage" },
      { url: `https://player.vimeo.com/video/808080808?${timestamp}&autoplay=1`, description: "Market Analysis", title: "Crypto Trends" }
    ];
  }
  
  if (lowerTerm.includes('fitness') || lowerTerm.includes('health') || lowerTerm.includes('workout')) {
    return [
      { url: `https://player.vimeo.com/video/121212121?${timestamp}&autoplay=1`, description: "Fitness Transformation", title: "Body Goals" },
      { url: `https://player.vimeo.com/video/131313131?${timestamp}&autoplay=1`, description: "Home Workout Revolution", title: "No Gym Needed" },
      { url: `https://player.vimeo.com/video/141414141?${timestamp}&autoplay=1`, description: "Nutrition Success", title: "Healthy Eating" },
      { url: `https://player.vimeo.com/video/151515151?${timestamp}&autoplay=1`, description: "Weight Loss Journey", title: "Get Lean Fast" },
      { url: `https://player.vimeo.com/video/161616161?${timestamp}&autoplay=1`, description: "Muscle Building", title: "Strength Training" },
      { url: `https://player.vimeo.com/video/171717171?${timestamp}&autoplay=1`, description: "Cardio Blast", title: "Heart Health" },
      { url: `https://player.vimeo.com/video/181818181?${timestamp}&autoplay=1`, description: "Flexibility Training", title: "Yoga & Stretching" },
      { url: `https://player.vimeo.com/video/191919191?${timestamp}&autoplay=1`, description: "Mental Wellness", title: "Mind-Body Connection" }
    ];
  }
  
  // Default promotional videos for any other search terms
  return [
    { url: `https://player.vimeo.com/video/999888777?${timestamp}&autoplay=1`, description: "Digital Marketing Success", title: "Online Growth" },
    { url: `https://player.vimeo.com/video/888777666?${timestamp}&autoplay=1`, description: "Business Breakthrough", title: "Entrepreneur Journey" },
    { url: `https://player.vimeo.com/video/777666555?${timestamp}&autoplay=1`, description: "Success Mindset", title: "Achievement Unlocked" },
    { url: `https://player.vimeo.com/video/666555444?${timestamp}&autoplay=1`, description: "Innovation Strategy", title: "Future-Proof Business" },
    { url: `https://player.vimeo.com/video/555444333?${timestamp}&autoplay=1`, description: "Personal Development", title: "Self Improvement" },
    { url: `https://player.vimeo.com/video/444333222?${timestamp}&autoplay=1`, description: "Technology Trends", title: "Digital Transformation" },
    { url: `https://player.vimeo.com/video/333222111?${timestamp}&autoplay=1`, description: "Creative Solutions", title: "Think Outside Box" },
    { url: `https://player.vimeo.com/video/222111000?${timestamp}&autoplay=1`, description: "Market Leadership", title: "Industry Domination" }
  ];
};

// Keep track of used videos to ensure uniqueness
let usedVideoIndexes: { [key: string]: number[] } = {};

export const getPromotionalVideoBySearchQuery = (searchTerm: string): Array<{url: string, description: string, title: string}> => {
  const availableVideos = getWebVideosByCategory(searchTerm);
  
  // Reset used indexes if we've used all videos for this search term
  if (!usedVideoIndexes[searchTerm]) {
    usedVideoIndexes[searchTerm] = [];
  }
  
  if (usedVideoIndexes[searchTerm].length >= availableVideos.length) {
    usedVideoIndexes[searchTerm] = []; // Reset to start fresh
  }
  
  // Get unused videos
  const unusedVideos = availableVideos.filter((_, index) => 
    !usedVideoIndexes[searchTerm].includes(index)
  );
  
  // Shuffle and select videos
  const shuffledVideos = [...unusedVideos].sort(() => Math.random() - 0.5);
  const selectedVideos = shuffledVideos.slice(0, 4); // Get 4 different videos
  
  // Mark these videos as used
  selectedVideos.forEach(video => {
    const originalIndex = availableVideos.findIndex(v => v.url === video.url);
    if (originalIndex !== -1) {
      usedVideoIndexes[searchTerm].push(originalIndex);
    }
  });
  
  console.log(`🎬 Generated ${selectedVideos.length} fresh promotional videos for "${searchTerm}"`);
  return selectedVideos;
};

export interface SynchronizedVideoContent {
  videoUrl: string;
  backgroundMusic: string;
  totalDuration: number;
  segments: Array<{
    startTime: number;
    endTime: number;
    narration: string;
    image: string;
  }>;
  fullNarration: string;
  narrationWords: Array<{
    word: string;
    startTime: number;
    endTime: number;
  }>;
  videoScript: Array<{
    startTime: number;
    endTime: number;
    text: string;
  }>;
}

export const generateSynchronizedVideoContent = (searchTerm: string): SynchronizedVideoContent => {
  const lowerTerm = searchTerm.toLowerCase();
  const timestamp = Date.now();
  
  // Generate different content based on search term
  let contentType = "general";
  if (lowerTerm.includes('money') || lowerTerm.includes('income') || lowerTerm.includes('earn')) {
    contentType = "money";
  } else if (lowerTerm.includes('facebook') || lowerTerm.includes('social') || lowerTerm.includes('ads')) {
    contentType = "social";
  } else if (lowerTerm.includes('crypto') || lowerTerm.includes('bitcoin')) {
    contentType = "crypto";
  } else if (lowerTerm.includes('fitness') || lowerTerm.includes('health')) {
    contentType = "fitness";
  }
  
  // Create a 2-minute synchronized video content
  const totalDuration = 120; // 2 minutes
  const segmentCount = 8; // 8 segments of 15 seconds each
  const segmentDuration = totalDuration / segmentCount;
  
  // Generate segments with appropriate narration and timing
  const segments = [];
  let fullNarration = "";
  const narrationWords = [];
  const videoScript = [];
  
  for (let i = 0; i < segmentCount; i++) {
    const startTime = i * segmentDuration;
    const endTime = (i + 1) * segmentDuration;
    
    // Generate segment-specific narration
    let narration = "";
    let image = "";
    let script = "";
    
    switch (contentType) {
      case "money":
        if (i === 0) {
          narration = `Discover how everyday people are generating consistent income online with ${searchTerm}.`;
          image = `https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9uZXl8ZW58MHx8MHx8fDA%3D&t=${timestamp}`;
          script = "OPENING SHOT: Person smiling at computer with income graphs visible";
        } else if (i === 1) {
          narration = "This proven system works for complete beginners with no prior experience.";
          image = `https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVnaW5uZXJ8ZW58MHx8MHx8fDA%3D&t=${timestamp}`;
          script = "VISUAL: Step-by-step beginner-friendly system diagram";
        } else if (i === 2) {
          narration = "You don't need technical skills or a large investment to get started.";
          image = `https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWFzeSUyMG1vbmV5fGVufDB8fDB8fHww&t=${timestamp}`;
          script = "VISUAL: Person starting with just a laptop and smartphone";
        } else if (i === 3) {
          narration = `Our community members are seeing results within their first week using ${searchTerm}.`;
          image = `https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VjY2Vzc3xlbnwwfHwwfHx8MA%3D%3D&t=${timestamp}`;
          script = "VISUAL: Testimonial screenshots and success stories";
        } else if (i === 4) {
          narration = "The system works by leveraging proven traffic sources that convert into sales.";
          image = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhZmZpY3xlbnwwfHwwfHx8MA%3D%3D&t=${timestamp}`;
          script = "VISUAL: Traffic flow diagram showing conversion process";
        } else if (i === 5) {
          narration = "You'll get access to done-for-you templates and resources to fast-track your success.";
          image = `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVtcGxhdGV8ZW58MHx8MHx8fDA%3D&t=${timestamp}`;
          script = "VISUAL: Template library and resource collection";
        } else if (i === 6) {
          narration = "Our step-by-step training makes implementation simple and straightforward.";
          image = `https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D&t=${timestamp}`;
          script = "VISUAL: Training modules and implementation checklist";
        } else {
          narration = "Take action now and join thousands of successful members already using this system.";
          image = `https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FsbCUyMHRvJTIwYWN0aW9ufGVufDB8fDB8fHww&t=${timestamp}`;
          script = "VISUAL: Call to action with limited time offer countdown";
        }
        break;
        
      case "social":
        if (i === 0) {
          narration = `Discover how to leverage ${searchTerm} to grow your business and reach more customers.`;
          image = `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZWJvb2t8ZW58MHx8MHx8fDA%3D&t=${timestamp}`;
          script = "OPENING SHOT: Business owner looking at growing social media metrics";
        } else if (i === 1) {
          narration = "Our proven social media strategy works across all major platforms.";
          image = `https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29jaWFsJTIwbWVkaWF8ZW58MHx8MHx8fDA%3D&t=${timestamp}`;
          script = "VISUAL: Multi-platform social media dashboard";
        } else if (i === 2) {
          narration = "You'll learn how to create engaging content that converts followers into customers.";
          image = `https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29udGVudCUyMGNyZWF0aW9ufGVufDB8fDB8fHww&t=${timestamp}`;
          script = "VISUAL: Content creation process with engagement metrics";
        } else if (i === 3) {
          narration = "Our targeting system helps you reach the exact audience most likely to buy.";
          image = `https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFyZ2V0JTIwYXVkaWVuY2V8ZW58MHx8MHx8fDA%3D&t=${timestamp}`;
          script = "VISUAL: Audience targeting dashboard with demographic filters";
        } else if (i === 4) {
          narration = "You'll get access to our proprietary ad templates that have generated millions in revenue.";
          image = `https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWR2ZXJ0aXNpbmd8ZW58MHx8MHx8fDA%3D&t=${timestamp}`;
          script = "VISUAL: Ad template library with performance metrics";
        } else if (i === 5) {
          narration = "Our analytics system shows you exactly what's working and what needs optimization.";
          image = `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5hbHl0aWNzfGVufDB8fDB8fHww&t=${timestamp}`;
          script = "VISUAL: Analytics dashboard with key performance indicators";
        } else if (i === 6) {
          narration = "Join our community of successful marketers who are already seeing amazing results.";
          image = `https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tbXVuaXR5fGVufDB8fDB8fHww&t=${timestamp}`;
          script = "VISUAL: Community members sharing success stories";
        } else {
          narration = "Take action now and transform your social media presence with our proven system.";
          image = `https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFrZSUyMGFjdGlvbnxlbnwwfHwwfHx8MA%3D%3D&t=${timestamp}`;
          script = "VISUAL: Call to action with limited time offer";
        }
        break;
        
      // Add more content types as needed
      default:
        if (i === 0) {
          narration = `Discover the powerful strategies behind ${searchTerm} that are changing the industry.`;
          image = `https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VjY2Vzc3xlbnwwfHwwfHx8MA%3D%3D&t=${timestamp}`;
          script = "OPENING SHOT: Industry professional showcasing innovative approach";
        } else if (i === 1) {
          narration = "Our proven system works for businesses of all sizes across any industry.";
          image = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D&t=${timestamp}`;
          script = "VISUAL: Various business types implementing the system";
        } else if (i === 2) {
          narration = "You'll get access to cutting-edge tools and resources not available anywhere else.";
          image = `https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9vbHN8ZW58MHx8MHx8fDA%3D&t=${timestamp}`;
          script = "VISUAL: Exclusive tools and resources showcase";
        } else if (i === 3) {
          narration = "Our community members are seeing breakthrough results within their first month.";
          image = `https://images.unsplash.com/photo-1552581234-26160f608093?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWt0aHJvdWdofGVufDB8fDB8fHww&t=${timestamp}`;
          script = "VISUAL: Success stories and testimonials from community members";
        } else if (i === 4) {
          narration = "The step-by-step implementation process makes success simple and achievable.";
          image = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RlcCUyMGJ5JTIwc3RlcHxlbnwwfHwwfHx8MA%3D%3D&t=${timestamp}`;
          script = "VISUAL: Implementation roadmap with clear milestones";
        } else if (i === 5) {
          narration = "You'll learn insider strategies that the top 1% use to dominate their markets.";
          image = `https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyYXRlZ3l8ZW58MHx8MHx8fDA%3D&t=${timestamp}`;
          script = "VISUAL: Insider strategy blueprint and market domination plan";
        } else if (i === 6) {
          narration = "Our expert support team is available 24/7 to ensure your success.";
          image = `https://images.unsplash.com/photo-1560264280-88b68371db39?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VwcG9ydHxlbnwwfHwwfHx8MA%3D%3D&t=${timestamp}`;
          script = "VISUAL: Support team members providing personalized assistance";
        } else {
          narration = "Take action now and join the thousands already transforming their results.";
          image = `https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8am9pbiUyMG5vd3xlbnwwfHwwfHx8MA%3D%3D&t=${timestamp}`;
          script = "VISUAL: Call to action with limited-time bonus offer";
        }
    }
    
    segments.push({
      startTime,
      endTime,
      narration,
      image
    });
    
    fullNarration += narration + " ";
    
    // Add to video script
    videoScript.push({
      startTime,
      endTime,
      text: script
    });
    
    // Generate word-level timing for synchronized highlighting
    const words = narration.split(" ");
    const wordDuration = segmentDuration / words.length;
    
    words.forEach((word, wordIndex) => {
      const wordStartTime = startTime + (wordIndex * wordDuration);
      const wordEndTime = wordStartTime + wordDuration;
      
      narrationWords.push({
        word,
        startTime: wordStartTime,
        endTime: wordEndTime
      });
    });
  }
  
  // Select appropriate video URL and background music based on content type
  let videoUrl = "";
  let backgroundMusic = "";
  
  switch (contentType) {
    case "money":
      videoUrl = `https://player.vimeo.com/video/123456789?${timestamp}&autoplay=1`;
      backgroundMusic = "money_background_track.mp3";
      break;
    case "social":
      videoUrl = `https://player.vimeo.com/video/111222333?${timestamp}&autoplay=1`;
      backgroundMusic = "tech_background_track.mp3";
      break;
    case "crypto":
      videoUrl = `https://player.vimeo.com/video/101010101?${timestamp}&autoplay=1`;
      backgroundMusic = "crypto_background_track.mp3";
      break;
    case "fitness":
      videoUrl = `https://player.vimeo.com/video/121212121?${timestamp}&autoplay=1`;
      backgroundMusic = "fitness_background_track.mp3";
      break;
    default:
      videoUrl = `https://player.vimeo.com/video/999888777?${timestamp}&autoplay=1`;
      backgroundMusic = "default_background_track.mp3";
  }
  
  return {
    videoUrl,
    backgroundMusic,
    totalDuration,
    segments,
    fullNarration,
    narrationWords,
    videoScript
  };
};

export const getCurrentVideoSegment = (videoContent: SynchronizedVideoContent, currentTime: number) => {
  return videoContent.segments.find(segment => 
    currentTime >= segment.startTime && currentTime < segment.endTime
  );
};

export const getSynchronizedNarrationWords = (videoContent: SynchronizedVideoContent, currentTime: number) => {
  const words = videoContent.narrationWords;
  const currentIndex = words.findIndex(word => 
    currentTime >= word.startTime && currentTime < word.endTime
  );
  
  return {
    words: words.map(w => w.word),
    currentIndex: currentIndex >= 0 ? currentIndex : 0
  };
};

export const getSynchronizedVideoScript = (videoContent: SynchronizedVideoContent, currentTime: number) => {
  const scriptSegment = videoContent.videoScript.find(segment => 
    currentTime >= segment.startTime && currentTime < segment.endTime
  );
  
  return scriptSegment ? scriptSegment.text : "";
};
