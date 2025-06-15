
// Movie clips pool organized by advertising categories
const getMovieClipsByCategory = (searchTerm: string) => {
  const lowerTerm = searchTerm.toLowerCase();
  const timestamp = Date.now();
  
  // Money/Finance themed movie clips
  if (lowerTerm.includes('money') || lowerTerm.includes('income') || lowerTerm.includes('earn') || lowerTerm.includes('profit')) {
    return [
      { 
        url: `https://player.vimeo.com/video/movie_money_1?${timestamp}&autoplay=1`, 
        title: "Success Story",
        description: "Cinematic money success montage",
        duration: 30,
        style: "Hollywood blockbuster",
        mood: "Inspirational"
      },
      { 
        url: `https://player.vimeo.com/video/movie_money_2?${timestamp}&autoplay=1`, 
        title: "Wealth Journey", 
        description: "Dramatic wealth building narrative",
        duration: 45,
        style: "Documentary drama",
        mood: "Motivational"
      },
      { 
        url: `https://player.vimeo.com/video/movie_money_3?${timestamp}&autoplay=1`, 
        title: "Financial Freedom",
        description: "Epic financial transformation story",
        duration: 60,
        style: "Action thriller",
        mood: "Triumphant"
      },
      { 
        url: `https://player.vimeo.com/video/movie_money_4?${timestamp}&autoplay=1`, 
        title: "Investment Empire",
        description: "Corporate success movie trailer style",
        duration: 30,
        style: "Corporate thriller",
        mood: "Powerful"
      }
    ];
  }
  
  // Social Media/Marketing themed movie clips
  if (lowerTerm.includes('facebook') || lowerTerm.includes('social') || lowerTerm.includes('marketing') || lowerTerm.includes('ads')) {
    return [
      { 
        url: `https://player.vimeo.com/video/movie_social_1?${timestamp}&autoplay=1`, 
        title: "Viral Sensation",
        description: "Social media explosion movie clip",
        duration: 30,
        style: "Tech thriller",
        mood: "Energetic"
      },
      { 
        url: `https://player.vimeo.com/video/movie_social_2?${timestamp}&autoplay=1`, 
        title: "Digital Revolution", 
        description: "Marketing transformation cinematic",
        duration: 45,
        style: "Sci-fi drama",
        mood: "Futuristic"
      },
      { 
        url: `https://player.vimeo.com/video/movie_social_3?${timestamp}&autoplay=1`, 
        title: "Influence",
        description: "Social influence power movie style",
        duration: 40,
        style: "Psychological thriller",
        mood: "Intriguing"
      },
      { 
        url: `https://player.vimeo.com/video/movie_social_4?${timestamp}&autoplay=1`, 
        title: "Connection",
        description: "Human connection through technology",
        duration: 35,
        style: "Drama",
        mood: "Emotional"
      }
    ];
  }
  
  // Crypto/Technology themed movie clips
  if (lowerTerm.includes('crypto') || lowerTerm.includes('bitcoin') || lowerTerm.includes('blockchain') || lowerTerm.includes('tech')) {
    return [
      { 
        url: `https://player.vimeo.com/video/movie_crypto_1?${timestamp}&autoplay=1`, 
        title: "Digital Gold Rush",
        description: "Cryptocurrency revolution movie trailer",
        duration: 40,
        style: "Cyber thriller",
        mood: "Revolutionary"
      },
      { 
        url: `https://player.vimeo.com/video/movie_crypto_2?${timestamp}&autoplay=1`, 
        title: "The Algorithm", 
        description: "Blockchain technology cinematic",
        duration: 50,
        style: "Sci-fi",
        mood: "Mysterious"
      },
      { 
        url: `https://player.vimeo.com/video/movie_crypto_3?${timestamp}&autoplay=1`, 
        title: "Decentralized",
        description: "Future of finance movie style",
        duration: 45,
        style: "Futuristic drama",
        mood: "Visionary"
      },
      { 
        url: `https://player.vimeo.com/video/movie_crypto_4?${timestamp}&autoplay=1`, 
        title: "Mining Empire",
        description: "Crypto mining operation cinematic",
        duration: 35,
        style: "Industrial drama",
        mood: "Ambitious"
      }
    ];
  }
  
  // Fitness/Health themed movie clips
  if (lowerTerm.includes('fitness') || lowerTerm.includes('health') || lowerTerm.includes('workout') || lowerTerm.includes('body')) {
    return [
      { 
        url: `https://player.vimeo.com/video/movie_fitness_1?${timestamp}&autoplay=1`, 
        title: "Transformation",
        description: "Epic fitness journey movie montage",
        duration: 45,
        style: "Sports drama",
        mood: "Inspiring"
      },
      { 
        url: `https://player.vimeo.com/video/movie_fitness_2?${timestamp}&autoplay=1`, 
        title: "Champion", 
        description: "Athletic achievement cinematic",
        duration: 40,
        style: "Sports epic",
        mood: "Triumphant"
      },
      { 
        url: `https://player.vimeo.com/video/movie_fitness_3?${timestamp}&autoplay=1`, 
        title: "Mind & Body",
        description: "Holistic health movie trailer style",
        duration: 35,
        style: "Wellness drama",
        mood: "Balanced"
      },
      { 
        url: `https://player.vimeo.com/video/movie_fitness_4?${timestamp}&autoplay=1`, 
        title: "Peak Performance",
        description: "Ultimate fitness achievement",
        duration: 50,
        style: "Action sports",
        mood: "Intense"
      }
    ];
  }
  
  // Business/Entrepreneurship themed movie clips
  if (lowerTerm.includes('business') || lowerTerm.includes('entrepreneur') || lowerTerm.includes('startup') || lowerTerm.includes('success')) {
    return [
      { 
        url: `https://player.vimeo.com/video/movie_business_1?${timestamp}&autoplay=1`, 
        title: "Empire Builder",
        description: "Business empire creation cinematic",
        duration: 50,
        style: "Corporate drama",
        mood: "Ambitious"
      },
      { 
        url: `https://player.vimeo.com/video/movie_business_2?${timestamp}&autoplay=1`, 
        title: "The Pitch", 
        description: "Startup success story movie style",
        duration: 40,
        style: "Entrepreneurial drama",
        mood: "Determined"
      },
      { 
        url: `https://player.vimeo.com/video/movie_business_3?${timestamp}&autoplay=1`, 
        title: "Innovation",
        description: "Disruptive business model cinematic",
        duration: 45,
        style: "Tech drama",
        mood: "Visionary"
      },
      { 
        url: `https://player.vimeo.com/video/movie_business_4?${timestamp}&autoplay=1`, 
        title: "Market Domination",
        description: "Business takeover movie trailer",
        duration: 35,
        style: "Corporate thriller",
        mood: "Powerful"
      }
    ];
  }
  
  // Default movie clips for any other search terms
  return [
    { 
      url: `https://player.vimeo.com/video/movie_default_1?${timestamp}&autoplay=1`, 
      title: "Success Story",
      description: "Generic success cinematic trailer",
      duration: 40,
      style: "Inspirational drama",
      mood: "Uplifting"
    },
    { 
      url: `https://player.vimeo.com/video/movie_default_2?${timestamp}&autoplay=1`, 
      title: "Achievement", 
      description: "Personal achievement movie montage",
      duration: 45,
      style: "Life drama",
      mood: "Motivational"
    },
    { 
      url: `https://player.vimeo.com/video/movie_default_3?${timestamp}&autoplay=1`, 
      title: "Breakthrough",
      description: "Life-changing moment cinematic",
      duration: 35,
      style: "Drama",
      mood: "Emotional"
    },
    { 
      url: `https://player.vimeo.com/video/movie_default_4?${timestamp}&autoplay=1`, 
      title: "Victory",
      description: "Ultimate victory movie trailer style",
      duration: 50,
      style: "Epic drama",
      mood: "Triumphant"
    }
  ];
};

// Track used movie clips to ensure uniqueness
let usedMovieClipIndexes: { [key: string]: number[] } = {};

export interface MovieClip {
  url: string;
  title: string;
  description: string;
  duration: number;
  style: string;
  mood: string;
}

export const generateMovieClipsForSearch = (searchTerm: string): MovieClip[] => {
  const availableClips = getMovieClipsByCategory(searchTerm);
  
  // Reset used indexes if we've used all clips for this search term
  if (!usedMovieClipIndexes[searchTerm]) {
    usedMovieClipIndexes[searchTerm] = [];
  }
  
  if (usedMovieClipIndexes[searchTerm].length >= availableClips.length) {
    usedMovieClipIndexes[searchTerm] = []; // Reset to start fresh with new variations
  }
  
  // Get unused clips
  const unusedClips = availableClips.filter((_, index) => 
    !usedMovieClipIndexes[searchTerm].includes(index)
  );
  
  // Shuffle and select clips
  const shuffledClips = unusedClips.sort(() => Math.random() - 0.5);
  const selectedClips = shuffledClips.slice(0, 3); // Get 3 different movie clips
  
  // Mark selected clips as used
  selectedClips.forEach(clip => {
    const originalIndex = availableClips.findIndex(c => c.url === clip.url);
    if (originalIndex !== -1) {
      usedMovieClipIndexes[searchTerm].push(originalIndex);
    }
  });
  
  console.log(`🎬 Generated ${selectedClips.length} unique movie clips for "${searchTerm}"`);
  return selectedClips;
};

export const getNewMovieClip = (searchTerm: string, currentClipUrl: string): MovieClip | null => {
  const availableClips = getMovieClipsByCategory(searchTerm);
  
  // Find clips that are different from the current one
  const differentClips = availableClips.filter(clip => clip.url !== currentClipUrl);
  
  if (differentClips.length === 0) {
    // If no different clips, generate fresh ones with new timestamp
    const freshClips = getMovieClipsByCategory(searchTerm + "_refresh_" + Date.now());
    return freshClips[Math.floor(Math.random() * freshClips.length)];
  }
  
  // Return a random different clip
  return differentClips[Math.floor(Math.random() * differentClips.length)];
};

export const generateMovieClipNarration = (clip: MovieClip, searchTerm: string): string => {
  const templates = [
    `Experience the ${clip.mood.toLowerCase()} journey of ${searchTerm} success in this ${clip.style.toLowerCase()} style presentation.`,
    `Witness the transformation as ordinary people achieve extraordinary results with ${searchTerm} in this ${clip.duration}-second cinematic experience.`,
    `${clip.title} showcases the power of ${searchTerm} through compelling ${clip.style.toLowerCase()} storytelling that will inspire action.`,
    `This ${clip.mood.toLowerCase()} ${clip.style.toLowerCase()} reveals the secrets behind ${searchTerm} success stories that changed everything.`,
    `From struggle to triumph, this movie-style presentation demonstrates how ${searchTerm} creates life-changing opportunities.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
};
