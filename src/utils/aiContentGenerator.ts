
export const organicTrafficContent = [
  "🚀 Transform your organic traffic with AI-powered SEO strategies and cutting-edge digital tools. Our comprehensive suite helps entrepreneurs build sustainable online businesses through proven organic growth methods, advanced keyword optimization, and intelligent content marketing systems.",
  "📈 Discover the future of organic traffic generation with our AI-enhanced digital products. From automated SEO analysis to smart content optimization, everything you need to dominate search results and attract high-quality traffic that converts into loyal customers.",
  "🎯 Boost your website's organic visibility using our expert-curated collection of AI-powered SEO resources. Master technical SEO, content marketing, and organic growth strategies that have helped thousands of businesses achieve sustainable online success.",
  "💡 Master organic traffic generation with our revolutionary AI-driven digital products. Comprehensive step-by-step guides, automated SEO tools, and intelligent analytics help you build lasting online success through sustainable organic growth strategies.",
  "🌟 Unlock sustainable organic growth with our AI-powered digital marketplace. Proven strategies, intelligent templates, and cutting-edge tools designed by SEO experts help businesses achieve higher rankings, better conversions, and long-term online success.",
  "⚡ Experience the difference that AI-enhanced organic traffic makes for your business. Our digital products combine artificial intelligence with proven SEO methodologies to deliver exceptional results in search rankings and sustainable traffic growth."
];

export const aiImages = [
  "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
];

// Enhanced video collection with high-quality, playable videos
export const aiVideos = [
  "https://videos.pexels.com/video-files/3196644/3196644-hd_1920_1080_25fps.mp4",
  "https://videos.pexels.com/video-files/5011647/5011647-hd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/8847434/8847434-hd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/7579952/7579952-hd_1920_1080_25fps.mp4"
];

// Enhanced video collection with more specific content and better playback
export const videosByCategory = {
  seo: [
    "https://videos.pexels.com/video-files/3196644/3196644-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/8847434/8847434-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/7579952/7579952-hd_1920_1080_25fps.mp4"
  ],
  traffic: [
    "https://videos.pexels.com/video-files/5011647/5011647-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/3196644/3196644-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/8847434/8847434-hd_1920_1080_30fps.mp4"
  ],
  digital: [
    "https://videos.pexels.com/video-files/7579952/7579952-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/5011647/5011647-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/3196644/3196644-hd_1920_1080_25fps.mp4"
  ],
  ai: [
    "https://videos.pexels.com/video-files/8847434/8847434-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/7579952/7579952-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/5011647/5011647-hd_1920_1080_30fps.mp4"
  ],
  marketing: [
    "https://videos.pexels.com/video-files/3196644/3196644-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/8847434/8847434-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/7579952/7579952-hd_1920_1080_25fps.mp4"
  ],
  social: [
    "https://videos.pexels.com/video-files/5011647/5011647-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/8847434/8847434-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/3196644/3196644-hd_1920_1080_25fps.mp4"
  ],
  content: [
    "https://videos.pexels.com/video-files/7579952/7579952-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/3196644/3196644-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/5011647/5011647-hd_1920_1080_30fps.mp4"
  ]
};

export const getRandomContent = () => {
  return organicTrafficContent[Math.floor(Math.random() * organicTrafficContent.length)];
};

export const getRandomImage = () => {
  return aiImages[Math.floor(Math.random() * aiImages.length)];
};

export const getRandomVideo = () => {
  return aiVideos[Math.floor(Math.random() * aiVideos.length)];
};

// Enhanced function to get videos based on subject with better keyword matching
export const getVideoBySubject = (subject: string) => {
  const lowerSubject = subject.toLowerCase();
  
  // Determine category based on subject keywords with more specific matching
  let category = 'ai'; // default
  
  if (lowerSubject.includes('seo') || lowerSubject.includes('search') || lowerSubject.includes('ranking')) {
    category = 'seo';
  } else if (lowerSubject.includes('traffic') || lowerSubject.includes('organic') || lowerSubject.includes('visitor')) {
    category = 'traffic';
  } else if (lowerSubject.includes('digital') || lowerSubject.includes('toolkit') || lowerSubject.includes('tool')) {
    category = 'digital';
  } else if (lowerSubject.includes('marketing') || lowerSubject.includes('campaign') || lowerSubject.includes('promotion')) {
    category = 'marketing';
  } else if (lowerSubject.includes('ai') || lowerSubject.includes('powered') || lowerSubject.includes('artificial')) {
    category = 'ai';
  } else if (lowerSubject.includes('social') || lowerSubject.includes('media') || lowerSubject.includes('facebook') || lowerSubject.includes('instagram')) {
    category = 'social';
  } else if (lowerSubject.includes('content') || lowerSubject.includes('blog') || lowerSubject.includes('article')) {
    category = 'content';
  }
  
  const videos = videosByCategory[category] || aiVideos;
  return videos[Math.floor(Math.random() * videos.length)];
};

// New function to get content based on search terms
export const getContentBySearchTerm = (searchTerm: string) => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  if (lowerSearchTerm.includes('seo')) {
    return "🚀 Master SEO with our AI-powered tools and strategies. Transform your search rankings with intelligent keyword research, automated content optimization, and proven techniques that drive organic traffic growth.";
  } else if (lowerSearchTerm.includes('social media')) {
    return "📱 Revolutionize your social media presence with AI-enhanced content creation, automated posting schedules, and intelligent audience engagement strategies that boost your organic reach.";
  } else if (lowerSearchTerm.includes('content marketing')) {
    return "✍️ Elevate your content marketing with AI-powered creation tools, smart distribution strategies, and data-driven optimization techniques that attract and convert your target audience.";
  } else if (lowerSearchTerm.includes('email marketing')) {
    return "📧 Transform your email campaigns with AI-generated content, intelligent segmentation, and automated personalization that increases open rates and drives conversions.";
  }
  
  return getRandomContent();
};
