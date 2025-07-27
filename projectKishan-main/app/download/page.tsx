"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, QrCode, Smartphone, Shield, Star, CheckCircle, Play, Users, Zap, Globe } from "lucide-react"
import Link from "next/link"

export default function DownloadPage() {
  const [activeTab, setActiveTab] = useState("download")

  const features = [
    "AI-powered crop disease diagnosis",
    "Real-time market price alerts",
    "Government scheme assistance",
    "Voice interaction in local languages",
    "Offline functionality",
    "Family farm management",
    "Pesticide ordering system",
    "Waste selling marketplace",
  ]

  const screenshots = [
    { title: "Home Dashboard", description: "Clean interface with quick access to all features" },
    { title: "Disease Diagnosis", description: "Snap a photo and get instant AI analysis" },
    { title: "Market Prices", description: "Real-time mandi prices with trend analysis" },
    { title: "Voice Assistant", description: "Talk in Kannada and get voice responses" },
    { title: "Scheme Finder", description: "Auto-filled government subsidy forms" },
    { title: "Family Sharing", description: "Collaborate with family members on farm decisions" },
  ]

  const instructions = [
    {
      step: 1,
      title: "Download APK",
      description: "Scan QR code or click download button to get the APK file",
      icon: Download,
    },
    {
      step: 2,
      title: "Enable Unknown Sources",
      description: "Go to Settings > Security > Enable 'Unknown Sources' for installation",
      icon: Shield,
    },
    {
      step: 3,
      title: "Install App",
      description: "Tap the downloaded APK file and follow installation prompts",
      icon: Smartphone,
    },
    {
      step: 4,
      title: "Start Farming Smart",
      description: "Open Project Kisan and begin your AI-powered farming journey",
      icon: Star,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold text-green-800">Project Kisan</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-green-700 hover:text-green-900">
              Home
            </Link>
            <Link href="/features" className="text-green-700 hover:text-green-900">
              Features
            </Link>
            <Link href="/demo" className="text-green-700 hover:text-green-900">
              Try Demo
            </Link>
            <Link href="/download" className="text-green-700 hover:text-green-900 font-semibold">
              Download
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Download Project Kisan</h1>
          <p className="text-lg text-gray-600 mb-8">
            Get the complete AI-powered farming assistant on your mobile device. Available as APK for Android devices.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Version 1.0.0
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Android 6.0+
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              15MB
            </Badge>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-4 mb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center space-x-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("download")}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === "download" ? "bg-green-600 text-white shadow-sm" : "text-green-600 hover:bg-green-50"
              }`}
            >
              Download APK
            </button>
            <button
              onClick={() => setActiveTab("instructions")}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === "instructions" ? "bg-green-600 text-white shadow-sm" : "text-green-600 hover:bg-green-50"
              }`}
            >
              Installation Guide
            </button>
            <button
              onClick={() => setActiveTab("screenshots")}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === "screenshots" ? "bg-green-600 text-white shadow-sm" : "text-green-600 hover:bg-green-50"
              }`}
            >
              Screenshots
            </button>
          </div>
        </div>
      </section>

      {/* Download Tab */}
      {activeTab === "download" && (
        <section className="pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* QR Code and Download */}
              <div className="text-center">
                <Card className="p-8 border-green-200 inline-block">
                  <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                    <div className="text-center">
                      <QrCode className="w-32 h-32 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">QR Code for APK Download</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">Scan with your phone camera to download directly</p>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 w-full">
                    <Download className="w-5 h-5 mr-2" />
                    Download APK (15MB)
                  </Button>
                </Card>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 mb-4">Distributed via Firebase App Distribution</p>
                  <div className="flex justify-center space-x-4">
                    <Badge variant="outline" className="border-green-300 text-green-700">
                      <Shield className="w-3 h-3 mr-1" />
                      Secure Download
                    </Badge>
                    <Badge variant="outline" className="border-blue-300 text-blue-700">
                      <Zap className="w-3 h-3 mr-1" />
                      Auto Updates
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-6">What's Included</h2>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-2">Demo Version Features</h3>
                  <p className="text-yellow-700 text-sm">
                    This demo APK includes all core features with sample data. Perfect for judges and evaluators to
                    experience the full functionality.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">15+</div>
                    <div className="text-sm text-gray-600">Languages</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-gray-600">AI Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">24/7</div>
                    <div className="text-sm text-gray-600">Offline Mode</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Instructions Tab */}
      {activeTab === "instructions" && (
        <section className="pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Installation Instructions</h2>

            <div className="space-y-8">
              {instructions.map((instruction, index) => (
                <Card key={index} className="p-6 border-green-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <instruction.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Step {instruction.step}
                        </Badge>
                        <h3 className="text-xl font-bold text-green-800">{instruction.title}</h3>
                      </div>
                      <p className="text-gray-600">{instruction.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Note
              </h3>
              <p className="text-blue-700 text-sm">
                Project Kisan APK is distributed through Firebase App Distribution for security. The app requests only
                necessary permissions for camera, microphone, and location services to provide farming assistance
                features.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Screenshots Tab */}
      {activeTab === "screenshots" && (
        <section className="pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">App Screenshots</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {screenshots.map((screenshot, index) => (
                <Card key={index} className="overflow-hidden border-green-200 hover:shadow-lg transition-shadow">
                  <div className="aspect-[9/16] bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Smartphone className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <p className="text-green-700 font-medium">{screenshot.title}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-green-800 mb-2">{screenshot.title}</h3>
                    <p className="text-gray-600 text-sm">{screenshot.description}</p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Card className="p-8 border-green-200 inline-block">
                <h3 className="text-xl font-bold text-green-800 mb-4">Assistant in Action</h3>
                <div className="w-80 h-96 bg-gray-100 rounded-lg flex flex-col justify-end p-4 mb-4">
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-gray-800">ನನ್ನ ಟೊಮೇಟೊ ಗಿಡದಲ್ಲಿ ಹಳದಿ ಎಲೆಗಳು ಕಾಣುತ್ತಿವೆ</p>
                      <p className="text-xs text-gray-500 mt-1">My tomato plant has yellow leaves</p>
                    </div>
                    <div className="bg-green-500 text-white rounded-lg p-3 max-w-xs ml-auto">
                      <p className="text-sm">ಇದು ಪೋಷಕಾಂಶದ ಕೊರತೆಯಾಗಿರಬಹುದು. ಫೋಟೋ ಕಳುಹಿಸಿ</p>
                      <p className="text-xs opacity-80 mt-1">This might be nutrient deficiency. Send a photo</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 max-w-xs">
                      <div className="w-full h-20 bg-green-200 rounded mb-2 flex items-center justify-center">
                        <span className="text-xs text-green-700">📸 Plant Photo</span>
                      </div>
                    </div>
                    <div className="bg-green-500 text-white rounded-lg p-3 max-w-xs ml-auto">
                      <p className="text-sm">ಇದು ನೈಟ್ರೋಜನ್ ಕೊರತೆ. ಯೂರಿಯಾ ಸಿಂಪಡಿಸಿ</p>
                      <p className="text-xs opacity-80 mt-1">This is nitrogen deficiency. Apply urea spray</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Interactive chat with voice and image support in Kannada</p>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Judge Information */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">For Judges & Evaluators</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center border-green-200">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-3">Demo Account</h3>
              <p className="text-gray-600 mb-4">Pre-configured with sample farm data and family members</p>
              <Badge variant="outline" className="border-blue-300 text-blue-700">
                Ready to Use
              </Badge>
            </Card>

            <Card className="p-6 text-center border-green-200">
              <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-3">Offline Mode</h3>
              <p className="text-gray-600 mb-4">Full functionality works without internet connection</p>
              <Badge variant="outline" className="border-purple-300 text-purple-700">
                No Network Required
              </Badge>
            </Card>

            <Card className="p-6 text-center border-green-200">
              <Play className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-3">Guided Tour</h3>
              <p className="text-gray-600 mb-4">Built-in tutorial showcases all key features</p>
              <Badge variant="outline" className="border-green-300 text-green-700">
                Interactive Guide
              </Badge>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4">Evaluation Checklist</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Core Features to Test:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Photo-based disease diagnosis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Voice interaction in Kannada</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Market price checking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Government scheme finder</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Technical Aspects:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Offline AI model performance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Multi-language support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Family collaboration features</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Integration with external APIs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Smart Farming Journey</h2>
          <p className="text-lg mb-8 opacity-90">
            Download Project Kisan today and experience the future of agriculture
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Download className="w-5 h-5 mr-2" />
              Download APK Now
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-800 bg-transparent"
            >
              <Link href="/demo">Try Web Demo First</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
