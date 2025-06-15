
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Target, Zap, Award, Heart, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
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
              About BZ Kings Digital Mall
            </h1>
            <p className="text-gray-600 mt-2">Empowering Etsy sellers with AI-powered growth solutions</p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop"
            alt="Our Team"
            className="w-full h-64 object-cover rounded-2xl mb-8"
          />
          <h2 className="text-3xl font-bold mb-4">Your Success is Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to helping Etsy sellers like you transform your digital presence into a thriving business 
            through innovative AI-powered tools and comprehensive growth strategies.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              Our Story
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2024, BZ Kings Digital Mall emerged from a simple observation: talented Etsy sellers 
                were struggling to get the visibility they deserved. Our founder, having experienced these challenges 
                firsthand, decided to create a comprehensive platform that would level the playing field.
              </p>
              <p>
                What started as a small project to help fellow creators has grown into a full-featured ecosystem 
                of AI-powered tools, designed specifically for the unique needs of Etsy sellers and digital entrepreneurs.
              </p>
              <p>
                Today, we serve thousands of sellers worldwide, helping them drive qualified traffic, optimize their 
                listings, and convert visitors into loyal customers.
              </p>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
              alt="Our Journey"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-2 border-purple-100">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Customer First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every decision we make is guided by what's best for our users. Your success drives our innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-blue-100">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Results Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We focus on delivering measurable results that directly impact your business growth and revenue.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-green-100">
              <CardHeader>
                <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We continuously evolve our platform with cutting-edge AI technology to stay ahead of market trends.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-amber-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-amber-600" />
                  Traffic Generation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• SEO optimization tools</li>
                  <li>• Social media integration</li>
                  <li>• Keyword research & analysis</li>
                  <li>• Content optimization</li>
                  <li>• Backlink building strategies</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Conversion Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• A/B testing platforms</li>
                  <li>• Lead capture systems</li>
                  <li>• Email marketing automation</li>
                  <li>• Customer journey optimization</li>
                  <li>• Performance analytics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Stats */}
        <div className="bg-gradient-to-r from-purple-600 to-amber-500 rounded-2xl p-8 text-white mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-purple-100">Happy Sellers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">$2M+</div>
              <div className="text-purple-100">Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold">25+</div>
              <div className="text-purple-100">AI Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99%</div>
              <div className="text-purple-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Ready to Transform Your Etsy Business?</CardTitle>
              <CardDescription>
                Join thousands of successful sellers who trust BZ Kings Digital Mall to grow their business.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/app-hub">
                  <Button className="gradient-primary text-white">
                    Explore Our Apps
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  onClick={() => window.open("https://bzkingsdigitalmall.etsy.com", "_blank")}
                >
                  Visit Our Etsy Store
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
