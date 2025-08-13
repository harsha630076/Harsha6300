import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Eye, Lock, Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Link to="/signup" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Privacy Policy</h1>
          <Button variant="ghost" size="sm" className="p-2">
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Privacy Matters
          </h2>
          <p className="text-gray-600">
            We're committed to protecting your personal health data and being
            transparent about how we use it.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            Privacy at a Glance
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                We never sell your personal health data to third parties
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Your nutrition data is encrypted and securely stored</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>You can export or delete all your data at any time</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>AI processing happens securely and anonymously</span>
            </li>
          </ul>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Information We Collect
            </h3>
            <div className="prose prose-sm text-gray-600">
              <p className="mb-4">
                <strong>Personal Information:</strong> Name, email, phone
                number, age, height, weight, and health goals you provide during
                registration.
              </p>
              <p className="mb-4">
                <strong>Nutrition Data:</strong> Food logs, calorie intake,
                macro nutrients, meal photos you scan with our AI, and dietary
                preferences.
              </p>
              <p className="mb-4">
                <strong>Usage Information:</strong> How you interact with our
                app, features you use most, and performance analytics to improve
                our service.
              </p>
              <p>
                <strong>Device Information:</strong> Device type, operating
                system, and technical information needed for optimal app
                performance.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              How We Use Your Information
            </h3>
            <div className="prose prose-sm text-gray-600">
              <ul className="space-y-2 ml-4">
                <li>
                  • Provide personalized nutrition recommendations and meal
                  planning
                </li>
                <li>
                  • Improve our AI food recognition accuracy and recommendations
                </li>
                <li>• Send you relevant health tips and progress updates</li>
                <li>
                  • Analyze usage patterns to enhance app features and user
                  experience
                </li>
                <li>
                  • Provide customer support and respond to your inquiries
                </li>
                <li>• Ensure app security and prevent fraudulent activities</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Data Security & Protection
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">
                  Enterprise-Grade Security
                </span>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  • All data encrypted in transit and at rest using AES-256
                  encryption
                </li>
                <li>• Regular security audits and penetration testing</li>
                <li>• SOC 2 Type II compliance for data handling procedures</li>
                <li>• Access controls and monitoring for all data access</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Privacy Rights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">
                  Access & Export
                </h4>
                <p className="text-sm text-gray-600">
                  Download all your data in a portable format anytime from your
                  profile settings.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Delete Data</h4>
                <p className="text-sm text-gray-600">
                  Request complete deletion of your account and all associated
                  data.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">
                  Correct Information
                </h4>
                <p className="text-sm text-gray-600">
                  Update or correct any personal information stored in your
                  account.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Opt-out</h4>
                <p className="text-sm text-gray-600">
                  Control marketing communications and data processing
                  preferences.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Third-Party Services
            </h3>
            <div className="prose prose-sm text-gray-600">
              <p className="mb-4">
                We work with trusted partners to provide our services, including
                cloud hosting, analytics, and payment processing. These partners
                are bound by strict data protection agreements and can only use
                your data for specified purposes.
              </p>
              <p>
                <strong>
                  We never sell your personal health data to advertisers or data
                  brokers.
                </strong>
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Us
            </h3>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="text-sm text-gray-600 mb-3">
                Have questions about your privacy or this policy? We're here to
                help.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  📧 privacy@quickcalai.com
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
            <Link to="/terms" className="flex-1">
              <Button variant="outline" className="w-full">
                Terms of Service
              </Button>
            </Link>
            <Link to="/signup" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                I Understand
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
