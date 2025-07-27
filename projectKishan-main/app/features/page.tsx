"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Wifi,
  TrendingUp,
  MapPin,
  Users,
  Recycle,
  Shield,
  Download,
  Smartphone,
  Database,
  Cloud,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "Vertex AI Gemini Disease Detection",
      description:
        "Advanced AI-powered crop disease identification with 95% accuracy using Google's latest Gemini model.",
      tech: ["Vertex AI", "Gemini", "Computer Vision"],
      color: "bg-blue-500",
    },
    {
      icon: Wifi,
      title: "Firebase ML Offline Fallback",
      description: "Works even without internet connection using on-device machine learning models.",
      tech: ["Firebase ML", "TensorFlow Lite", "Offline AI"],
      color: "bg-green-500",
    },
    {
      icon: TrendingUp,
      title: "Local Mandi Price Integration",
      description: "Real-time market prices from state government APIs with price trend analysis.",
      tech: ["State APIs", "Price Analytics", "Real-time Data"],
      color: "bg-yellow-500",
    },
    {
      icon: MapPin,
      title: "Google Maps Integration",
      description: "Find nearby pesticide shops, Krishi Kendras, and agricultural service centers.",
      tech: ["Google Maps API", "Location Services", "Navigation"],
      color: "bg-red-500",
    },
    {
      icon: Users,
      title: "Family Co-Management",
      description: "Share farm data and collaborate with family members on farming decisions.",
      tech: ["Multi-user", "Data Sharing", "Collaboration"],
      color: "bg-purple-500",
    },
    {
      icon: Recycle,
      title: "Waste Selling Workflow",
      description: "Connect with buyers for agricultural waste and convert waste to wealth.",
      tech: ["Marketplace", "Waste Management", "Revenue Generation"],
      color: "bg-orange-500",
    },
    {
      icon: Shield,
      title: "Verified Pesticide Orders",
      description: "Secure pesticide ordering system with Firebase Cloud Functions verification.",
      tech: ["Firebase Functions", "Verification", "E-commerce"],
      color: "bg-indigo-500",
    },
    {
      icon: Download,
      title: "Firebase App Distribution",
      description: "Easy APK distribution and updates through Firebase App Distribution.",
      tech: ["Firebase Distribution", "APK Management", "Auto Updates"],
      color: "bg-pink-500",
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
            <Link href="/features" className="text-green-700 hover:text-green-900 font-semibold">
              Features
            </Link>
            <Link href="/demo" className="text-green-700 hover:text-green-900">
              Try Demo
            </Link>
            <Link href="/download" className="text-green-700 hover:text-green-900">
              Download
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Powerful Features for Modern Farming</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover how Project Kisan combines cutting-edge AI technology with practical farming solutions
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Google Vertex AI
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Firebase
            </Badge>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              State Government APIs
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Voice AI
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Rural Empowerment
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-green-200 group">
                <div
                  className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs border-green-300 text-green-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-16">Technical Architecture</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-green-800 mb-2">Mobile App</h3>
              <p className="text-sm text-gray-600">React Native with offline capabilities</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-green-800 mb-2">AI Processing</h3>
              <p className="text-sm text-gray-600">Vertex AI Gemini for disease detection</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="font-bold text-green-800 mb-2">Data Storage</h3>
              <p className="text-sm text-gray-600">Firebase Firestore for real-time sync</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-green-800 mb-2">Cloud Functions</h3>
              <p className="text-sm text-gray-600">Serverless backend processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Performance & Impact</h2>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-200">Disease Detection Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{"<"}2s</div>
              <div className="text-green-200">Average Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-green-200">Offline Availability</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-green-200">Local Languages Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-50">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Experience These Features Today</h2>
          <p className="text-lg text-gray-600 mb-8">
            Try our interactive demo or download the APK to see Project Kisan in action
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/demo">
                <Zap className="w-5 h-5 mr-2" />
                Try Interactive Demo
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
            >
              <Link href="/download">
                <Download className="w-5 h-5 mr-2" />
                Download APK
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
