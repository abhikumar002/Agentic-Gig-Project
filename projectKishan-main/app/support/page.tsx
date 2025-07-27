"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, Search, Phone, Mail, MessageCircle, ArrowLeft, Clock, CheckCircle, AlertCircle, Book, Video, Headphones } from "lucide-react"
import Link from "next/link"

export default function SupportCenterPage() {
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
              <HelpCircle className="w-3 h-3 mr-1" />
              Support Center
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
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-lg text-gray-600 mb-6">
            Get help with Project Kisan. We're here to support your farming journey 24/7
          </p>
          
          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search for help articles, guides, or FAQs..." 
              className="pl-10 rounded-full"
            />
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Quick Help Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get instant help from our farming experts
              </p>
              <Button className="bg-green-600 hover:bg-green-700 w-full">
                Start Chat
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Call us for urgent farming issues
              </p>
              <Button variant="outline" className="w-full text-blue-600 border-blue-300">
                Call Now
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Send detailed questions and get expert replies
              </p>
              <Button variant="outline" className="w-full text-purple-600 border-purple-300">
                Send Email
              </Button>
            </Card>
          </div>

          {/* Support Status */}
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="font-semibold text-green-800">All Systems Operational</h3>
                  <p className="text-green-700 text-sm">Average response time: 2 minutes</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle className="w-3 h-3 mr-1" />
                Online
              </Badge>
            </div>
          </Card>

          {/* Popular Help Topics */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Help Topics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🌱 Getting Started</h3>
                <div className="space-y-3">
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>How to create your farming profile</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>First steps with crop diagnosis</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>Setting up your family farm team</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Video className="w-4 h-4" />
                    <span>Quick start video guide (5 min)</span>
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🔧 Technical Issues</h3>
                <div className="space-y-3">
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>Image upload not working</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>FarmerGPT voice recognition issues</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>Mobile app troubleshooting</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>Account access problems</span>
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Features & Usage</h3>
                <div className="space-y-3">
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>Understanding diagnosis results</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>Market price alerts setup</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>Language settings and regional support</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Video className="w-4 h-4" />
                    <span>Advanced features tutorial</span>
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">💰 Billing & Account</h3>
                <div className="space-y-3">
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>Premium features and pricing</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>Managing family member access</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>Data export and backup</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
                    <Book className="w-4 h-4" />
                    <span>Account deletion and privacy</span>
                  </Link>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Our Support Team</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Get Personalized Help</h3>
                <p className="text-gray-600 mb-6">
                  Can't find what you're looking for? Send us a message and our farming experts will get back to you within 24 hours.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Typical response time: 2-4 hours</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Available in 16+ Indian languages</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Headphones className="w-4 h-4" />
                    <span>24/7 emergency support for critical issues</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="diagnosis">Crop Diagnosis Help</SelectItem>
                      <SelectItem value="account">Account & Billing</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <Input placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                  <Input placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Describe Your Issue</label>
                  <Textarea 
                    placeholder="Please provide as much detail as possible about your issue or question..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Send Message
                </Button>
              </div>
            </div>
          </Card>

          {/* Emergency Support */}
          <Card className="p-6 bg-red-50 border-red-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Agricultural Support</h3>
                <p className="text-red-700 mb-4">
                  For urgent crop diseases, pest attacks, or other time-sensitive farming emergencies, contact our emergency hotline immediately.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Hotline
                  </Button>
                  <div className="text-red-700">
                    <div className="font-semibold">📞 1800-KISAN-HELP</div>
                    <div className="text-sm">Available 24/7</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Resources */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Additional Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-blue-800 mb-3">📚 Knowledge Base</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Comprehensive guides and tutorials for all Project Kisan features.
                </p>
                <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
                  Browse Articles
                </Button>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-3">👥 Community Forum</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Connect with other farmers and share experiences and solutions.
                </p>
                <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
                  Join Community
                </Button>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-3">🎥 Video Tutorials</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Step-by-step video guides for visual learners.
                </p>
                <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
                  Watch Videos
                </Button>
              </div>
            </div>
          </Card>

        </div>
      </main>
    </div>
  )
}
