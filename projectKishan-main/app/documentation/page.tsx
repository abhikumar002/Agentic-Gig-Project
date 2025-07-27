"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, FileText, ArrowLeft, Camera, MessageCircle, TrendingUp, Users, Download, Play } from "lucide-react"
import Link from "next/link"

export default function DocumentationPage() {
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
              <BookOpen className="w-3 h-3 mr-1" />
              Documentation Hub
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-lg text-gray-600 mb-6">
            Complete guides and tutorials for using Project Kisan's AI-powered farming tools
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search documentation..." 
              className="pl-10 rounded-full"
            />
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Quick Start */}
          <Card className="p-6 bg-green-50 border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">🚀 Quick Start Guide</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-green-100">
                <div className="text-lg font-semibold text-green-800 mb-2">1. Sign Up</div>
                <p className="text-green-700 text-sm mb-3">Create your account and select your farming profile</p>
                <Button size="sm" variant="outline" className="text-green-700 border-green-300">
                  View Guide
                </Button>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-100">
                <div className="text-lg font-semibold text-green-800 mb-2">2. Upload Photos</div>
                <p className="text-green-700 text-sm mb-3">Take clear photos of your crops for AI analysis</p>
                <Button size="sm" variant="outline" className="text-green-700 border-green-300">
                  Photo Tips
                </Button>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-100">
                <div className="text-lg font-semibold text-green-800 mb-2">3. Get Results</div>
                <p className="text-green-700 text-sm mb-3">Receive instant AI-powered recommendations</p>
                <Button size="sm" variant="outline" className="text-green-700 border-green-300">
                  Learn More
                </Button>
              </div>
            </div>
          </Card>

          {/* Main Features */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Crop Diagnosis */}
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Camera className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Crop Diagnosis</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Learn how to use our AI-powered crop diagnosis tool to identify diseases and get treatment recommendations.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Taking the perfect crop photo</Link>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Understanding diagnosis results</Link>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Treatment implementation guide</Link>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Play className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Video tutorial (5 min)</Link>
                </div>
              </div>
            </Card>

            {/* FarmerGPT */}
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">FarmerGPT Assistant</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Discover how to chat with our AI assistant in multiple languages for personalized farming advice.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Voice commands and language support</Link>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Best practices for asking questions</Link>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Regional farming knowledge base</Link>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Play className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Demo conversation (3 min)</Link>
                </div>
              </div>
            </Card>

            {/* Market Intelligence */}
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Market Intelligence</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Access real-time market prices and make informed decisions about when and where to sell your crops.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Understanding price trends</Link>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Setting up price alerts</Link>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Market analysis tools</Link>
                </div>
              </div>
            </Card>

            {/* Family Farming */}
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Family Farm Management</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Learn how to collaborate with family members and manage your farm as a team using Project Kisan.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Adding family members</Link>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Task management and assignments</Link>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <Link href="#" className="text-blue-600 hover:text-blue-700">Sharing crop data and insights</Link>
                </div>
              </div>
            </Card>

          </div>

          {/* API Documentation */}
          <Card className="p-6 bg-gray-50 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔧 Developer Resources</h2>
            <p className="text-gray-600 mb-6">
              Integrate Project Kisan's AI capabilities into your own applications and systems.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">API Documentation</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Download className="w-4 h-4 text-gray-400" />
                    <Link href="#" className="text-blue-600 hover:text-blue-700">REST API Reference</Link>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Download className="w-4 h-4 text-gray-400" />
                    <Link href="#" className="text-blue-600 hover:text-blue-700">SDK for Node.js</Link>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Download className="w-4 h-4 text-gray-400" />
                    <Link href="#" className="text-blue-600 hover:text-blue-700">Python Integration Guide</Link>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Code Examples</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <Link href="#" className="text-blue-600 hover:text-blue-700">Image Upload & Analysis</Link>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <Link href="#" className="text-blue-600 hover:text-blue-700">Market Data Integration</Link>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <Link href="#" className="text-blue-600 hover:text-blue-700">Authentication Examples</Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* FAQ Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-800 mb-2">How accurate is the crop diagnosis?</h3>
                <p className="text-gray-600 text-sm">Our AI model has a 95% accuracy rate, trained on thousands of crop images from Indian farms.</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Which languages does FarmerGPT support?</h3>
                <p className="text-gray-600 text-sm">FarmerGPT supports 16+ Indian languages including Hindi, Kannada, Tamil, Telugu, and English.</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Is Project Kisan free to use?</h3>
                <p className="text-gray-600 text-sm">Yes, all basic features are free for farmers. Premium features for large-scale operations are available.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How do I get technical support?</h3>
                <p className="text-gray-600 text-sm">Contact our support team via the Support Center or email support@projectkisan.com.</p>
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-6 bg-green-50 border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Need More Help?</h2>
            <p className="text-green-700 mb-4">
              Can't find what you're looking for? Our team is here to help you succeed.
            </p>
            <div className="flex gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                Contact Support Team
              </Button>
              <Button variant="outline" className="text-green-700 border-green-300">
                Join Community Forum
              </Button>
            </div>
          </Card>

        </div>
      </main>
    </div>
  )
}
