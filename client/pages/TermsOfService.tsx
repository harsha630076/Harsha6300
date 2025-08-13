import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, AlertTriangle, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Link to="/signup" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Terms of Service</h1>
          <Button variant="ghost" size="sm" className="p-2">
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms of Service</h2>
          <p className="text-gray-600">
            Welcome to QuickCal AI! These terms govern your use of our nutrition tracking and AI-powered health platform.
          </p>
          <p className="text-sm text-gray-500 mt-2">Effective Date: January 15, 2024</p>
        </div>

        {/* Important Notice */}
        <div className="bg-orange-50 rounded-2xl p-6 mb-8 border border-orange-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Important Health Disclaimer
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>QuickCal AI is not a medical service.</strong> Our app provides nutritional information and tracking tools for educational purposes only.
            </p>
            <p>
              Always consult with healthcare professionals before making significant dietary changes, especially if you have medical conditions, allergies, or specific health concerns.
            </p>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h3>
            <div className="prose prose-sm text-gray-600">
              <p>
                By downloading, accessing, or using QuickCal AI, you agree to be bound by these Terms of Service and our Privacy Policy. If you don't agree with any part of these terms, please don't use our service.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Service Description</h3>
            <div className="prose prose-sm text-gray-600">
              <p className="mb-4">QuickCal AI provides:</p>
              <ul className="space-y-2 ml-4">
                <li>• AI-powered food recognition and calorie tracking</li>
                <li>• Personalized nutrition recommendations and meal planning</li>
                <li>• Mood-based food suggestions and health insights</li>
                <li>• Progress tracking and analytics</li>
                <li>• Educational content about nutrition and health</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3. User Responsibilities</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-2">Account Security</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Keep your login credentials secure and confidential</li>
                  <li>• Notify us immediately of any unauthorized account access</li>
                  <li>• You're responsible for all activities under your account</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-2">Accurate Information</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Provide accurate personal and health information</li>
                  <li>• Update your profile when your circumstances change</li>
                  <li>• Use the AI scanning feature responsibly and accurately</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-2">Prohibited Activities</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Don't attempt to reverse engineer our AI algorithms</li>
                  <li>• Don't use the service for any illegal or harmful purposes</li>
                  <li>• Don't share inappropriate content or violate others' privacy</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">4. AI Accuracy & Limitations</h3>
            <div className="prose prose-sm text-gray-600">
              <p className="mb-4">
                While our AI food recognition achieves high accuracy rates (typically 95%+), it's not perfect. You should:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Review and verify all AI-generated nutrition information</li>
                <li>• Make manual corrections when needed</li>
                <li>• Use your judgment about food recommendations</li>
                <li>• Understand that results may vary based on food preparation and brands</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">5. Subscription & Billing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Free Plan</h4>
                <p className="text-sm text-gray-600">Basic features with limited AI scans and standard support.</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Premium Plan</h4>
                <p className="text-sm text-gray-600">Full features, unlimited scans, priority support, and advanced analytics.</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>• Subscriptions auto-renew unless cancelled</p>
              <p>• You can cancel anytime from your account settings</p>
              <p>• Refunds are processed according to app store policies</p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">6. Intellectual Property</h3>
            <div className="prose prose-sm text-gray-600">
              <p className="mb-4">
                QuickCal AI, including our AI algorithms, app design, and content, is protected by intellectual property laws. You may not:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Copy, modify, or distribute our software</li>
                <li>• Use our trademarks or branding without permission</li>
                <li>• Attempt to extract or recreate our AI training data</li>
              </ul>
              <p className="mt-4">
                You retain ownership of your personal data and content you create in the app.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">7. Limitation of Liability</h3>
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <p className="text-sm text-gray-700">
                QuickCal AI provides information and tools for educational purposes. We're not liable for any health outcomes, dietary decisions, or medical consequences resulting from use of our service. Always consult healthcare professionals for medical advice.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">8. Changes to Terms</h3>
            <div className="prose prose-sm text-gray-600">
              <p>
                We may update these terms periodically. We'll notify you of significant changes through the app or email. Continued use after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">9. Contact & Support</h3>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="text-sm text-gray-600 mb-3">
                Questions about these terms or need support? We're here to help.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  📧 legal@quickcalai.com
                </Button>
                <Button variant="outline" size="sm">
                  💬 In-app Support
                </Button>
                <Button variant="outline" size="sm">
                  📞 1-800-QUICKCAL
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex gap-4">
            <Link to="/privacy" className="flex-1">
              <Button variant="outline" className="w-full">
                Privacy Policy
              </Button>
            </Link>
            <Link to="/signup" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                I Agree to Terms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
