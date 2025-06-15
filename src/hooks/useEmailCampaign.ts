import { useState } from "react";
import { toast } from "sonner";

export interface EmailCampaign {
  id: number;
  subject: string;
  content: string;
  status: "Draft" | "Scheduled" | "Published";
  sent: number;
  opens: number;
  clicks: number;
  aiGenerated?: boolean;
  targetAudience?: string;
  creative?: {
    type: "image" | "video";
    url: string;
    alt: string;
  };
  startDate?: string;
  endDate?: string;
}

export interface NewEmail {
  subject?: string;
  content?: string;
  creative?: {
    type: "image" | "video";
    url: string;
    alt: string;
  };
  aiGenerated?: boolean;
  targetAudience?: string;
  recipients?: string[];
  scheduleDate?: string;
}

export const useEmailCampaign = () => {
  const [emailList, setEmailList] = useState<EmailCampaign[]>([]);
  const [newEmail, setNewEmail] = useState<NewEmail>({});
  const [isCreatingEmail, setIsCreatingEmail] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleCreateEmail = () => {
    if (!newEmail.subject?.trim() || !newEmail.content?.trim()) {
      toast.error("Please fill in both subject and content");
      return;
    }

    setIsCreatingEmail(true);
    toast.info("🚀 Creating your AI-powered email campaign...");

    setTimeout(() => {
      const newCampaign: EmailCampaign = {
        id: emailList.length + 1,
        subject: newEmail.subject,
        content: newEmail.content,
        status: "Draft",
        sent: 0,
        opens: 0,
        clicks: 0,
        aiGenerated: newEmail.aiGenerated || false,
        targetAudience: newEmail.targetAudience || "organic-traffic",
        creative: newEmail.creative,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      setEmailList([...emailList, newCampaign]);
      setNewEmail({});
      setIsCreatingEmail(false);
      toast.success("✅ Email campaign created successfully!");
    }, 2000);
  };

  const handlePublishEmail = (email: EmailCampaign) => {
    setIsPublishing(true);
    toast.info(`🚀 Publishing: "${email.subject}"...`);

    setTimeout(() => {
      setEmailList(emailList.map(e =>
        e.id === email.id ? { ...e, status: "Published" } : e
      ));
      setIsPublishing(false);
      toast.success(`✅ Published: "${email.subject}"!`);
    }, 2000);
  };

  const handleDeleteEmail = (email: EmailCampaign) => {
    setEmailList(emailList.filter(e => e.id !== email.id));
    toast.success(`🗑️ Deleted: "${email.subject}"`);
  };

  const handleDuplicateEmail = (email: EmailCampaign) => {
    const duplicatedEmail: EmailCampaign = {
      ...email,
      id: emailList.length + 1,
      subject: `${email.subject} (Copy)`,
      status: "Draft",
      sent: 0,
      opens: 0,
      clicks: 0,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    setEmailList([...emailList, duplicatedEmail]);
    toast.success(`📄 Duplicated: "${email.subject}"`);
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
