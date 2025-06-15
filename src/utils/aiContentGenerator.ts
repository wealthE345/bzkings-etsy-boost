
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

export const aiVideos = [
  "https://videos.pexels.com/video-files/3196644/3196644-hd_1920_1080_25fps.mp4",
  "https://videos.pexels.com/video-files/5011647/5011647-hd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/8847434/8847434-hd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/7579952/7579952-hd_1920_1080_25fps.mp4"
];

export const getRandomContent = () => {
  return organicTrafficContent[Math.floor(Math.random() * organicTrafficContent.length)];
};

export const getRandomImage = () => {
  return aiImages[Math.floor(Math.random() * aiImages.length)];
};

export const getRandomVideo = () => {
  return aiVideos[Math.floor(Math.random() * aiVideos.length)];
};
