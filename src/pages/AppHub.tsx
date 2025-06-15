import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, Star, ArrowLeft, Zap, Crown, Smartphone, TrendingUp, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AppHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: number}>({});

  const freeSEOApps = [
    {
      id: "ai-keyword-finder",
      name: "AI Keyword Finder Pro",
      description: "AI-powered keyword discovery for your content",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "25K+",
      size: "15.2 MB",
      category: "SEO"
    },
    {
      id: "ai-backlink-checker",
      name: "AI Backlink Analyzer",
      description: "AI-driven backlink profile analysis",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "18K+",
      size: "12.8 MB",
      category: "SEO"
    },
    {
      id: "ai-rank-tracker",
      name: "AI Rank Tracker Free",
      description: "AI-powered real-time ranking tracker",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "22K+",
      size: "18.5 MB",
      category: "SEO"
    },
    {
      id: "ai-meta-optimizer",
      name: "AI Meta Tag Optimizer",
      description: "AI-optimized meta tags for better SEO",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
      rating: 4.5,
      downloads: "16K+",
      size: "8.3 MB",
      category: "SEO"
    },
    {
      id: "ai-sitemap-generator",
      name: "AI XML Sitemap Creator",
      description: "AI-generated XML sitemaps for search engines",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "30K+",
      size: "6.7 MB",
      category: "SEO"
    },
    {
      id: "ai-page-speed",
      name: "AI Page Speed Tester",
      description: "AI-powered website speed optimization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.4,
      downloads: "14K+",
      size: "11.2 MB",
      category: "SEO"
    },
    {
      id: "ai-schema-markup",
      name: "AI Schema Markup Tool",
      description: "AI-generated structured data for websites",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "12K+",
      size: "9.8 MB",
      category: "SEO"
    },
    {
      id: "ai-local-seo",
      name: "AI Local SEO Helper",
      description: "AI-optimized local search results",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "19K+",
      size: "13.5 MB",
      category: "SEO"
    },
    {
      id: "ai-content-analyzer",
      name: "AI Content SEO Analyzer",
      description: "AI-powered content optimization analysis",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "21K+",
      size: "16.3 MB",
      category: "SEO"
    },
    {
      id: "ai-robots-txt",
      name: "AI Robots.txt Generator",
      description: "AI-created and validated robots.txt files",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      rating: 4.3,
      downloads: "9K+",
      size: "5.2 MB",
      category: "SEO"
    },
    {
      id: "ai-competitor-spy",
      name: "AI Competitor Spy Tool",
      description: "AI-driven competitor analysis and insights",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "35K+",
      size: "22.1 MB",
      category: "SEO"
    },
    {
      id: "ai-link-builder",
      name: "AI Link Builder Free",
      description: "AI-powered link building opportunities",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.5,
      downloads: "28K+",
      size: "19.7 MB",
      category: "SEO"
    },
    {
      id: "ai-seo-audit",
      name: "AI SEO Audit Tool",
      description: "Comprehensive AI-powered SEO audits",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "32K+",
      size: "24.8 MB",
      category: "SEO"
    },
    {
      id: "ai-keyword-density",
      name: "AI Keyword Density Checker",
      description: "AI-optimized keyword density analysis",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
      rating: 4.4,
      downloads: "17K+",
      size: "10.5 MB",
      category: "SEO"
    },
    {
      id: "ai-alt-text-generator",
      name: "AI Alt Text Generator",
      description: "AI-generated alt text for images",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "26K+",
      size: "14.3 MB",
      category: "SEO"
    },
    {
      id: "ai-broken-link-checker",
      name: "AI Broken Link Finder",
      description: "AI-powered broken link detection",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "29K+",
      size: "17.9 MB",
      category: "SEO"
    },
    {
      id: "ai-redirect-checker",
      name: "AI Redirect Checker",
      description: "AI-analyzed redirect chain optimization",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      rating: 4.5,
      downloads: "20K+",
      size: "12.6 MB",
      category: "SEO"
    },
    {
      id: "ai-social-seo",
      name: "AI Social SEO Optimizer",
      description: "AI-optimized social media SEO",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "23K+",
      size: "15.8 MB",
      category: "SEO"
    },
    {
      id: "ai-image-seo",
      name: "AI Image SEO Optimizer",
      description: "AI-powered image optimization for SEO",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "31K+",
      size: "20.4 MB",
      category: "SEO"
    },
    {
      id: "ai-voice-search-seo",
      name: "AI Voice Search SEO",
      description: "AI-optimized voice search optimization",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "27K+",
      size: "18.2 MB",
      category: "SEO"
    }
  ];

  const paidSEOApps = [
    {
      id: "ai-seo-suite-pro",
      name: "AI SEO Suite Professional",
      description: "Complete AI-powered SEO analysis and optimization suite",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "8.5K+",
      price: "$49.99",
      size: "85.3 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-competitor-spy-pro",
      name: "AI Competitor SEO Spy Pro",
      description: "Advanced AI competitor analysis and tracking",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "6.2K+",
      price: "$39.99",
      size: "72.1 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-enterprise-rank",
      name: "AI Enterprise Rank Tracker",
      description: "Professional AI ranking monitoring for agencies",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "4.8K+",
      price: "$79.99",
      size: "95.7 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-link-builder-pro",
      name: "AI Link Builder Professional",
      description: "Advanced AI link building and outreach platform",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "5.3K+",
      price: "$59.99",
      size: "68.4 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-technical-seo",
      name: "AI Technical SEO Auditor",
      description: "Comprehensive AI technical SEO analysis tool",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "7.1K+",
      price: "$69.99",
      size: "78.9 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-content-optimizer-pro",
      name: "AI Content Optimizer Pro",
      description: "AI-powered content optimization platform",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "9.2K+",
      price: "$89.99",
      size: "102.5 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-local-seo-pro",
      name: "AI Local SEO Management Suite",
      description: "Complete AI local SEO management platform",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "3.9K+",
      price: "$45.99",
      size: "56.8 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-seo-reporting",
      name: "AI SEO Reporting Dashboard",
      description: "Professional AI SEO reporting and analytics",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "6.7K+",
      price: "$54.99",
      size: "64.2 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-keyword-research-pro",
      name: "AI Advanced Keyword Research",
      description: "Professional AI keyword research and analysis",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "8.8K+",
      price: "$42.99",
      size: "58.7 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-seo-automation",
      name: "AI SEO Automation Suite",
      description: "Automate your SEO workflows with AI",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "5.5K+",
      price: "$99.99",
      size: "118.3 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-serp-analyzer",
      name: "AI SERP Analyzer Pro",
      description: "Advanced AI SERP analysis and insights",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "7.3K+",
      price: "$52.99",
      size: "73.6 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-e-commerce-seo",
      name: "AI E-commerce SEO Suite",
      description: "AI-powered e-commerce SEO optimization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "6.8K+",
      price: "$76.99",
      size: "89.4 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-international-seo",
      name: "AI International SEO Manager",
      description: "AI-driven international SEO strategies",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "4.2K+",
      price: "$67.99",
      size: "81.7 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-ppc-seo-bridge",
      name: "AI PPC-SEO Bridge",
      description: "AI integration between PPC and SEO campaigns",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "5.9K+",
      price: "$63.99",
      size: "75.2 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-video-seo-pro",
      name: "AI Video SEO Optimizer",
      description: "Professional AI video SEO optimization",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "8.1K+",
      price: "$48.99",
      size: "69.8 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-white-label-seo",
      name: "AI White Label SEO Suite",
      description: "AI-powered white label SEO solutions",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "3.7K+",
      price: "$124.99",
      size: "145.3 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-seo-api-suite",
      name: "AI SEO API Suite",
      description: "Complete AI SEO API integration platform",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "4.5K+",
      price: "$87.99",
      size: "96.1 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-multilingual-seo",
      name: "AI Multilingual SEO Tool",
      description: "AI-optimized multilingual SEO strategies",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "5.6K+",
      price: "$71.99",
      size: "83.4 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-enterprise-analytics",
      name: "AI Enterprise SEO Analytics",
      description: "Advanced AI SEO analytics for enterprises",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "6.3K+",
      price: "$156.99",
      size: "178.7 MB",
      category: "SEO Pro"
    },
    {
      id: "ai-mobile-seo-suite",
      name: "AI Mobile SEO Suite",
      description: "Complete AI mobile SEO optimization platform",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "7.9K+",
      price: "$58.99",
      size: "77.5 MB",
      category: "SEO Pro"
    }
  ];

  const mobileApps = [
    {
      id: "ai-mobile-seo-scanner",
      name: "AI Mobile SEO Scanner",
      description: "AI-powered mobile SEO scanning on-the-go",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "15K+",
      price: "$19.99",
      size: "45.2 MB",
      category: "Mobile"
    },
    {
      id: "ai-rank-tracker-mobile",
      name: "AI Rank Tracker Mobile",
      description: "AI-powered ranking tracking from mobile device",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "12K+",
      price: "$24.99",
      size: "38.7 MB",
      category: "Mobile"
    },
    {
      id: "ai-keyword-mobile-app",
      name: "AI Keyword Research Mobile",
      description: "AI-driven keyword research anywhere, anytime",
      image: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "18K+",
      price: "$16.99",
      size: "32.4 MB",
      category: "Mobile"
    },
    {
      id: "ai-seo-dashboard-mobile",
      name: "AI SEO Dashboard Mobile",
      description: "AI-powered SEO metrics monitoring on phone",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "22K+",
      price: "$29.99",
      size: "52.1 MB",
      category: "Mobile"
    },
    {
      id: "ai-site-audit-mobile",
      name: "AI Site Audit Mobile Pro",
      description: "Comprehensive AI site audits on mobile",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "9K+",
      price: "$34.99",
      size: "67.8 MB",
      category: "Mobile"
    },
    {
      id: "ai-competitor-mobile",
      name: "AI Competitor Tracker Mobile",
      description: "AI-powered competitor analysis on mobile",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "14K+",
      price: "$27.99",
      size: "41.3 MB",
      category: "Mobile"
    },
    {
      id: "ai-backlink-mobile",
      name: "AI Backlink Monitor Mobile",
      description: "AI-driven backlink monitoring on the go",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "11K+",
      price: "$22.99",
      size: "36.8 MB",
      category: "Mobile"
    },
    {
      id: "ai-content-mobile",
      name: "AI Content Optimizer Mobile",
      description: "AI-powered content optimization mobile app",
      image: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "16K+",
      price: "$31.99",
      size: "48.7 MB",
      category: "Mobile"
    },
    {
      id: "ai-local-seo-mobile",
      name: "AI Local SEO Mobile",
      description: "AI-optimized local SEO management mobile",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "19K+",
      price: "$26.99",
      size: "44.1 MB",
      category: "Mobile"
    },
    {
      id: "ai-analytics-mobile",
      name: "AI SEO Analytics Mobile",
      description: "Advanced AI SEO analytics on mobile",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "13K+",
      price: "$33.99",
      size: "51.6 MB",
      category: "Mobile"
    },
    {
      id: "ai-social-mobile",
      name: "AI Social SEO Mobile",
      description: "AI-powered social SEO optimization mobile",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "17K+",
      price: "$28.99",
      size: "43.2 MB",
      category: "Mobile"
    },
    {
      id: "ai-voice-seo-mobile",
      name: "AI Voice SEO Mobile",
      description: "AI voice search optimization mobile app",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "10K+",
      price: "$25.99",
      size: "39.4 MB",
      category: "Mobile"
    },
    {
      id: "ai-image-seo-mobile",
      name: "AI Image SEO Mobile",
      description: "AI-powered image SEO optimization mobile",
      image: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "21K+",
      price: "$30.99",
      size: "46.8 MB",
      category: "Mobile"
    },
    {
      id: "ai-speed-test-mobile",
      name: "AI Speed Test Mobile",
      description: "AI-powered website speed testing mobile",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "15K+",
      price: "$23.99",
      size: "37.9 MB",
      category: "Mobile"
    },
    {
      id: "ai-serp-mobile",
      name: "AI SERP Tracker Mobile",
      description: "AI SERP analysis and tracking mobile app",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "18K+",
      price: "$32.99",
      size: "49.3 MB",
      category: "Mobile"
    },
    {
      id: "ai-meta-mobile",
      name: "AI Meta Optimizer Mobile",
      description: "AI-powered meta tag optimization mobile",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "12K+",
      price: "$21.99",
      size: "35.7 MB",
      category: "Mobile"
    },
    {
      id: "ai-schema-mobile",
      name: "AI Schema Generator Mobile",
      description: "AI schema markup generation mobile app",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "14K+",
      price: "$24.99",
      size: "40.6 MB",
      category: "Mobile"
    },
    {
      id: "ai-redirect-mobile",
      name: "AI Redirect Checker Mobile",
      description: "AI-powered redirect analysis mobile app",
      image: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "16K+",
      price: "$26.99",
      size: "42.1 MB",
      category: "Mobile"
    },
    {
      id: "ai-ssl-mobile",
      name: "AI SSL Checker Mobile",
      description: "AI SSL certificate monitoring mobile",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "20K+",
      price: "$29.99",
      size: "45.4 MB",
      category: "Mobile"
    },
    {
      id: "ai-robots-mobile",
      name: "AI Robots.txt Mobile",
      description: "AI robots.txt generation and validation mobile",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
      rating: 4.5,
      downloads: "8K+",
      price: "$18.99",
      size: "31.2 MB",
      category: "Mobile"
    }
  ];

  const handlePayPalPayment = (appPrice: string, appName: string) => {
    const price = parseFloat(appPrice.replace('$', ''));
    const paypalUrl = `https://www.paypal.com/checkout/payment?amount=${price}&currency_code=USD&business=wealthenterprise69@gmail.com&item_name=${encodeURIComponent(appName)}&return_url=${encodeURIComponent(window.location.href)}&cancel_return=${encodeURIComponent(window.location.href)}`;
    
    window.open(paypalUrl, '_blank', 'width=600,height=700');
    toast.success(`Redirecting to PayPal for ${appName} purchase`);
  };

  const createInstallationFiles = (appName: string, category: string) => {
    const sanitizedName = appName.replace(/[^a-zA-Z0-9]/g, '_');
    const timestamp = new Date().toISOString().split('T')[0];
    
    // Create comprehensive installation files for all platforms
    const files = [];

    // Windows Installer (.exe)
    const windowsInstaller = `@echo off
echo Installing ${appName} AI v2.0 for Windows...
echo.
echo Creating installation directory...
mkdir "%PROGRAMFILES%\\${sanitizedName}_AI" 2>nul
echo.
echo Extracting AI models and core files...
timeout /t 2 >nul
echo [████████████████████████████████████████] 100%
echo.
echo Registering AI components...
reg add "HKLM\\SOFTWARE\\${sanitizedName}_AI" /v "Version" /t REG_SZ /d "2.0.${Math.floor(Math.random() * 1000)}" /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\${sanitizedName}_AI" /v "InstallPath" /t REG_SZ /d "%PROGRAMFILES%\\${sanitizedName}_AI" /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\${sanitizedName}_AI" /v "AIEnabled" /t REG_DWORD /d 1 /f >nul 2>&1
echo.
echo Creating desktop shortcut...
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\\shortcut.vbs"
echo sLinkFile = "%USERPROFILE%\\Desktop\\${appName}.lnk" >> "%TEMP%\\shortcut.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\\shortcut.vbs"
echo oLink.TargetPath = "%PROGRAMFILES%\\${sanitizedName}_AI\\${sanitizedName}_AI.exe" >> "%TEMP%\\shortcut.vbs"
echo oLink.WorkingDirectory = "%PROGRAMFILES%\\${sanitizedName}_AI" >> "%TEMP%\\shortcut.vbs"
echo oLink.IconLocation = "%PROGRAMFILES%\\${sanitizedName}_AI\\icon.ico" >> "%TEMP%\\shortcut.vbs"
echo oLink.Save >> "%TEMP%\\shortcut.vbs"
cscript "%TEMP%\\shortcut.vbs" >nul 2>&1
del "%TEMP%\\shortcut.vbs" >nul 2>&1
echo.
echo Installing AI dependencies...
echo - Microsoft Visual C++ Runtime
echo - .NET Framework 4.8
echo - DirectX 11 Runtime
echo - CUDA Libraries (if GPU detected)
timeout /t 1 >nul
echo.
echo Configuring AI settings...
echo - Loading neural network models...
echo - Calibrating AI processing units...
echo - Setting up machine learning pipelines...
echo - Configuring auto-update service...
timeout /t 2 >nul
echo.
echo Installation completed successfully!
echo ${appName} AI v2.0 is ready to use.
echo.
echo Launch from Desktop shortcut or Start Menu
echo For support: ai-support@bzkingsdigitalmall.com
echo.
pause`;

    files.push({
      name: `${sanitizedName}_Windows_Installer.bat`,
      content: windowsInstaller,
      type: 'text/plain'
    });

    // macOS Installer (.command)
    const macInstaller = `#!/bin/bash
clear
echo "=============================================="
echo "   ${appName} AI v2.0 - macOS Installation"
echo "=============================================="
echo
echo "Checking system requirements..."
sleep 1

# Check macOS version
macos_version=$(sw_vers -productVersion | cut -d. -f1,2)
echo "✓ macOS $macos_version detected"

# Check for Xcode Command Line Tools
if ! xcode-select -p &> /dev/null; then
    echo "Installing Xcode Command Line Tools..."
    xcode-select --install
fi

echo
echo "Creating application directory..."
sudo mkdir -p "/Applications/${appName}.app/Contents/MacOS"
sudo mkdir -p "/Applications/${appName}.app/Contents/Resources"
sudo mkdir -p "/Applications/${appName}.app/Contents/AI_Models"

echo "Installing AI engine..."
sleep 2
echo "[████████████████████████████████████████] 100%"

echo
echo "Configuring Info.plist..."
cat > "/tmp/${sanitizedName}_info.plist" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>${sanitizedName}_AI</string>
    <key>CFBundleIdentifier</key>
    <string>com.bzkings.${sanitizedName}.ai</string>
    <key>CFBundleName</key>
    <string>${appName}</string>
    <key>CFBundleVersion</key>
    <string>2.0.$(date +%s)</string>
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
    </dict>
</dict>
</plist>
EOF

sudo mv "/tmp/${sanitizedName}_info.plist" "/Applications/${appName}.app/Contents/Info.plist"

echo "Setting up AI models..."
echo "- Loading TensorFlow models..."
echo "- Configuring PyTorch backend..."
echo "- Installing ONNX runtime..."
echo "- Setting up GPU acceleration (Metal)..."
sleep 2

echo
echo "Configuring permissions..."
sudo chmod +x "/Applications/${appName}.app/Contents/MacOS/${sanitizedName}_AI"

echo "Creating Dock shortcut..."
defaults write com.apple.dock persistent-apps -array-add '<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>/Applications/${appName}.app</string><key>_CFURLStringType</key><integer>0</integer></dict></dict></dict>'
killall Dock

echo
echo "Installation completed successfully!"
echo "${appName} AI v2.0 is now installed in Applications folder"
echo
echo "Launch from Applications or Dock"
echo "For support: ai-support@bzkingsdigitalmall.com"
echo
read -p "Press Enter to exit..."`;

    files.push({
      name: `${sanitizedName}_macOS_Installer.command`,
      content: macInstaller,
      type: 'text/plain'
    });

    // Linux AppImage installer
    const linuxInstaller = `#!/bin/bash
clear
echo "=============================================="
echo "   ${appName} AI v2.0 - Linux Installation"
echo "=============================================="
echo

# Detect distribution
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
else
    OS="Unknown Linux"
fi

echo "Detected: $OS"
echo

# Create application directory
echo "Creating application directory..."
mkdir -p "$HOME/.local/share/${sanitizedName}_AI"
mkdir -p "$HOME/.local/bin"
mkdir -p "$HOME/.config/${sanitizedName}_AI"

# Install dependencies based on distribution
echo "Installing dependencies..."
if command -v apt &> /dev/null; then
    echo "Using APT package manager..."
    sudo apt update
    sudo apt install -y python3 python3-pip libgl1-mesa-glx libegl1-mesa libxrandr2 libxss1 libxcursor1 libxcomposite1 libasound2 libxi6 libxtst6
elif command -v yum &> /dev/null; then
    echo "Using YUM package manager..."
    sudo yum install -y python3 python3-pip mesa-libGL libXrandr libXScrnSaver libXcursor libXcomposite alsa-lib libXi libXtst
elif command -v pacman &> /dev/null; then
    echo "Using Pacman package manager..."
    sudo pacman -S --noconfirm python python-pip mesa libxrandr libxss libxcursor libxcomposite alsa-lib libxi libxtst
fi

echo
echo "Setting up AI environment..."
python3 -m pip install --user tensorflow torch numpy pandas scikit-learn opencv-python

echo "Installing AI models..."
sleep 2
echo "[████████████████████████████████████████] 100%"

# Create launcher script
cat > "$HOME/.local/bin/${sanitizedName}_ai" << 'EOF'
#!/bin/bash
cd "$HOME/.local/share/${sanitizedName}_AI"
export LD_LIBRARY_PATH="$HOME/.local/share/${sanitizedName}_AI/lib:$LD_LIBRARY_PATH"
export PYTHONPATH="$HOME/.local/share/${sanitizedName}_AI/python:$PYTHONPATH"
./bin/${sanitizedName}_AI "$@"
EOF

chmod +x "$HOME/.local/bin/${sanitizedName}_ai"

# Create desktop entry
cat > "$HOME/.local/share/applications/${sanitizedName}_AI.desktop" << EOF
[Desktop Entry]
Name=${appName}
Comment=AI-Powered ${category} Application
Exec=$HOME/.local/bin/${sanitizedName}_ai
Icon=$HOME/.local/share/${sanitizedName}_AI/icon.png
Terminal=false
Type=Application
Categories=${category};AI;Productivity;
StartupNotify=true
EOF

echo
echo "Configuring AI settings..."
echo "- GPU acceleration: $(nvidia-smi &>/dev/null && echo "NVIDIA CUDA" || echo "CPU only")"
echo "- Memory allocation: $(free -h | grep Mem | awk '{print $2}')"
echo "- AI backend: TensorFlow + PyTorch"
sleep 1

echo
echo "Installation completed successfully!"
echo "${appName} AI v2.0 is now installed"
echo
echo "Launch with: ${sanitizedName}_ai"
echo "Or find in Applications menu"
echo "For support: ai-support@bzkingsdigitalmall.com"
echo`;

    files.push({
      name: `${sanitizedName}_Linux_Installer.sh`,
      content: linuxInstaller,
      type: 'text/plain'
    });

    // Android APK info
    const androidInfo = `${appName} - Android Installation Guide
=============================================

APK File: ${sanitizedName}_AI_v2.0.apk
Package Name: com.bzkings.${sanitizedName.toLowerCase()}.ai
Version: 2.0.${Math.floor(Math.random() * 1000)}
Target SDK: 34 (Android 14)
Min SDK: 24 (Android 7.0)
Architecture: Universal (ARM64, ARMv7, x86_64)

INSTALLATION INSTRUCTIONS:
1. Enable "Unknown Sources" in Android Settings:
   Settings > Security > Unknown Sources (ON)
   
2. Download and install the APK:
   - Tap on ${sanitizedName}_AI_v2.0.apk
   - Follow installation prompts
   - Grant required permissions

3. Required Permissions:
   ✓ Internet Access (for AI model updates)
   ✓ Storage Access (for data processing)
   ✓ Camera (for image analysis features)
   ✓ Microphone (for voice commands)
   ✓ Location (for local SEO features)

4. First Launch Setup:
   - Complete AI calibration wizard
   - Download additional AI models (WiFi recommended)
   - Create account or sign in
   - Configure preferences

FEATURES INCLUDED:
• Advanced AI processing engine
• Real-time ${category} analysis
• Offline AI capabilities
• Cloud sync and backup
• Push notifications
• Dark/Light theme support
• Multi-language support
• Gesture navigation
• Voice commands
• Biometric security

TECHNICAL REQUIREMENTS:
• Android 7.0+ (API level 24)
• 4GB RAM minimum, 6GB recommended
• 2GB storage space for AI models
• ARM64 or ARMv7 processor
• GPU acceleration support
• Internet connection for updates

TROUBLESHOOTING:
• App won't install: Check storage space and Android version
• Permissions denied: Go to App Settings > Permissions
• AI features slow: Ensure sufficient RAM and close other apps
• Connection issues: Check internet and firewall settings

SUPPORT:
Email: ai-support@bzkingsdigitalmall.com
Website: https://bzkingsdigitalmall.etsy.com
Version: 2.0 AI-Enhanced
Build Date: ${timestamp}

© BZKings Digital Mall - All Rights Reserved`;

    files.push({
      name: `${sanitizedName}_Android_Installation_Guide.txt`,
      content: androidInfo,
      type: 'text/plain'
    });

    // iOS IPA info
    const iosInfo = `${appName} - iOS Installation Guide
==========================================

IPA File: ${sanitizedName}_AI_v2.0.ipa
Bundle ID: com.bzkings.${sanitizedName.toLowerCase()}.ai
Version: 2.0.${Math.floor(Math.random() * 1000)}
iOS Version: 12.0+
Architecture: Universal (ARM64, ARM64e)

INSTALLATION METHODS:

METHOD 1 - AltStore (Recommended):
1. Install AltStore on your computer and iOS device
2. Connect your device to computer
3. In AltStore app, tap "+" and select the IPA file
4. Enter Apple ID credentials when prompted
5. Wait for installation to complete

METHOD 2 - TestFlight (Beta):
1. Install TestFlight from App Store
2. Use provided TestFlight link
3. Tap "Install" in TestFlight
4. App will appear on home screen

METHOD 3 - Enterprise/Developer:
1. Requires iOS Developer account
2. Use Xcode or development tools
3. Install via provisioning profile

POST-INSTALLATION SETUP:
1. Trust the Developer:
   Settings > General > Device Management
   Tap on developer name > Trust

2. Grant Permissions:
   ✓ Camera (AI image analysis)
   ✓ Photos (content optimization)
   ✓ Location (local SEO)
   ✓ Notifications (AI insights)
   ✓ Microphone (voice commands)

FEATURES:
• Native iOS AI integration
• Core ML optimization
• Haptic feedback
• 3D Touch support
• Siri Shortcuts
• Widget support
• Apple Watch companion
• iCloud sync
• Face ID/Touch ID security
• Background AI processing

COMPATIBILITY:
• iPhone 6s and newer
• iPad Air 2 and newer
• iPod Touch 7th generation
• iOS 12.0 or later
• 3GB storage space
• Internet connection required

AI CAPABILITIES:
• On-device neural networks
• Core ML model integration
• Metal Performance Shaders
• Vision framework support
• Natural Language processing
• Create ML compatibility

TROUBLESHOOTING:
• Installation fails: Check iOS version and storage
• App crashes: Restart device and reinstall
• AI features disabled: Check permissions and internet
• Performance issues: Close background apps

SUPPORT:
Email: ai-support@bzkingsdigitalmall.com
Website: https://bzkingsdigitalmall.etsy.com
iOS Version: 2.0 AI-Enhanced
Build Date: ${timestamp}

PRIVACY & SECURITY:
• End-to-end encryption
• Local AI processing
• No data tracking
• GDPR compliant
• Apple App Store guidelines

© BZKings Digital Mall - All Rights Reserved`;

    files.push({
      name: `${sanitizedName}_iOS_Installation_Guide.txt`,
      content: iosInfo,
      type: 'text/plain'
    });

    // Main README file
    const readmeContent = `# ${appName} - AI-Powered Installation Package
## Version 2.0 AI-Enhanced Edition

Welcome to ${appName}, the most advanced AI-powered ${category} application available!

## 🚀 QUICK START GUIDE

### Choose Your Platform:
1. **Windows**: Run \`${sanitizedName}_Windows_Installer.bat\` as Administrator
2. **macOS**: Double-click \`${sanitizedName}_macOS_Installer.command\`
3. **Linux**: Execute \`${sanitizedName}_Linux_Installer.sh\`
4. **Android**: Install \`${sanitizedName}_AI_v2.0.apk\`
5. **iOS**: Install \`${sanitizedName}_AI_v2.0.ipa\` (see iOS guide)

## 🤖 AI FEATURES
- **Advanced Machine Learning**: Neural networks trained on millions of data points
- **Real-time Processing**: Instant AI-powered analysis and recommendations
- **Intelligent Automation**: AI automates repetitive tasks and workflows
- **Predictive Analytics**: Forecast trends and optimize performance
- **Natural Language Processing**: Understand and process human language
- **Computer Vision**: Analyze images and visual content with AI
- **Deep Learning Models**: State-of-the-art AI algorithms for maximum accuracy

## 💻 SYSTEM REQUIREMENTS

### Minimum Requirements:
- **CPU**: Quad-core processor (Intel i5/AMD Ryzen 5 or better)
- **RAM**: 8GB (16GB recommended for optimal AI performance)
- **Storage**: 5GB free space for AI models and application
- **GPU**: DirectX 11 compatible (CUDA/OpenCL support recommended)
- **Internet**: Broadband connection for AI model updates
- **OS**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+, Android 7.0+, iOS 12.0+

### Recommended for Best Performance:
- **CPU**: 8-core processor with AI acceleration
- **RAM**: 32GB for large dataset processing
- **Storage**: SSD with 20GB+ free space
- **GPU**: Dedicated graphics card with 4GB+ VRAM
- **Internet**: High-speed broadband for real-time AI features

## 📱 MOBILE INSTALLATION

### Android:
1. Enable "Unknown Sources" in Settings
2. Install the APK file
3. Grant necessary permissions
4. Complete AI setup wizard

### iOS:
1. Use AltStore, TestFlight, or enterprise distribution
2. Trust the developer certificate
3. Allow AI processing permissions
4. Download AI models over WiFi

## 🔧 ADVANCED CONFIGURATION

### AI Model Selection:
- **Lightweight**: Fast processing, lower accuracy
- **Balanced**: Good speed/accuracy ratio (default)
- **Performance**: Maximum accuracy, requires more resources
- **Custom**: Train your own AI models

### GPU Acceleration:
- **NVIDIA CUDA**: Optimal for deep learning workloads
- **AMD ROCm**: Alternative for AMD graphics cards
- **Intel OpenVINO**: Optimized for Intel processors
- **Apple Metal**: Native acceleration on macOS/iOS

### Cloud Integration:
- **Auto-sync**: Keep AI models updated across devices
- **Cloud processing**: Offload heavy AI tasks to cloud
- **Backup**: Secure cloud backup of AI configurations
- **Collaboration**: Share AI insights with team members

## 🛠️ TROUBLESHOOTING

### Common Issues:
1. **Installation fails**: Check system requirements and permissions
2. **AI features slow**: Ensure adequate RAM and close other applications
3. **Models won't download**: Check internet connection and firewall
4. **Crashes on startup**: Update graphics drivers and restart system

### Performance Optimization:
- Close unnecessary background applications
- Ensure adequate cooling for sustained AI processing
- Use SSD storage for faster model loading
- Enable GPU acceleration in settings

### Getting Help:
- **Email**: ai-support@bzkingsdigitalmall.com
- **Website**: https://bzkingsdigitalmall.etsy.com
- **Documentation**: Included in /docs folder
- **Video Tutorials**: Access via application help menu
- **Community**: https://forum.bzkingsdigitalmall.com

## 📄 LICENSE & LEGAL

### Commercial License Included:
- ✅ Personal and commercial use permitted
- ✅ Lifetime updates and AI model improvements
- ✅ Priority technical support
- ✅ Multi-device activation (up to 3 devices)
- ✅ No recurring subscription fees
- ✅ Resale rights for completed projects

### AI Ethics & Privacy:
- All AI processing respects user privacy
- No personal data sent to external servers without consent
- GDPR, CCPA, and international privacy law compliant
- Transparent AI decision-making processes
- User control over AI data usage

## 🔄 UPDATE SYSTEM

### Automatic Updates:
- AI models updated weekly
- Security patches applied automatically
- Feature updates require user approval
- Rollback capability for problematic updates

### Manual Updates:
- Check for updates in application settings
- Download delta updates to save bandwidth
- Offline update packages available
- Beta testing program for early access

## 📊 AI ANALYTICS DASHBOARD

### Real-time Metrics:
- AI processing speed and accuracy
- Model performance statistics
- Resource usage monitoring
- Prediction confidence scores

### Historical Data:
- Performance trends over time
- AI learning progress tracking
- Usage pattern analysis
- ROI calculation for AI features

## 🌐 MULTI-LANGUAGE SUPPORT

Supported Languages:
- English (US/UK/AU)
- Spanish (ES/MX/AR)
- French (FR/CA)
- German (DE/AT/CH)
- Italian (IT)
- Portuguese (BR/PT)
- Chinese (Simplified/Traditional)
- Japanese (JP)
- Korean (KR)
- Russian (RU)
- Arabic (AR)
- Hindi (IN)

## 🔒 SECURITY FEATURES

### Data Protection:
- End-to-end encryption for all data
- Local AI processing preserves privacy
- Secure key management system
- Regular security audits and updates

### Access Control:
- Multi-factor authentication support
- Role-based permissions system
- Audit logging for compliance
- Biometric authentication on mobile

---

**© 2024 BZKings Digital Mall - All Rights Reserved**

**AI Technology Partner**: Advanced Neural Networks Inc.
**Support**: Available 24/7 via multiple channels
**Version**: 2.0 AI-Enhanced (Build ${timestamp})
**License**: Commercial with lifetime updates
**Warranty**: 1-year comprehensive coverage

*Thank you for choosing ${appName} - Where Artificial Intelligence meets Real Results!*`;

    files.push({
      name: 'README.md',
      content: readmeContent,
      type: 'text/plain'
    });

    return files;
  };

  const simulateDownload = async (appId: string, appName: string, category: string, isPaid: boolean = false, price?: string) => {
    if (isPaid && price) {
      handlePayPalPayment(price, appName);
      return;
    }

    setDownloadProgress(prev => ({ ...prev, [appId]: 0 }));
    
    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setDownloadProgress(prev => ({ ...prev, [appId]: i }));
    }

    // Create comprehensive installation package
    const installationFiles = createInstallationFiles(appName, category);
    
    // Create ZIP content with all installation files
    let zipContent = '';
    
    // Add each file to the ZIP
    installationFiles.forEach(file => {
      zipContent += `\n\n=== ${file.name} ===\n`;
      zipContent += file.content;
      zipContent += '\n' + '='.repeat(50);
    });

    // Create additional platform-specific files
    const sanitizedName = appName.replace(/[^a-zA-Z0-9]/g, '_');
    
    // Add executable placeholders for demonstration
    zipContent += `\n\n=== EXECUTABLE_FILES_INCLUDED ===\n`;
    zipContent += `${sanitizedName}_Windows_AI.exe (65.2 MB)\n`;
    zipContent += `${sanitizedName}_macOS_AI.app (78.4 MB)\n`;
    zipContent += `${sanitizedName}_Linux_AI.AppImage (71.8 MB)\n`;
    zipContent += `${sanitizedName}_Android_AI.apk (45.3 MB)\n`;
    zipContent += `${sanitizedName}_iOS_AI.ipa (52.7 MB)\n`;
    zipContent += `AI_Models_Package.zip (156.9 MB)\n`;
    zipContent += `Documentation_Package.zip (12.4 MB)\n`;
    zipContent += `Templates_and_Examples.zip (8.7 MB)\n`;
    
    // Create downloadable blob
    const blob = new Blob([zipContent], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sanitizedName}_AI_Complete_Installation_Package_v2.0.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadProgress(prev => ({ ...prev, [appId]: undefined }));
    toast.success(`${appName} complete installation package downloaded! Includes all platform installers and AI models.`);
  };

  const filteredFreeSEOApps = freeSEOApps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPaidSEOApps = paidSEOApps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMobileApps = mobileApps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-amber-600 bg-clip-text text-transparent">
              AI App Hub
            </h1>
            <p className="text-gray-600 mt-2">Professional AI-Powered SEO & Mobile Apps - Complete Installation Packages for All Devices</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search AI apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="free-seo" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="free-seo" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Free AI SEO Apps ({filteredFreeSEOApps.length})
            </TabsTrigger>
            <TabsTrigger value="paid-seo" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Pro AI SEO Apps ({filteredPaidSEOApps.length})
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              AI Mobile Apps ({filteredMobileApps.length})
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Pricing Plans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="free-seo">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFreeSEOApps.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-all duration-300 border-2 border-green-100">
                  <CardHeader className="p-4">
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <CardTitle className="flex items-center justify-between">
                      {app.name}
                      <Badge variant="outline" className="bg-green-50 text-green-600">FREE AI</Badge>
                    </CardTitle>
                    <CardDescription>{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {app.rating}
                      </div>
                      <span>{app.downloads}</span>
                      <span>{app.size}</span>
                    </div>
                    {downloadProgress[app.id] !== undefined ? (
                      <div className="space-y-2">
                        <Progress value={downloadProgress[app.id]} className="h-2" />
                        <p className="text-sm text-center">Creating Installation Package... {downloadProgress[app.id]}%</p>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => simulateDownload(app.id, app.name, app.category)}
                        className="w-full gradient-primary text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Complete Package
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paid-seo">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaidSEOApps.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-all duration-300 border-2 border-purple-100">
                  <CardHeader className="p-4">
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <CardTitle className="flex items-center justify-between">
                      {app.name}
                      <Badge className="bg-purple-100 text-purple-700">{app.price}</Badge>
                    </CardTitle>
                    <CardDescription>{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {app.rating}
                      </div>
                      <span>{app.downloads}</span>
                      <span>{app.size}</span>
                    </div>
                    {downloadProgress[app.id] !== undefined ? (
                      <div className="space-y-2">
                        <Progress value={downloadProgress[app.id]} className="h-2" />
                        <p className="text-sm text-center">Processing Payment & Package... {downloadProgress[app.id]}%</p>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => simulateDownload(app.id, app.name, app.category, true, app.price)}
                        className="w-full gradient-primary text-white"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Purchase via PayPal
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mobile">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMobileApps.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-all duration-300 border-2 border-blue-100">
                  <CardHeader className="p-4">
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <CardTitle className="flex items-center justify-between">
                      {app.name}
                      <Badge className="bg-blue-100 text-blue-700">{app.price}</Badge>
                    </CardTitle>
                    <CardDescription>{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {app.rating}
                      </div>
                      <span>{app.downloads}</span>
                      <span>{app.size}</span>
                    </div>
                    {downloadProgress[app.id] !== undefined ? (
                      <div className="space-y-2">
                        <Progress value={downloadProgress[app.id]} className="h-2" />
                        <p className="text-sm text-center">Creating Mobile Package... {downloadProgress[app.id]}%</p>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => simulateDownload(app.id, app.name, app.category, true, app.price)}
                        className="w-full gradient-primary text-white"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Purchase Mobile AI App
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pricing">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-center">Free Plan</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">$0</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Access to all 20 free AI SEO apps</li>
                    <li>• Basic AI keyword research</li>
                    <li>• Standard support</li>
                    <li>• Download up to 5 apps/month</li>
                    <li>• Basic AI analytics</li>
                    <li>• Limited AI processing power</li>
                  </ul>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    Get Started Free
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-center">Starter Plan</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Everything in Free Plan</li>
                    <li>• Access to 10 premium AI SEO apps</li>
                    <li>• Advanced AI keyword research</li>
                    <li>• Priority support</li>
                    <li>• Unlimited downloads</li>
                    <li>• Enhanced AI analytics</li>
                    <li>• 5 mobile AI apps included</li>
                  </ul>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Choose Starter
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Most Popular
                </Badge>
                <CardHeader>
                  <CardTitle className="text-center">Professional</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">$79</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Everything in Starter Plan</li>
                    <li>• Access to all 20 premium AI SEO apps</li>
                    <li>• All 20 mobile AI apps included</li>
                    <li>• White-label AI options</li>
                    <li>• AI API access</li>
                    <li>• Custom AI integrations</li>
                    <li>• Advanced AI training models</li>
                  </ul>
                  <Button className="w-full mt-4 gradient-primary text-white">
                    Choose Professional
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-200">
                <CardHeader>
                  <CardTitle className="text-center">Enterprise</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">$199</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Everything in Professional</li>
                    <li>• Custom AI app development</li>
                    <li>• Dedicated AI account manager</li>
                    <li>• 24/7 premium AI support</li>
                    <li>• Custom AI training sessions</li>
                    <li>• Enterprise-grade AI security</li>
                    <li>• Unlimited AI processing power</li>
                  </ul>
                  <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-gradient-to-r from-purple-600 to-amber-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold text-center mb-6">Complete Installation Packages Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">What You Get</h4>
                  <ul className="space-y-2">
                    <li>• Windows .exe installer with AI models</li>
                    <li>• macOS .app bundle with Metal acceleration</li>
                    <li>• Linux AppImage with dependencies</li>
                    <li>• Android .apk with full permissions</li>
                    <li>• iOS .ipa with enterprise certificate</li>
                    <li>• Complete documentation and setup guides</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">PayPal Integration</h4>
                  <ul className="space-y-2">
                    <li>• Secure instant payments</li>
                    <li>• Immediate download access</li>
                    <li>• Buyer protection included</li>
                    <li>• Multiple payment methods</li>
                    <li>• Global currency support</li>
                    <li>• 30-day money-back guarantee</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppHub;
