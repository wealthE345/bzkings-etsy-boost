
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, User, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Reviews = () => {
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: 5,
    title: "",
    comment: ""
  });

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      title: "Amazing AI Tools!",
      comment: "The AI applications from BZ Kings Digital Mall have transformed my business. The content writer alone has saved me hours of work every week.",
      date: "2024-01-15",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      title: "Great Value for Money",
      comment: "Downloaded several free apps and they work perfectly. The premium apps are worth every penny. Highly recommend!",
      date: "2024-01-10",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      title: "Excellent Customer Support",
      comment: "Had an issue with one download and the support team resolved it within hours. Professional and helpful service.",
      date: "2024-01-08",
      verified: true,
      helpful: 15
    },
    {
      id: 4,
      name: "David Kim",
      rating: 4,
      title: "User-Friendly Interface",
      comment: "The website is easy to navigate and the download process is smooth. Love the variety of AI tools available.",
      date: "2024-01-05",
      verified: false,
      helpful: 6
    }
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your review! It will be published after moderation.");
    setNewReview({
      name: "",
      email: "",
      rating: 5,
      title: "",
      comment: ""
    });
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

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
              Customer Reviews
            </h1>
            <p className="text-gray-600 mt-2">See what our customers are saying about our AI applications</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">All Reviews ({reviews.length})</h2>
              <div className="flex items-center gap-2">
                {renderStars(4.7)}
                <span className="text-lg font-semibold">4.7 out of 5</span>
              </div>
            </div>

            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{review.name}</h4>
                          {review.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-300">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h5 className="font-semibold text-lg mb-2">{review.title}</h5>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
                <CardDescription>
                  Share your experience with our AI applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reviewName">Name</Label>
                    <Input
                      id="reviewName"
                      value={newReview.name}
                      onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reviewEmail">Email</Label>
                    <Input
                      id="reviewEmail"
                      type="email"
                      value={newReview.email}
                      onChange={(e) => setNewReview(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Rating</Label>
                    {renderStars(newReview.rating, true, (rating) => 
                      setNewReview(prev => ({ ...prev, rating }))
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reviewTitle">Review Title</Label>
                    <Input
                      id="reviewTitle"
                      value={newReview.title}
                      onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Summary of your experience"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reviewComment">Your Review</Label>
                    <Textarea
                      id="reviewComment"
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Tell us about your experience..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gradient-primary text-white">
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
