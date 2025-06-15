import { useState } from "react";
import { toast } from "sonner";
import { getVideoBySubject } from "@/utils/aiContentGenerator";

export interface EmailCampaign {
  id: number;
  subject: string;
  status: "Published" | "Draft" | "Scheduled";
  opens: number;
  clicks: number;
  sent: number;
  content: string;
  creative: {
    type: "image" | "video";
    url: string;
    alt: string;
  };
  aiGenerated: boolean;
  targetAudience: string;
}

export interface NewEmail {
  subject: string;
  content: string;
  recipients: string;
  scheduleDate: string;
  creative: {
    type: "image" | "video";
    url: string;
    alt: string;
  };
  aiGenerated: boolean;
  targetAudience: string;
}

const initialEmailList: EmailCampaign[] = [
  { 
    id: 1, 
    subject: "🚀 AI-Generated: Boost Your Organic Traffic with Our Digital Toolkit", 
    status: "Published", 
    opens: 1245, 
    clicks: 387, 
    sent: 2800, 
    content: "Discover how AI-powered digital products can transform your organic traffic strategy. Our comprehensive suite includes SEO optimization tools, content generation platforms, and traffic analytics dashboards designed specifically for organic growth. Join thousands of successful entrepreneurs who have mastered sustainable online growth with our proven digital solutions.",
    creative: {
      type: "video",
      url: getVideoBySubject("AI-Generated: Boost Your Organic Traffic with Our Digital Toolkit"),
      alt: "AI-generated video showcasing organic traffic growth strategies and digital marketing tools"
    },
    aiGenerated: true,
    targetAudience: "organic-traffic"
  },
  { 
    id: 2, 
    subject: "🎯 AI Content: SEO Mastery - New Digital Products for Organic Growth", 
    status: "Draft", 
    opens: 0, 
    clicks: 0, 
    sent: 0, 
    content: "Elevate your SEO game with our latest AI-curated collection of digital products. From advanced keyword research tools to automated content optimization systems, everything you need for sustainable organic traffic growth. Our products are designed by SEO experts and enhanced with AI to deliver maximum impact for your organic marketing efforts.",
    creative: {
      type: "image",
      url: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop",
      alt: "AI-generated image featuring SEO tools and organic traffic analytics dashboard"
    },
    aiGenerated: true,
    targetAudience: "organic-traffic"
  },
  { 
    id: 3, 
    subject: "📈 AI-Powered: Exclusive Organic Traffic Generation Masterclass", 
    status: "Scheduled", 
    opens: 0, 
    clicks: 0, 
    sent: 2150, 
    content: "Join our exclusive AI-enhanced masterclass on generating organic traffic that converts. Learn cutting-edge strategies powered by artificial intelligence, advanced SEO techniques, and proven content marketing methods used by top digital marketers to build sustainable online businesses. This comprehensive training includes AI tools, templates, and step-by-step guidance.",
    creative: {
      type: "video",
      url: getVideoBySubject("AI-Powered: Exclusive Organic Traffic Generation Masterclass"),
      alt: "AI-generated video presenting organic traffic masterclass with digital marketing strategies"
    },
    aiGenerated: true,
    targetAudience: "organic-traffic"
  },
];

const initialNewEmail: NewEmail = {
  subject: "",
  content: "",
  recipients: "organic-traffic",
  scheduleDate: "",
  creative: {
    type: "image",
    url: "",
    alt: ""
  },
  aiGenerated: false,
  targetAudience: "organic-traffic"
};

export const useEmailCampaign = () => {
  const [emailList, setEmailList] = useState<EmailCampaign[]>(initialEmailList);
  const [newEmail, setNewEmail] = useState<NewEmail>(initialNewEmail);
  const [isCreatingEmail, setIsCreatingEmail] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleCreateEmail = () => {
    if (!newEmail.subject.trim() || !newEmail.content.trim()) {
      toast.error("Please fill in both subject and content");
      return;
    }

    setIsCreatingEmail(true);
    toast.info("Creating AI-powered email campaign for organic traffic...");

    setTimeout(() => {
      const newEmailItem: EmailCampaign = {
        id: emailList.length + 1,
        subject: newEmail.subject,
        status: newEmail.scheduleDate ? "Scheduled" : "Draft",
        opens: 0,
        clicks: 0,
        sent: 0,
        content: newEmail.content,
        creative: newEmail.creative,
        aiGenerated: newEmail.aiGenerated,
        targetAudience: newEmail.targetAudience
      };

      setEmailList([newEmailItem, ...emailList]);
      setNewEmail(initialNewEmail);
      setIsCreatingEmail(false);
      
      toast.success("📧 AI-powered email campaign created!");
      toast.info("Campaign optimized for organic traffic audience");
    }, 2000);
  };

  const handlePublishEmail = (emailId: number) => {
    const emailToPublish = emailList.find(email => email.id === emailId);
    if (!emailToPublish) {
      toast.error("Email not found");
      return;
    }

    if (emailToPublish.status === "Published") {
      toast.info("This email campaign is already published!");
      return;
    }

    setIsPublishing(true);
    toast.info(`🚀 Publishing "${emailToPublish.subject}" to organic traffic audience...`);

    setTimeout(() => {
      const randomSent = Math.floor(Math.random() * 1200) + 1800;
      const randomOpens = Math.floor(randomSent * (0.4 + Math.random() * 0.2));
      const randomClicks = Math.floor(randomOpens * (0.15 + Math.random() * 0.15));

      setEmailList(emailList.map(email => 
        email.id === emailId 
          ? { ...email, status: "Published", sent: randomSent, opens: randomOpens, clicks: randomClicks }
          : email
      ));
      setIsPublishing(false);
      toast.success(`✅ "${emailToPublish.subject}" published successfully!`);
      toast.success(`📊 Sent to ${randomSent.toLocaleString()} organic traffic subscribers!`);
    }, 3000);
  };

  const handleDeleteEmail = (emailId: number) => {
    const emailToDelete = emailList.find(email => email.id === emailId);
    if (!emailToDelete) {
      toast.error("Email not found");
      return;
    }

    if (emailToDelete.status === "Published") {
      toast.error("❌ Cannot delete published campaigns");
      return;
    }

    setEmailList(emailList.filter(email => email.id !== emailId));
    toast.success(`🗑️ "${emailToDelete.subject}" deleted successfully!`);
  };

  const handleDuplicateEmail = (email: EmailCampaign) => {
    const duplicatedEmail: EmailCampaign = {
      id: emailList.length + 1,
      subject: `Copy of ${email.subject}`,
      status: "Draft",
      opens: 0,
      clicks: 0,
      sent: 0,
      content: email.content,
      creative: { ...email.creative },
      aiGenerated: email.aiGenerated,
      targetAudience: email.targetAudience
    };

    setEmailList([duplicatedEmail, ...emailList]);
    toast.success(`📋 Email duplicated: "Copy of ${email.subject}"`);
  };

  return {
    emailList,
    setEmailList,
    newEmail,
    setNewEmail,
    isCreatingEmail,
    isPublishing,
    handleCreateEmail,
    handlePublishEmail,
    handleDeleteEmail,
    handleDuplicateEmail
  };
};
