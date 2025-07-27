"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
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
              <Shield className="w-3 h-3 mr-1" />
              Legal Agreement
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
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 mb-4">
            Legal terms and conditions for using Project Kisan
          </p>
          <p className="text-sm text-gray-500">Last updated: December 15, 2024</p>
        </div>

        <div className="space-y-8">
          
          {/* Quick Overview */}
          <Card className="p-6 bg-green-50 border-green-200">
            <h2 className="text-xl font-bold text-green-800 mb-4">Key Points</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free platform for farmers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>AI-powered recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Responsible usage required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Community-driven support</span>
              </div>
            </div>
          </Card>

          {/* Acceptance of Terms */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                By accessing and using Project Kisan, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p>
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </Card>

          {/* Use License */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Permission is granted to:</h3>
                <ul className="space-y-1 text-gray-600 ml-4">
                  <li>• Use Project Kisan for personal or commercial farming</li>
                  <li>• Access AI-powered crop diagnosis and recommendations</li>
                  <li>• Share information within your family/farm network</li>
                  <li>• Receive weather and market updates</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">This license shall automatically terminate if you violate any restrictions.</h3>
              </div>
            </div>
          </Card>

          {/* Disclaimer */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer</h2>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
              <p className="text-yellow-700 text-sm">
                Project Kisan provides AI-powered recommendations for informational purposes only. Always consult with agricultural experts for critical farming decisions.
              </p>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>• AI recommendations are based on available data and may not be 100% accurate</p>
              <p>• Weather predictions are estimates and subject to change</p>
              <p>• Market prices are for reference only</p>
              <p>• Users are responsible for their farming decisions</p>
            </div>
          </Card>

          {/* User Responsibilities */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Responsibilities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Security</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Keep login credentials secure</li>
                  <li>• Report unauthorized access</li>
                  <li>• Provide accurate information</li>
                  <li>• Update profile when needed</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Appropriate Use</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Use service lawfully</li>
                  <li>• Respect other users</li>
                  <li>• No spam or abuse</li>
                  <li>• Follow community guidelines</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Limitation of Liability */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Project Kisan shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of our services.
              </p>
              <p>
                This includes but is not limited to crop losses, financial damages, or business interruptions based on AI recommendations.
              </p>
            </div>
          </Card>

          {/* Service Availability */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Service Availability</h2>
            <div className="space-y-2 text-gray-600">
              <p>• We strive for 99.9% uptime but cannot guarantee uninterrupted service</p>
              <p>• Maintenance windows may temporarily affect availability</p>
              <p>• Features may be updated or modified without prior notice</p>
              <p>• Service is provided "as is" without warranties</p>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-6 bg-green-50 border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Contact Us</h2>
            <p className="text-green-700 mb-4">
              Questions about these Terms of Service? We're here to help.
            </p>
            <div className="flex gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                Contact Legal Team
              </Button>
              <span className="text-green-700 text-sm self-center">legal@projectkisan.com</span>
            </div>
          </Card>

        </div>
      </main>
    </div>
  )
}
