
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AppLogoProps {
  app: {
    id: number;
    name: string;
    category: string;
    icon: LucideIcon;
  };
  size?: 'sm' | 'md' | 'lg';
}

const AppLogo: React.FC<AppLogoProps> = ({ app, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  // Generate a consistent background gradient based on app name
  const generateGradient = (name: string) => {
    const colors = [
      'from-purple-500 to-blue-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-blue-500',
      'from-yellow-500 to-orange-500',
      'from-pink-500 to-purple-500',
      'from-red-500 to-pink-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-green-500',
      'from-orange-500 to-red-500',
      'from-cyan-500 to-blue-500'
    ];
    
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Generate placeholder image URL based on app name and category
  const generateImageUrl = (name: string, category: string) => {
    const imageMap = {
      'SEO': 'photo-1460925895917-afdab827c52f', // SEO/Analytics themed
      'Marketing': 'photo-1533750516457-a7f992034fec', // Marketing themed
      'Analytics': 'photo-1551288049-bebda4e38f71', // Data/Analytics themed
      'CRO': 'photo-1460925895917-afdab827c52f', // Conversion themed
      'Content': 'photo-1486312338219-ce68d2c6f44d', // Content creation themed
      'Local SEO': 'photo-1477959858617-67f85cf4f1df', // Location themed
      'E-commerce': 'photo-1556742049-0cfed4f6a45d', // Shopping themed
      'Social SEO': 'photo-1611224923853-80b023f02d71', // Social media themed
      'Video Marketing': 'photo-1574717024653-61fd2cf4d44d', // Video themed
      'International SEO': 'photo-1488229297570-58520851e868', // Global themed
      'Voice SEO': 'photo-1589254065878-42c9da997008', // Voice/Audio themed
      'Mobile SEO': 'photo-1512941937669-90a1b58e7e9c', // Mobile themed
      'Technical SEO': 'photo-1518770660439-4636190af475', // Technical themed
      'Performance': 'photo-1551288049-bebda4e38f71', // Performance themed
      'Security': 'photo-1563013544-824ae1b704d3', // Security themed
      'Automation': 'photo-1485827404703-89b55fcc595e', // Automation themed
      'Mobile': 'photo-1512941937669-90a1b58e7e9c' // Mobile app themed
    };

    const defaultImage = 'photo-1488590528505-98d2b5aba04b'; // Default tech image
    const imageId = imageMap[category as keyof typeof imageMap] || defaultImage;
    
    return `https://images.unsplash.com/${imageId}?w=200&h=200&fit=crop&crop=center`;
  };

  const IconComponent = app.icon;
  const gradient = generateGradient(app.name);
  const imageUrl = generateImageUrl(app.name, app.category);

  return (
    <div className={`${sizeClasses[size]} rounded-lg overflow-hidden relative flex-shrink-0`}>
      {/* Background image */}
      <img 
        src={imageUrl}
        alt={`${app.name} logo`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to gradient background if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
      
      {/* Gradient overlay with icon */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} bg-opacity-80 flex items-center justify-center`}>
        <IconComponent 
          size={iconSizes[size]} 
          className="text-white drop-shadow-lg" 
        />
      </div>
      
      {/* Optional subtle border */}
      <div className="absolute inset-0 rounded-lg border border-white/20"></div>
    </div>
  );
};

export default AppLogo;
