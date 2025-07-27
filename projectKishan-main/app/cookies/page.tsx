"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, ArrowLeft, Cookie } from "lucide-react"
import Link from "next/link"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold text-green-800">Project Kisan</span>
            </Link>
            <Badge variant="outline" className="text-green-700 border-green-300">
              <Cookie className="w-3 h-3 mr-1" />
              Cookie Settings
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600 mb-4">
            How we use cookies and similar technologies to enhance your experience
          </p>
          <p className="text-sm text-gray-500">Last updated: December 15, 2024</p>
        </div>

        <div className="space-y-8">
          
          {/* Quick Overview */}
          <Card className="p-6 bg-green-50 border-green-200">
            <h2 className="text-xl font-bold text-green-800 mb-4">Cookie Summary</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Essential cookies only</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No tracking cookies</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Performance analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>User-controlled preferences</span>
              </div>
            </div>
          </Card>

          {/* What Are Cookies */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and improving our services.
              </p>
              <p>
                Project Kisan uses minimal cookies to ensure the platform works effectively for farmers and agricultural workers.
              </p>
            </div>
          </Card>

          {/* Types of Cookies */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
            <div className="space-y-6">
              
              {/* Essential Cookies */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Essential Cookies (Required)</h3>
                <p className="text-blue-700 text-sm mb-2">These cookies are necessary for the website to function properly.</p>
                <ul className="space-y-1 text-blue-600 text-sm ml-4">
                  <li>• User authentication and login sessions</li>
                  <li>• Form submission and data processing</li>
                  <li>• Security and fraud prevention</li>
                  <li>• Language and location preferences</li>
                </ul>
              </div>

              {/* Performance Cookies */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Performance Cookies (Optional)</h3>
                <p className="text-yellow-700 text-sm mb-2">Help us understand how visitors interact with our website.</p>
                <ul className="space-y-1 text-yellow-600 text-sm ml-4">
                  <li>• Page load times and performance metrics</li>
                  <li>• Feature usage and popular content</li>
                  <li>• Error tracking and bug reports</li>
                  <li>• General usage statistics (anonymized)</li>
                </ul>
              </div>

              {/* Functional Cookies */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Functional Cookies (Optional)</h3>
                <p className="text-green-700 text-sm mb-2">Remember your choices to provide enhanced features.</p>
                <ul className="space-y-1 text-green-600 text-sm ml-4">
                  <li>• Preferred crop types and farming methods</li>
                  <li>• Notification settings and alerts</li>
                  <li>• Dashboard layout preferences</li>
                  <li>• Voice assistant settings</li>
                </ul>
              </div>

            </div>
          </Card>

          {/* Third-Party Cookies */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Third-Party Services</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Project Kisan integrates with trusted third-party services that may place their own cookies:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Google Services</h3>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Firebase Authentication</li>
                    <li>• Google Cloud AI services</li>
                    <li>• Maps and location services</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics</h3>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Usage patterns (anonymized)</li>
                    <li>• Performance monitoring</li>
                    <li>• Error tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Managing Cookies */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Managing Your Cookie Preferences</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Browser Settings</h3>
                <p className="text-gray-600 text-sm mb-2">
                  You can control cookies through your browser settings:
                </p>
                <ul className="space-y-1 text-gray-600 text-sm ml-4">
                  <li>• Block all cookies (may affect functionality)</li>
                  <li>• Delete existing cookies</li>
                  <li>• Set cookie preferences</li>
                  <li>• Receive notifications before cookies are placed</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Project Kisan Settings</h3>
                <p className="text-green-700 text-sm mb-4">
                  Manage your cookie preferences directly in your account settings.
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Manage Cookie Preferences
                </Button>
              </div>
            </div>
          </Card>

          {/* Cookie Retention */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookie Retention</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Session Cookies</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Deleted when you close your browser</li>
                  <li>• Used for login sessions</li>
                  <li>• Form data and preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Persistent Cookies</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Stored for specific time periods</li>
                  <li>• Remember your preferences</li>
                  <li>• Maximum 1 year retention</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-6 bg-green-50 border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Questions About Cookies?</h2>
            <p className="text-green-700 mb-4">
              Need help with cookie settings or have privacy concerns? Contact our team.
            </p>
            <div className="flex gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                Contact Support
              </Button>
              <span className="text-green-700 text-sm self-center">cookies@projectkisan.com</span>
            </div>
          </Card>

        </div>
      </main>
    </div>
  )
}
