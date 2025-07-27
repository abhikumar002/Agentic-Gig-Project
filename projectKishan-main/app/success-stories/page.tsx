"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { ArrowLeft, Star, TrendingUp, Users, MapPin, Calendar, Award, Quote } from "lucide-react"
import Link from "next/link"

export default function SuccessStoriesPage() {
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
              <Award className="w-3 h-3 mr-1" />
              Success Stories
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
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h1>
          <p className="text-lg text-gray-600 mb-4">
            Real farmers, real results. Discover how Project Kisan is transforming agriculture across India
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>10,000+ Farmers</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>40% Yield Increase</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>4.8/5 Rating</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Featured Success Story */}
          <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-start space-x-2 mb-4">
              <Quote className="w-6 h-6 text-green-600 mt-1" />
              <Badge className="bg-green-100 text-green-800 border-green-300">Featured Story</Badge>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  "Project Kisan helped me increase my tomato yield by 60% in just one season!"
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  After struggling with recurring tomato blight for three seasons, I discovered Project Kisan. The AI diagnosis quickly identified early symptoms that I had missed, and the treatment recommendations were spot-on. Not only did I save my crop, but I also learned sustainable farming practices that boosted my overall yield.
                </p>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12 bg-green-100 text-green-800 font-semibold">
                    RM
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">Ramesh Mehta</div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>Nashik, Maharashtra</span>
                      <span>•</span>
                      <span>Tomato Farmer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-green-200">
                <h3 className="font-semibold text-gray-800 mb-4">Results Achieved</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Yield Increase</span>
                    <span className="font-semibold text-green-600">+60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Disease Reduction</span>
                    <span className="font-semibold text-green-600">-80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Income Boost</span>
                    <span className="font-semibold text-green-600">₹2.5L+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Saved</span>
                    <span className="font-semibold text-green-600">15 hrs/week</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Success Stories Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Story 1 */}
            <Card className="p-6">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                "FarmerGPT became my digital agriculture advisor"
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                As a first-generation farmer, I had limited knowledge about modern farming techniques. FarmerGPT answered all my questions in Kannada and guided me through every step of rice cultivation. My first harvest exceeded all expectations!
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-10 h-10 bg-blue-100 text-blue-800 font-semibold">
                  SK
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">Suresh Kumar</div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>Mysore, Karnataka</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-xs text-blue-600 font-medium mb-1">Key Achievement</div>
                <div className="text-sm text-blue-800">First harvest: 4.2 tons/acre (above state average)</div>
              </div>
            </Card>

            {/* Story 2 */}
            <Card className="p-6">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                "Market intelligence helped me get the best prices"
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                The market price alerts feature helped me time my cotton sales perfectly. Instead of selling immediately after harvest, I waited for the price surge and earned 35% more than my neighbors who sold early.
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-10 h-10 bg-purple-100 text-purple-800 font-semibold">
                  AP
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">Anita Patel</div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>Rajkot, Gujarat</span>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-xs text-purple-600 font-medium mb-1">Key Achievement</div>
                <div className="text-sm text-purple-800">Extra income: ₹1.8L from better market timing</div>
              </div>
            </Card>

            {/* Story 3 */}
            <Card className="p-6">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                "Saved my wheat crop from devastating rust disease"
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Project Kisan's early disease detection saved my entire wheat field. The AI spotted rust symptoms days before they became visible to me. Quick treatment prevented what could have been a total crop loss.
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-10 h-10 bg-orange-100 text-orange-800 font-semibold">
                  JS
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">Jasbir Singh</div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>Ludhiana, Punjab</span>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-xs text-orange-600 font-medium mb-1">Key Achievement</div>
                <div className="text-sm text-orange-800">Prevented losses worth ₹3.2L through early detection</div>
              </div>
            </Card>

            {/* Story 4 */}
            <Card className="p-6">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                "Family farming coordination became effortless"
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Managing our 15-acre family farm was chaotic until Project Kisan. Now all family members get real-time updates, task assignments are clear, and we make informed decisions together using AI insights.
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-10 h-10 bg-green-100 text-green-800 font-semibold">
                  VR
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">Vikram Reddy</div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>Warangal, Telangana</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-xs text-green-600 font-medium mb-1">Key Achievement</div>
                <div className="text-sm text-green-800">40% improvement in farm coordination efficiency</div>
              </div>
            </Card>

          </div>

          {/* Statistics Section */}
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Impact Across India</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-sm text-gray-600">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">₹50Cr+</div>
                <div className="text-sm text-gray-600">Additional Income Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">28</div>
                <div className="text-sm text-gray-600">Indian States Covered</div>
              </div>
            </div>
          </Card>

          {/* Join Success Stories */}
          <Card className="p-8 text-center bg-green-50 border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-green-700 mb-6 max-w-2xl mx-auto">
              Join thousands of farmers who are already transforming their agriculture with AI-powered insights and community support.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                Get Started Free
              </Button>
              <Button variant="outline" className="text-green-700 border-green-300">
                Share Your Story
              </Button>
            </div>
          </Card>

          {/* Video Testimonials */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">▶️</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Ravi's Journey</h3>
                <p className="text-gray-600 text-sm mb-3">How AI diagnosis transformed his mango orchard</p>
                <Button size="sm" variant="outline">Watch Video</Button>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">▶️</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Priya's Innovation</h3>
                <p className="text-gray-600 text-sm mb-3">Using FarmerGPT for sustainable vegetable farming</p>
                <Button size="sm" variant="outline">Watch Video</Button>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">▶️</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Kumar Family</h3>
                <p className="text-gray-600 text-sm mb-3">Three generations working together with Project Kisan</p>
                <Button size="sm" variant="outline">Watch Video</Button>
              </div>
            </div>
          </Card>

        </div>
      </main>
    </div>
  )
}
