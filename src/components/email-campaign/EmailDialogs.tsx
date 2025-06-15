
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Wand2, Target, Video, ImageIcon, Edit, Send, BarChart3 } from "lucide-react";
import { EmailCampaign } from "@/hooks/useEmailCampaign";
import { toast } from "sonner";

interface EmailDialogsProps {
  previewEmail: EmailCampaign | null;
  editingEmail: EmailCampaign | null;
  analyticsEmail: EmailCampaign | null;
  isPreviewDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isAnalyticsDialogOpen: boolean;
  setIsPreviewDialogOpen: (open: boolean) => void;
  setIsEditDialogOpen: (open: boolean) => void;
  setIsAnalyticsDialogOpen: (open: boolean) => void;
  setEditingEmail: (email: EmailCampaign | null) => void;
  onSaveEdit: (email: EmailCampaign) => void;
  onPublishEmail: (emailId: number) => void;
  onEditEmail: (email: EmailCampaign) => void;
}

export const EmailDialogs = ({
  previewEmail,
  editingEmail,
  analyticsEmail,
  isPreviewDialogOpen,
  isEditDialogOpen,
  isAnalyticsDialogOpen,
  setIsPreviewDialogOpen,
  setIsEditDialogOpen,
  setIsAnalyticsDialogOpen,
  setEditingEmail,
  onSaveEdit,
  onPublishEmail,
  onEditEmail
}: EmailDialogsProps) => {
  const emailAnalytics = [
    { name: 'Week 1', sent: 1200, opened: 520, clicked: 156, unsubscribed: 12 },
    { name: 'Week 2', sent: 1450, opened: 638, clicked: 191, unsubscribed: 18 },
    { name: 'Week 3', sent: 1600, opened: 768, clicked: 230, unsubscribed: 22 },
    { name: 'Week 4', sent: 1850, opened: 925, clicked: 278, unsubscribed: 25 },
  ];

  const handleSaveEdit = () => {
    if (!editingEmail) return;
    
    if (!editingEmail.subject.trim() || !editingEmail.content.trim()) {
      toast.error("Please fill in both subject and content");
      return;
    }

    onSaveEdit(editingEmail);
    setIsEditDialogOpen(false);
    setEditingEmail(null);
    toast.success(`✅ "${editingEmail.subject}" updated successfully!`);
  };

  return (
    <>
      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>📧 AI Email Preview - Organic Traffic Campaign</DialogTitle>
            <DialogDescription>Preview how your AI-generated email will look to organic traffic subscribers</DialogDescription>
          </DialogHeader>
          {previewEmail && (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-semibold text-lg">Subject: {previewEmail.subject}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={
                    previewEmail.status === "Published" ? "default" : 
                    previewEmail.status === "Scheduled" ? "secondary" : "outline"
                  }>
                    {previewEmail.status}
                  </Badge>
                  {previewEmail.aiGenerated && (
                    <Badge variant="outline" className="text-purple-600 border-purple-300">
                      <Wand2 className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  )}
                  {previewEmail.targetAudience === "organic-traffic" && (
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      <Target className="h-3 w-3 mr-1" />
                      Organic Traffic
                    </Badge>
                  )}
                  {previewEmail.status === "Published" && (
                    <span className="text-sm text-gray-600">
                      Sent to {previewEmail.sent.toLocaleString()} organic traffic subscribers
                    </span>
                  )}
                </div>
              </div>
              
              {previewEmail.creative?.url && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Creative Content:</label>
                  <div className="relative">
                    {previewEmail.creative.type === "video" ? (
                      <div className="relative">
                        <video 
                          src={previewEmail.creative.url} 
                          className="w-full h-64 object-cover rounded-lg"
                          controls
                          poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
                        />
                        <Badge 
                          variant="secondary"
                          className="absolute top-2 right-2"
                        >
                          <Video className="h-3 w-3 mr-1" />
                          AI Generated Video
                        </Badge>
                      </div>
                    ) : (
                      <div className="relative">
                        <img 
                          src={previewEmail.creative.url} 
                          alt={previewEmail.creative.alt}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <Badge 
                          variant="default"
                          className="absolute top-2 right-2"
                        >
                          <ImageIcon className="h-3 w-3 mr-1" />
                          AI Generated Image
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2">Email Content:</h4>
                <p className="whitespace-pre-wrap">{previewEmail.content}</p>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
                  Close Preview
                </Button>
                {previewEmail.status !== "Published" && (
                  <Button 
                    onClick={() => {
                      setIsPreviewDialogOpen(false);
                      onEditEmail(previewEmail);
                    }}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit AI Content
                  </Button>
                )}
                {(previewEmail.status === "Draft" || previewEmail.status === "Scheduled") && (
                  <Button 
                    onClick={() => {
                      setIsPreviewDialogOpen(false);
                      onPublishEmail(previewEmail.id);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Publish Campaign
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>✏️ Edit Email Campaign - Organic Traffic Focus</DialogTitle>
            <DialogDescription>Modify your email campaign details for organic traffic audience</DialogDescription>
          </DialogHeader>
          {editingEmail && (
            <div className="space-y-4">
              <Input
                placeholder="Email Subject"
                value={editingEmail.subject}
                onChange={(e) => setEditingEmail({ ...editingEmail, subject: e.target.value })}
              />
              
              {editingEmail.creative?.url && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Creative:</label>
                  <div className="relative">
                    <img 
                      src={editingEmail.creative.url} 
                      alt={editingEmail.creative.alt}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Badge 
                      variant={editingEmail.creative.type === "video" ? "secondary" : "default"}
                      className="absolute top-2 right-2"
                    >
                      {editingEmail.creative.type === "video" ? <Video className="h-3 w-3 mr-1" /> : <ImageIcon className="h-3 w-3 mr-1" />}
                      {editingEmail.creative.type}
                    </Badge>
                  </div>
                </div>
              )}

              <Textarea
                placeholder="Email Content..."
                rows={8}
                value={editingEmail.content}
                onChange={(e) => setEditingEmail({ ...editingEmail, content: e.target.value })}
              />
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} className="bg-purple-600 hover:bg-purple-700">
                  <Edit className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={isAnalyticsDialogOpen} onOpenChange={setIsAnalyticsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>📊 Email Analytics - Organic Traffic Campaign</DialogTitle>
            <DialogDescription>Detailed performance metrics for your organic traffic email campaign</DialogDescription>
          </DialogHeader>
          {analyticsEmail && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg">{analyticsEmail.subject}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="default">Published</Badge>
                  {analyticsEmail.aiGenerated && (
                    <Badge variant="outline" className="text-purple-600 border-purple-300">
                      <Wand2 className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-green-600 border-green-300">
                    <Target className="h-3 w-3 mr-1" />
                    Organic Traffic
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analyticsEmail.sent.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Sent</div>
                  <div className="text-xs text-green-600">Organic traffic subscribers</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{analyticsEmail.opens}</div>
                  <div className="text-sm text-gray-600">Opens</div>
                  <div className="text-xs text-gray-500">{((analyticsEmail.opens / analyticsEmail.sent) * 100).toFixed(1)}% rate</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{analyticsEmail.clicks}</div>
                  <div className="text-sm text-gray-600">Clicks</div>
                  <div className="text-xs text-gray-500">{((analyticsEmail.clicks / analyticsEmail.opens) * 100).toFixed(1)}% rate</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{Math.floor(analyticsEmail.sent * 0.015)}</div>
                  <div className="text-sm text-gray-600">Unsubscribes</div>
                  <div className="text-xs text-gray-500">1.5% rate</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Performance Over Time</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={emailAnalytics.slice(-7)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="opened" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="clicked" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAnalyticsDialogOpen(false)}>
                  Close Analytics
                </Button>
                <Button 
                  onClick={() => setIsAnalyticsDialogOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Full Analytics
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
