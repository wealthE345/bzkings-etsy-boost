
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Star, Shield, Check, Smartphone, Zap, TrendingUp, BarChart, Globe, Search, ExternalLink, Eye, Users, Target, Cpu, Brain, Bot, Settings, Calendar, Camera, Map, Video, ShoppingCart, Mic } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import JSZip from "jszip";

interface App {
  id: number;
  name: string;
  description: string;
  category: string;
  downloads: number;
  rating: number;
  price?: number;
  icon: any;
  features: string[];
  size: string;
  compatibility: string[];
}

interface Plan {
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const freeAIApps: App[] = [
  {
    id: 1,
    name: "AI SEO Content Writer",
    description: "Generate SEO-optimized content with AI",
    category: "SEO",
    downloads: 15420,
    rating: 4.8,
    icon: Settings,
    features: ["Content generation", "SEO optimization", "Keyword research"],
    size: "45 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 2,
    name: "AI Keyword Analyzer",
    description: "Analyze keywords and competition with AI",
    category: "SEO",
    downloads: 12350,
    rating: 4.7,
    icon: Search,
    features: ["Keyword analysis", "Competition research", "Trend tracking"],
    size: "38 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 3,
    name: "AI Backlink Hunter",
    description: "Find high-quality backlink opportunities",
    category: "SEO",
    downloads: 9870,
    rating: 4.6,
    icon: ExternalLink,
    features: ["Backlink discovery", "Domain analysis", "Outreach tools"],
    size: "52 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 4,
    name: "AI Meta Tag Generator",
    description: "Create perfect meta tags with AI",
    category: "SEO",
    downloads: 8750,
    rating: 4.5,
    icon: Settings,
    features: ["Meta tag creation", "Schema markup", "Open Graph tags"],
    size: "28 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 5,
    name: "AI Site Audit Pro",
    description: "Complete SEO audit with AI recommendations",
    category: "SEO",
    downloads: 11200,
    rating: 4.9,
    icon: BarChart,
    features: ["Site auditing", "SEO recommendations", "Performance tracking"],
    size: "65 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 6,
    name: "AI Rank Tracker",
    description: "Track keyword rankings with AI insights",
    category: "SEO",
    downloads: 7890,
    rating: 4.4,
    icon: TrendingUp,
    features: ["Rank tracking", "SERP analysis", "Competitor monitoring"],
    size: "42 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 7,
    name: "AI Content Optimizer",
    description: "Optimize existing content for better rankings",
    category: "SEO",
    downloads: 6540,
    rating: 4.6,
    icon: Settings,
    features: ["Content optimization", "Readability analysis", "SEO scoring"],
    size: "35 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 8,
    name: "AI Local SEO Manager",
    description: "Manage local SEO with AI automation",
    category: "SEO",
    downloads: 5430,
    rating: 4.7,
    icon: Map,
    features: ["Local listings", "Review management", "Citation building"],
    size: "48 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 9,
    name: "AI Schema Generator",
    description: "Generate structured data with AI",
    category: "SEO",
    downloads: 4320,
    rating: 4.5,
    icon: Settings,
    features: ["Schema markup", "Rich snippets", "JSON-LD generation"],
    size: "30 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 10,
    name: "AI Image SEO Optimizer",
    description: "Optimize images for search engines",
    category: "SEO",
    downloads: 3890,
    rating: 4.8,
    icon: Camera,
    features: ["Image optimization", "Alt text generation", "Compression"],
    size: "55 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 11,
    name: "AI Technical SEO Scanner",
    description: "Scan for technical SEO issues",
    category: "SEO",
    downloads: 6750,
    rating: 4.6,
    icon: Settings,
    features: ["Technical audits", "Core Web Vitals", "Site speed analysis"],
    size: "58 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 12,
    name: "AI SERP Analyzer",
    description: "Analyze search engine results pages",
    category: "SEO",
    downloads: 5640,
    rating: 4.7,
    icon: Eye,
    features: ["SERP analysis", "Feature tracking", "Competitor insights"],
    size: "40 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 13,
    name: "AI Link Building Assistant",
    description: "Automate link building campaigns",
    category: "SEO",
    downloads: 4870,
    rating: 4.5,
    icon: ExternalLink,
    features: ["Link prospecting", "Outreach automation", "Campaign tracking"],
    size: "46 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 14,
    name: "AI Content Gap Finder",
    description: "Find content gaps with AI analysis",
    category: "SEO",
    downloads: 3450,
    rating: 4.8,
    icon: Target,
    features: ["Gap analysis", "Content suggestions", "Opportunity scoring"],
    size: "38 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 15,
    name: "AI Voice Search Optimizer",
    description: "Optimize for voice search queries",
    category: "SEO",
    downloads: 2890,
    rating: 4.6,
    icon: Mic,
    features: ["Voice search optimization", "Featured snippets", "FAQ generation"],
    size: "32 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 16,
    name: "AI Mobile SEO Checker",
    description: "Check mobile SEO performance",
    category: "SEO",
    downloads: 4560,
    rating: 4.7,
    icon: Smartphone,
    features: ["Mobile optimization", "Page speed", "User experience"],
    size: "44 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 17,
    name: "AI International SEO Manager",
    description: "Manage multi-language SEO campaigns",
    category: "SEO",
    downloads: 2340,
    rating: 4.5,
    icon: Globe,
    features: ["Hreflang tags", "Multi-language SEO", "Regional targeting"],
    size: "50 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 18,
    name: "AI E-commerce SEO Suite",
    description: "Complete SEO solution for online stores",
    category: "SEO",
    downloads: 5670,
    rating: 4.9,
    icon: ShoppingCart,
    features: ["Product optimization", "Category SEO", "Rich snippets"],
    size: "68 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 19,
    name: "AI Video SEO Optimizer",
    description: "Optimize videos for search engines",
    category: "SEO",
    downloads: 3780,
    rating: 4.6,
    icon: Video,
    features: ["Video optimization", "Transcript generation", "Video sitemaps"],
    size: "62 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 20,
    name: "AI Social SEO Tracker",
    description: "Track social signals and SEO impact",
    category: "SEO",
    downloads: 2950,
    rating: 4.4,
    icon: Users,
    features: ["Social signal tracking", "Engagement analysis", "Viral content detection"],
    size: "36 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  }
];

const paidAIApps: App[] = [
  {
    id: 21,
    name: "AI SEO Enterprise Suite",
    description: "Complete enterprise SEO solution with AI",
    category: "SEO",
    downloads: 8540,
    rating: 4.9,
    price: 299,
    icon: Cpu,
    features: ["Enterprise reporting", "Team collaboration", "Advanced analytics"],
    size: "120 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 22,
    name: "AI Content Marketing Platform",
    description: "Advanced content marketing with AI automation",
    category: "Marketing",
    downloads: 6780,
    rating: 4.8,
    price: 199,
    icon: Brain,
    features: ["Content automation", "Performance tracking", "ROI analysis"],
    size: "95 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 23,
    name: "AI Competitor Intelligence",
    description: "Deep competitor analysis with AI insights",
    category: "Analytics",
    downloads: 5430,
    rating: 4.7,
    price: 149,
    icon: Eye,
    features: ["Competitor tracking", "Market analysis", "Strategy recommendations"],
    size: "78 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 24,
    name: "AI Conversion Optimizer",
    description: "Optimize conversions with AI testing",
    category: "CRO",
    downloads: 4890,
    rating: 4.9,
    price: 179,
    icon: Target,
    features: ["A/B testing", "Heatmap analysis", "Conversion tracking"],
    size: "88 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 25,
    name: "AI Link Building Pro",
    description: "Professional link building with AI",
    category: "SEO",
    downloads: 3670,
    rating: 4.6,
    price: 129,
    icon: ExternalLink,
    features: ["Advanced prospecting", "Automated outreach", "Quality scoring"],
    size: "65 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 26,
    name: "AI Technical SEO Auditor",
    description: "Advanced technical SEO auditing",
    category: "SEO",
    downloads: 4120,
    rating: 4.8,
    price: 159,
    icon: Settings,
    features: ["Deep technical audits", "Custom recommendations", "Priority scoring"],
    size: "72 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 27,
    name: "AI Keyword Research Pro",
    description: "Professional keyword research suite",
    category: "SEO",
    downloads: 5890,
    rating: 4.7,
    price: 99,
    icon: Search,
    features: ["Advanced keyword metrics", "Competitor keywords", "Trend forecasting"],
    size: "58 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 28,
    name: "AI Content Strategy Planner",
    description: "Strategic content planning with AI",
    category: "Content",
    downloads: 3450,
    rating: 4.9,
    price: 189,
    icon: Calendar,
    features: ["Content calendar", "Strategy optimization", "Performance prediction"],
    size: "82 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 29,
    name: "AI Local SEO Dominator",
    description: "Dominate local search with AI",
    category: "Local SEO",
    downloads: 2890,
    rating: 4.6,
    price: 139,
    icon: Map,
    features: ["Local rank tracking", "Citation management", "Review automation"],
    size: "76 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 30,
    name: "AI E-commerce Growth Suite",
    description: "Complete e-commerce growth platform",
    category: "E-commerce",
    downloads: 4560,
    rating: 4.8,
    price: 249,
    icon: ShoppingCart,
    features: ["Sales optimization", "Inventory SEO", "Customer journey mapping"],
    size: "110 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 31,
    name: "AI Social Media SEO Manager",
    description: "Integrate social media with SEO strategy",
    category: "Social SEO",
    downloads: 3780,
    rating: 4.7,
    price: 119,
    icon: Users,
    features: ["Social SEO integration", "Cross-platform analytics", "Viral content optimization"],
    size: "69 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 32,
    name: "AI Video Marketing Suite",
    description: "Complete video marketing and SEO solution",
    category: "Video Marketing",
    downloads: 2670,
    rating: 4.9,
    price: 199,
    icon: Video,
    features: ["Video SEO", "YouTube optimization", "Video analytics"],
    size: "125 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 33,
    name: "AI International SEO Pro",
    description: "Professional international SEO management",
    category: "International SEO",
    downloads: 1890,
    rating: 4.6,
    price: 179,
    icon: Globe,
    features: ["Multi-country SEO", "Currency optimization", "Cultural adaptation"],
    size: "92 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 34,
    name: "AI Voice Search Dominator",
    description: "Dominate voice search with AI optimization",
    category: "Voice SEO",
    downloads: 2340,
    rating: 4.8,
    price: 149,
    icon: Mic,
    features: ["Voice search optimization", "Conversational content", "Smart speaker SEO"],
    size: "74 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 35,
    name: "AI Mobile-First SEO Suite",
    description: "Mobile-first SEO optimization platform",
    category: "Mobile SEO",
    downloads: 3120,
    rating: 4.7,
    price: 129,
    icon: Smartphone,
    features: ["Mobile-first indexing", "AMP optimization", "Progressive web apps"],
    size: "86 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 36,
    name: "AI Schema Markup Generator Pro",
    description: "Advanced schema markup generation",
    category: "Technical SEO",
    downloads: 1670,
    rating: 4.9,
    price: 89,
    icon: Settings,
    features: ["Advanced schema types", "Validation tools", "Rich snippet preview"],
    size: "54 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 37,
    name: "AI Page Speed Optimizer",
    description: "Optimize page speed with AI recommendations",
    category: "Performance",
    downloads: 4230,
    rating: 4.8,
    price: 109,
    icon: Zap,
    features: ["Speed optimization", "Core Web Vitals", "Performance monitoring"],
    size: "63 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 38,
    name: "AI Security SEO Scanner",
    description: "Scan for security issues affecting SEO",
    category: "Security",
    downloads: 2890,
    rating: 4.6,
    price: 159,
    icon: Shield,
    features: ["Security audits", "Malware detection", "HTTPS optimization"],
    size: "71 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 39,
    name: "AI Analytics Integration Suite",
    description: "Integrate all analytics platforms with AI",
    category: "Analytics",
    downloads: 3450,
    rating: 4.9,
    price: 219,
    icon: BarChart,
    features: ["Multi-platform integration", "Unified reporting", "Predictive analytics"],
    size: "98 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  },
  {
    id: 40,
    name: "AI SEO Automation Platform",
    description: "Complete SEO automation with AI",
    category: "Automation",
    downloads: 5670,
    rating: 4.8,
    price: 349,
    icon: Bot,
    features: ["Full automation", "Custom workflows", "AI decision making"],
    size: "145 MB",
    compatibility: ["Windows", "macOS", "Linux", "Android", "iOS"]
  }
];

const mobileAIApps: App[] = [
  {
    id: 41,
    name: "AI Mobile SEO Scanner",
    description: "Scan websites for mobile SEO issues",
    category: "Mobile",
    downloads: 25670,
    rating: 4.8,
    price: 4.99,
    icon: Smartphone,
    features: ["Mobile audits", "Speed testing", "UX analysis"],
    size: "25 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 42,
    name: "AI Keyword Tracker Mobile",
    description: "Track keywords on mobile devices",
    category: "Mobile",
    downloads: 18450,
    rating: 4.7,
    price: 3.99,
    icon: Search,
    features: ["Real-time tracking", "Push notifications", "Offline access"],
    size: "18 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 43,
    name: "AI Content Creator Mobile",
    description: "Create SEO content on the go",
    category: "Mobile",
    downloads: 22340,
    rating: 4.9,
    price: 6.99,
    icon: Settings,
    features: ["Voice-to-text", "AI writing", "Cloud sync"],
    size: "32 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 44,
    name: "AI Social Media Manager",
    description: "Manage social media with AI insights",
    category: "Mobile",
    downloads: 31200,
    rating: 4.6,
    price: 7.99,
    icon: Users,
    features: ["Auto-posting", "Engagement analysis", "Hashtag optimization"],
    size: "28 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 45,
    name: "AI Photo SEO Optimizer",
    description: "Optimize photos for search engines",
    category: "Mobile",
    downloads: 15890,
    rating: 4.8,
    price: 2.99,
    icon: Camera,
    features: ["Auto alt-text", "Image compression", "Metadata editing"],
    size: "22 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 46,
    name: "AI Link Builder Mobile",
    description: "Build backlinks using mobile device",
    category: "Mobile",
    downloads: 12670,
    rating: 4.5,
    price: 5.99,
    icon: ExternalLink,
    features: ["Prospect discovery", "Email templates", "Follow-up automation"],
    size: "24 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 47,
    name: "AI Rank Checker Pro",
    description: "Check rankings with mobile convenience",
    category: "Mobile",
    downloads: 28450,
    rating: 4.7,
    price: 4.99,
    icon: TrendingUp,
    features: ["Local rankings", "SERP screenshots", "Competitor tracking"],
    size: "26 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 48,
    name: "AI Local SEO Assistant",
    description: "Manage local SEO from mobile",
    category: "Mobile",
    downloads: 19230,
    rating: 4.9,
    price: 8.99,
    icon: Map,
    features: ["Google My Business", "Review management", "Citation tracking"],
    size: "35 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 49,
    name: "AI Voice Search Optimizer",
    description: "Optimize for voice search on mobile",
    category: "Mobile",
    downloads: 14560,
    rating: 4.6,
    price: 3.99,
    icon: Mic,
    features: ["Voice queries", "Featured snippets", "FAQ optimization"],
    size: "20 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 50,
    name: "AI Technical SEO Mobile",
    description: "Technical SEO analysis on mobile",
    category: "Mobile",
    downloads: 11890,
    rating: 4.8,
    price: 6.99,
    icon: Settings,
    features: ["Site audits", "Speed analysis", "Mobile-first indexing"],
    size: "30 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 51,
    name: "AI Content Planner Mobile",
    description: "Plan content strategy on mobile",
    category: "Mobile",
    downloads: 16780,
    rating: 4.7,
    price: 5.99,
    icon: Calendar,
    features: ["Content calendar", "Idea generation", "Publishing scheduler"],
    size: "27 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 52,
    name: "AI Competitor Spy Mobile",
    description: "Spy on competitors using mobile",
    category: "Mobile",
    downloads: 13450,
    rating: 4.5,
    price: 7.99,
    icon: Eye,
    features: ["Competitor analysis", "Keyword gaps", "Backlink analysis"],
    size: "29 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 53,
    name: "AI Analytics Dashboard",
    description: "Mobile analytics dashboard with AI",
    category: "Mobile",
    downloads: 24670,
    rating: 4.8,
    price: 9.99,
    icon: BarChart,
    features: ["Real-time data", "Custom reports", "Predictive insights"],
    size: "33 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 54,
    name: "AI E-commerce Mobile Suite",
    description: "Mobile e-commerce optimization",
    category: "Mobile",
    downloads: 18920,
    rating: 4.9,
    price: 12.99,
    icon: ShoppingCart,
    features: ["Product optimization", "Sales tracking", "Inventory management"],
    size: "38 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 55,
    name: "AI Video SEO Mobile",
    description: "Optimize videos for SEO on mobile",
    category: "Mobile",
    downloads: 12340,
    rating: 4.6,
    price: 8.99,
    icon: Video,
    features: ["Video optimization", "Thumbnail creation", "Description generation"],
    size: "42 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 56,
    name: "AI Schema Generator Mobile",
    description: "Generate schema markup on mobile",
    category: "Mobile",
    downloads: 9870,
    rating: 4.7,
    price: 4.99,
    icon: Settings,
    features: ["Schema creation", "Rich snippets", "Markup validation"],
    size: "21 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 57,
    name: "AI Backlink Checker Mobile",
    description: "Check backlinks using mobile device",
    category: "Mobile",
    downloads: 15670,
    rating: 4.8,
    price: 6.99,
    icon: ExternalLink,
    features: ["Backlink monitoring", "Quality assessment", "Disavow suggestions"],
    size: "26 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 58,
    name: "AI Meta Tag Creator Mobile",
    description: "Create meta tags on mobile",
    category: "Mobile",
    downloads: 11230,
    rating: 4.5,
    price: 2.99,
    icon: Settings,
    features: ["Meta generation", "Preview mode", "Bulk editing"],
    size: "18 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 59,
    name: "AI Security Scanner Mobile",
    description: "Mobile security scanning for SEO",
    category: "Mobile",
    downloads: 8450,
    rating: 4.9,
    price: 9.99,
    icon: Shield,
    features: ["Security audits", "Malware detection", "SSL checking"],
    size: "24 MB",
    compatibility: ["Android", "iOS"]
  },
  {
    id: 60,
    name: "AI International SEO Mobile",
    description: "Manage international SEO on mobile",
    category: "Mobile",
    downloads: 7890,
    rating: 4.6,
    price: 11.99,
    icon: Globe,
    features: ["Multi-language SEO", "Hreflang management", "Regional targeting"],
    size: "34 MB",
    compatibility: ["Android", "iOS"]
  }
];

const plans: Plan[] = [
  {
    name: "Free Starter",
    price: 0,
    features: [
      "Access to 20 Free AI SEO Apps",
      "AI Ad Campaign Builder (Basic)",
      "3 ad campaigns per month",
      "Basic templates & targeting",
      "Basic keyword research",
      "Standard support",
      "500 backlinks from 50+ domains",
      "Basic analytics"
    ]
  },
  {
    name: "Professional",
    price: 29,
    popular: true,
    features: [
      "All Free features",
      "Access to Premium AI Apps",
      "AI Ad Campaign Builder (Pro)",
      "Unlimited ad campaigns",
      "Advanced AI content generation",
      "A/B testing & optimization",
      "Premium templates & targeting",
      "Advanced keyword research",
      "Priority support",
      "1500 backlinks from 100+ domains",
      "Advanced analytics",
      "Mobile app access"
    ]
  },
  {
    name: "Enterprise",
    price: 99,
    features: [
      "All Professional features",
      "Unlimited AI app access",
      "AI Ad Campaign Builder (Enterprise)",
      "White-label ad campaigns",
      "Custom AI models & training",
      "Multi-account management",
      "Enterprise-grade security",
      "Dedicated account manager",
      "5000 backlinks from 100+ premium domains",
      "Custom integrations",
      "White-label options"
    ]
  }
];

const generateAppFiles = async (app: App): Promise<Blob> => {
  const zip = new JSZip();

  // Create installation package with universal compatibility
  const installationGuide = `
# ${app.name} Installation Guide

## System Requirements
- Operating System: Windows 10/11, macOS 10.14+, Ubuntu 18.04+, Android 8.0+, iOS 12.0+
- RAM: 4GB minimum, 8GB recommended
- Storage: ${app.size} free space
- Internet connection required for initial setup

## Installation Instructions

### Windows Installation:
1. Extract the ZIP file to your desired location
2. Run "${app.name.replace(/\s+/g, '')}.exe" as administrator
3. Follow the installation wizard
4. Launch from Desktop shortcut or Start Menu

### macOS Installation:
1. Extract the ZIP file
2. Drag "${app.name}.app" to Applications folder
3. Right-click and select "Open" if blocked by Gatekeeper
4. Grant necessary permissions when prompted

### Linux Installation:
1. Extract the ZIP file
2. Open terminal in extracted folder
3. Run: chmod +x install.sh
4. Run: ./install.sh
5. Launch with: ./${app.name.replace(/\s+/g, '').toLowerCase()}

### Android Installation:
1. Enable "Unknown Sources" in Settings > Security
2. Install the "${app.name.replace(/\s+/g, '')}.apk" file
3. Grant required permissions
4. Launch from app drawer

### iOS Installation:
1. Download from App Store or install via TestFlight
2. Trust the developer certificate in Settings > General > Profiles
3. Launch from home screen

## Features Included:
${app.features.map(feature => `- ${feature}`).join('\n')}

## Support:
For technical support, visit: https://bzkingsdigitalmall.etsy.com/support
Email: wealthenterprise69@gmail.com

## License:
This software is licensed under the BZ Kings Digital Mall License Agreement.
`;

  const configFile = `
{
  "app": {
    "name": "${app.name}",
    "version": "1.0.0",
    "description": "${app.description}",
    "category": "${app.category}",
    "compatibility": ${JSON.stringify(app.compatibility)},
    "features": ${JSON.stringify(app.features)},
    "size": "${app.size}",
    "rating": ${app.rating},
    "downloads": ${app.downloads}
  },
  "ai_models": {
    "nlp_model": "gpt-4-turbo",
    "computer_vision": "yolo-v8",
    "recommendation_engine": "collaborative-filtering-v2",
    "optimization_algorithm": "genetic-algorithm-enhanced"
  },
  "database": {
    "type": "sqlite",
    "file": "app_data.db",
    "backup_enabled": true
  },
  "api_endpoints": {
    "analytics": "https://api.bzkingsdigitalmall.com/analytics",
    "updates": "https://api.bzkingsdigitalmall.com/updates",
    "support": "https://api.bzkingsdigitalmall.com/support"
  }
}
`;

  const sourceCode = `
# ${app.name} - Main Application
# Copyright (c) 2024 BZ Kings Digital Mall

import ai_engine
import database_manager
import ui_framework
from config import AppConfig

class ${app.name.replace(/\s+/g, '')}:
    def __init__(self):
        self.config = AppConfig()
        self.ai_engine = ai_engine.initialize()
        self.database = database_manager.connect()
        self.ui = ui_framework.create_interface()
        
    def start_application(self):
        """Initialize and start the application"""
        self.setup_ai_models()
        self.load_user_preferences()
        self.start_background_services()
        self.show_main_interface()
        
    def setup_ai_models(self):
        """Load and configure AI models"""
        models = self.config.get_ai_models()
        for model_name, model_config in models.items():
            self.ai_engine.load_model(model_name, model_config)
            
    def process_user_input(self, input_data):
        """Process user input with AI enhancement"""
        processed_data = self.ai_engine.analyze(input_data)
        return self.generate_recommendations(processed_data)
        
    def generate_recommendations(self, data):
        """Generate AI-powered recommendations"""
        return self.ai_engine.recommend(data)

if __name__ == "__main__":
    app = ${app.name.replace(/\s+/g, '')}()
    app.start_application()
`;

  const databaseSchema = `
-- ${app.name} Database Schema
-- Copyright (c) 2024 BZ Kings Digital Mall

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    preferences TEXT
);

CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action VARCHAR(100),
    data TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS ai_models (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    model_name VARCHAR(100),
    version VARCHAR(20),
    file_path TEXT,
    loaded_at TIMESTAMP,
    performance_metrics TEXT
);

INSERT INTO ai_models (model_name, version, file_path) VALUES
('nlp_processor', '1.0.0', 'models/nlp_v1.bin'),
('image_analyzer', '2.1.0', 'models/vision_v2.bin'),
('recommendation_engine', '1.5.0', 'models/recommend_v1.bin');
`;

  // Add files to ZIP
  zip.file("README.md", installationGuide);
  zip.file("config.json", configFile);
  zip.file("main.py", sourceCode);
  zip.file("database/schema.sql", databaseSchema);
  
  // Add platform-specific executables (mock files)
  zip.file(`windows/${app.name.replace(/\s+/g, '')}.exe`, "Windows executable placeholder");
  zip.file(`macos/${app.name}.app/Contents/MacOS/${app.name}`, "macOS executable placeholder");
  zip.file(`linux/${app.name.replace(/\s+/g, '').toLowerCase()}`, "Linux executable placeholder");
  zip.file(`android/${app.name.replace(/\s+/g, '')}.apk`, "Android APK placeholder");
  zip.file(`ios/${app.name}.ipa`, "iOS IPA placeholder");
  
  // Add AI model files (placeholders)
  zip.file("models/nlp_v1.bin", "NLP model data placeholder");
  zip.file("models/vision_v2.bin", "Computer vision model placeholder");
  zip.file("models/recommend_v1.bin", "Recommendation engine placeholder");
  
  // Add documentation
  zip.file("docs/API_Documentation.md", `# ${app.name} API Documentation\n\nComplete API reference for ${app.name}...`);
  zip.file("docs/User_Manual.pdf", "User manual PDF placeholder");
  
  return await zip.generateAsync({ type: "blob" });
};

const downloadApp = async (app: App) => {
  try {
    toast.info(`Preparing ${app.name} for download...`);
    
    const zipBlob = await generateAppFiles(app);
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${app.name.replace(/\s+/g, '_')}_v1.0.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`${app.name} downloaded successfully!`);
  } catch (error) {
    console.error('Download error:', error);
    toast.error('Download failed. Please try again.');
  }
};

const handlePayment = (app: App) => {
  if (!app.price) {
    downloadApp(app);
    return;
  }
  
  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=wealthenterprise69@gmail.com&item_name=${encodeURIComponent(app.name)}&amount=${app.price}&currency_code=USD&return=https://bzkingsdigitalmall.etsy.com/success&cancel_return=https://bzkingsdigitalmall.etsy.com/cancel`;
  
  toast.info("Redirecting to PayPal for secure payment...");
  window.open(paypalUrl, '_blank');
};

const AppHub = () => {
  const [activeTab, setActiveTab] = useState("free");

  const renderAppCard = (app: App) => (
    <Card key={app.id} className="hover:shadow-lg transition-all duration-300 glass-effect border-white/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <app.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-white">{app.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-white/70 ml-1">{app.rating}</span>
                </div>
                <span className="text-white/50">•</span>
                <span className="text-sm text-white/70">{app.downloads.toLocaleString()} downloads</span>
              </div>
            </div>
          </div>
          {app.price && (
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              ${app.price}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-white/80 mb-4">
          {app.description}
        </CardDescription>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-white">Features:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {app.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs border-purple-300 text-purple-200">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Size: {app.size}</span>
            <span>Compatible: {app.compatibility.join(", ")}</span>
          </div>
          <Button
            onClick={() => handlePayment(app)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            {app.price ? `Buy for $${app.price}` : 'Download Free'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen animated-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-purple-700 border-purple-300 glass-effect">
            🤖 AI-Powered Applications
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
            AI App Hub
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            Download powerful AI applications for SEO, marketing, and business growth. 
            Professional tools designed for <span className="font-semibold text-yellow-300">BZ Kings Digital Mall</span> customers.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative glass-effect border-white/20 ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-white">
                  ${plan.price}<span className="text-lg font-normal text-white/70">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-white/90">
                      <Check className="h-5 w-5 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  {plan.price === 0 ? 'Get Started' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 glass-effect border-white/20">
            <TabsTrigger value="free" className="text-white data-[state=active]:bg-white/20">
              Free AI Apps (20)
            </TabsTrigger>
            <TabsTrigger value="paid" className="text-white data-[state=active]:bg-white/20">
              Premium AI Apps (20)
            </TabsTrigger>
            <TabsTrigger value="mobile" className="text-white data-[state=active]:bg-white/20">
              Mobile Apps (20)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="free">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeAIApps.map(renderAppCard)}
            </div>
          </TabsContent>

          <TabsContent value="paid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paidAIApps.map(renderAppCard)}
            </div>
          </TabsContent>

          <TabsContent value="mobile">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mobileAIApps.map(renderAppCard)}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto glass-effect border-white/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Need Custom AI Solutions?</h3>
              <p className="text-lg mb-6 text-white/90">
                Contact our team for custom AI application development tailored to your business needs.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                onClick={() => window.open("mailto:wealthenterprise69@gmail.com", "_blank")}
              >
                Contact Our Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppHub;
