
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, AlertTriangle, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Disclaimer = () => {
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
              Terms & Disclaimer
            </h1>
            <p className="text-gray-600 mt-2">Important information about using our services</p>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                By using BZ Kings Digital Mall and downloading our AI applications, you agree to the following terms:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>All digital products are for personal and commercial use unless otherwise specified</li>
                <li>You may not resell, redistribute, or claim ownership of our digital products</li>
                <li>Downloads are provided "as-is" without warranty of any kind</li>
                <li>We reserve the right to update these terms at any time</li>
                <li>Refunds are available within 30 days of purchase for paid applications</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                <strong>Important Notice:</strong> The following disclaimers apply to all services and products offered by BZ Kings Digital Mall:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>No Guarantees:</strong> We do not guarantee specific results from using our AI applications or traffic generation tools</li>
                <li><strong>Educational Purpose:</strong> Our tools and guides are for educational and informational purposes</li>
                <li><strong>Third-Party Services:</strong> We are not responsible for third-party services integrated with our platform</li>
                <li><strong>Data Security:</strong> While we implement security measures, we cannot guarantee 100% data security</li>
                <li><strong>Performance:</strong> Application performance may vary based on device specifications and internet connection</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Your privacy is important to us. Here's how we handle your information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>We collect minimal personal information necessary for service provision</li>
                <li>Your email address is used only for account management and important updates</li>
                <li>We do not sell or share your personal information with third parties</li>
                <li>Cookies are used to improve user experience and site functionality</li>
                <li>You can request data deletion by contacting our support team</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have any questions about these terms or need support, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> support@bzkingsdigitalmall.com</p>
                <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST</p>
                <p><strong>Response Time:</strong> We aim to respond within 24 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
