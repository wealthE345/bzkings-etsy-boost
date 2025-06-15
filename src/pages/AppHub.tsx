
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

  const simulateDownload = async (appId: string, appName: string, category: string, isPaid: boolean = false, price?: string) => {
    if (isPaid && price) {
      handlePayPalPayment(price, appName);
      return;
    }

    setDownloadProgress(prev => ({ ...prev, [appId]: 0 }));
    
    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setDownloadProgress(prev => ({ ...prev, [appId]: i }));
    }

    // Create comprehensive zip content based on app type
    let zipContent = `# ${appName} - AI-Powered Installation Package\n\n`;
    
    zipContent += `## AI-Enhanced Features\n- Advanced machine learning algorithms\n- Real-time AI optimization\n- Intelligent automation capabilities\n- Smart analytics and insights\n\n`;
    
    if (category === "Mobile") {
      zipContent += `## Mobile App Installation\n\n### Android Installation (.apk):\n1. Enable "Unknown Sources" in Settings > Security\n2. Install ${appName}.apk\n3. Grant necessary permissions for AI features\n4. Connect to internet for AI model updates\n\n### iOS Installation (.ipa):\n1. Install ${appName}.ipa using AltStore or TestFlight\n2. Trust the developer in Settings > General > Device Management\n3. Allow AI processing permissions\n\n### Cross-Platform Features:\n- Works on Android 8.0+ and iOS 12.0+\n- Offline AI functionality with periodic updates\n- Cloud sync for AI learning data\n- Push notifications for AI insights\n- Biometric authentication support\n\n`;
    } else {
      zipContent += `## Desktop Installation Instructions\n\n### Windows (AI-Optimized):\n1. Extract ZIP file to desired location\n2. Run ${appName}_Setup_AI.exe as Administrator\n3. Follow AI setup wizard\n4. Allow Windows Defender exception for AI modules\n5. Install Visual C++ Redistributables if prompted\n\n### macOS (AI-Enhanced):\n1. Extract ZIP file\n2. Drag ${appName}_AI.app to Applications folder\n3. Allow app in Security & Privacy settings\n4. Install Rosetta 2 if using Apple Silicon\n5. Grant AI processing permissions\n\n### Linux (AI-Powered):\n1. Extract ZIP file\n2. Make ${appName}_AI.AppImage executable: chmod +x\n3. Install required AI dependencies: ./install_ai_deps.sh\n4. Run: ./${appName}_AI.AppImage\n\n`;
    }
    
    zipContent += `## AI System Requirements\n- CPU: Quad-core processor (Intel i5/AMD Ryzen 5 or better)\n- RAM: 8GB minimum, 16GB recommended for AI processing\n- Storage: 5GB free space for AI models\n- GPU: DirectX 11 compatible (CUDA support recommended)\n- Internet: Broadband connection for AI model updates\n- OS: Windows 10/11, macOS 10.15+, Ubuntu 18.04+\n\n## AI License Information\n- Full AI feature license included\n- Commercial use permitted\n- Lifetime updates for AI models\n- Priority AI support included\n- Multi-device activation (up to 3 devices)\n\n## Installation Files Included:\n- ${appName}_Windows_AI.exe (Windows installer)\n- ${appName}_macOS_AI.dmg (macOS installer)\n- ${appName}_Linux_AI.AppImage (Linux portable)\n- ${appName}_Android_AI.apk (Android app)\n- ${appName}_iOS_AI.ipa (iOS app)\n- AI_Models/ (Pre-trained AI models)\n- Documentation/ (User manual and API docs)\n- Templates/ (AI-optimized templates)\n- Plugins/ (Third-party AI extensions)\n- License_AI.txt (AI licensing terms)\n\n## AI Training Data\n- Pre-loaded with 50GB+ training datasets\n- Industry-specific AI models included\n- Continuous learning capabilities\n- Custom AI model training tools\n- Export/import AI configurations\n\n## Quick Start Guide\n1. Install the application for your platform\n2. Launch and complete AI calibration wizard\n3. Import your data for AI analysis\n4. Configure AI preferences and thresholds\n5. Start using AI-powered features immediately\n\n## AI Support & Updates\n- Email: ai-support@bzkingsdigitalmall.com\n- Website: https://bzkingsdigitalmall.etsy.com\n- AI Documentation: Included in /docs/ai folder\n- Video Tutorials: Access via app help menu\n- Community Forum: https://forum.bzkingsdigitalmall.com\n\n## Version: 2.0 AI-Enhanced\nBuild Date: ${new Date().toLocaleDateString()}\nAI Model Version: 1.5.3\nLast AI Training: ${new Date().toLocaleDateString()}\n\nThank you for choosing ${appName} - Where AI meets productivity!`;
    
    const blob = new Blob([zipContent], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${appName.replace(/\s+/g, '_')}_AI_v2.0.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadProgress(prev => ({ ...prev, [appId]: undefined }));
    toast.success(`${appName} AI package downloaded successfully!`);
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
            <p className="text-gray-600 mt-2">Professional AI-Powered SEO & Mobile Apps - Download & Install on Any Device</p>
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
                        <p className="text-sm text-center">Downloading AI Package... {downloadProgress[app.id]}%</p>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => simulateDownload(app.id, app.name, app.category)}
                        className="w-full gradient-primary text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Free AI App
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
                        <p className="text-sm text-center">Processing Payment & Download... {downloadProgress[app.id]}%</p>
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
                        <p className="text-sm text-center">Processing Mobile Payment... {downloadProgress[app.id]}%</p>
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
              <h3 className="text-2xl font-bold text-center mb-6">PayPal Payment Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Secure Payments</h4>
                  <ul className="space-y-2">
                    <li>• Instant PayPal checkout</li>
                    <li>• Secure payment processing</li>
                    <li>• Immediate download access</li>
                    <li>• Buyer protection included</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Payment Methods</h4>
                  <ul className="space-y-2">
                    <li>• PayPal account</li>
                    <li>• Credit/Debit cards</li>
                    <li>• Bank transfers</li>
                    <li>• PayPal Credit (where available)</li>
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
