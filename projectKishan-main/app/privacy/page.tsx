"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
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
              Privacy Protected
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 mb-4">
            Your privacy and data security are our top priorities
          </p>
          <p className="text-sm text-gray-500">Last updated: December 15, 2024</p>
        </div>

        <div className="space-y-8">
          
          {/* Quick Overview */}
          <Card className="p-6 bg-green-50 border-green-200">
            <h2 className="text-xl font-bold text-green-800 mb-4">Quick Summary</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>We collect minimal necessary data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Your data is encrypted and secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No selling of personal information</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>You control your data</span>
              </div>
            </div>
          </Card>

          {/* Information We Collect */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                <ul className="space-y-1 text-gray-600 ml-4">
                  <li>• Name, email address, phone number</li>
                  <li>• State location and farm details (for Farmers)</li>
                  <li>• Role and preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage Data</h3>
                <ul className="space-y-1 text-gray-600 ml-4">
                  <li>• Plant photos for disease diagnosis</li>
                  <li>• Voice recordings (processed, not stored)</li>
                  <li>• App usage patterns</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* How We Use Your Information */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Core Services</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• AI-powered crop diagnosis</li>
                  <li>• Farming recommendations</li>
                  <li>• Market price alerts</li>
                  <li>• Weather-based advice</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Improvements</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Enhance AI accuracy</li>
                  <li>• Improve user experience</li>
                  <li>• Develop new features</li>
                  <li>• Provide support</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Data Sharing */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Sharing</h2>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-red-800 mb-2">We Never Sell Your Data</h3>
              <p className="text-red-700 text-sm">
                Project Kisan will never sell, rent, or trade your personal information.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Limited Sharing</h3>
              <ul className="space-y-1 text-gray-600 ml-4">
                <li>• Service providers (Google Cloud, Firebase) under strict agreements</li>
                <li>• Family members you explicitly add</li>
                <li>• Legal requirements only when required by law</li>
              </ul>
            </div>
          </Card>

          {/* Your Rights */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Your Rights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Control</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Access your data</li>
                  <li>• Update information</li>
                  <li>• Delete your account</li>
                  <li>• Export your data</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Privacy Controls</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Manage sharing settings</li>
                  <li>• Control location usage</li>
                  <li>• Set preferences</li>
                  <li>• Manage notifications</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-6 bg-green-50 border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Contact Us</h2>
            <p className="text-green-700 mb-4">
              Questions about this Privacy Policy? We're here to help.
            </p>
            <div className="flex gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                Contact Privacy Team
              </Button>
              <span className="text-green-700 text-sm self-center">privacy@projectkisan.com</span>
            </div>
          </Card>

        </div>
      </main>
    </div>
  )
}
