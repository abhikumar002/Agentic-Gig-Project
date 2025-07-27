"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Users, ArrowLeft, MessageCircle, Heart, Share2, Calendar, MapPin, Bookmark, TrendingUp, Award, Coffee, Lightbulb, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
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
              <Users className="w-3 h-3 mr-1" />
              Community Forum
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
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Forum</h1>
          <p className="text-lg text-gray-600 mb-6">
            Connect with fellow farmers, share experiences, and learn from each other's success stories
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>15,000+ Members</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>50+ Daily Discussions</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="w-4 h-4" />
              <span>500+ Expert Contributors</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Forum Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Actions */}
            <Card className="p-6 bg-green-50 border-green-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start New Discussion
                </Button>
                <Button variant="outline" className="flex-1 text-green-700 border-green-300">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Ask for Help
                </Button>
                <Button variant="outline" className="flex-1 text-green-700 border-green-300">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Share Tips
                </Button>
              </div>
            </Card>

            {/* Trending Discussions */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">Trending Discussions</h2>
              </div>
              
              <div className="space-y-4">
                
                {/* Discussion 1 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10 bg-blue-100 text-blue-800 font-semibold">
                      RM
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">Organic pest control for tomatoes - what works?</h3>
                        <Badge className="bg-green-100 text-green-800 text-xs">Hot Topic</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Looking for effective organic methods to control whiteflies and aphids in my tomato crop. Chemical pesticides are affecting soil health...
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Ravi Mehta • Maharashtra</span>
                        <span>•</span>
                        <span>45 replies</span>
                        <span>•</span>
                        <span>2 hours ago</span>
                      </div>
                      <div className="flex items-center space-x-3 mt-2">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                          <Heart className="w-3 h-3 mr-1" />
                          23
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
                          <Share2 className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discussion 2 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10 bg-purple-100 text-purple-800 font-semibold">
                      SK
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">Water management during drought season</h3>
                        <Badge className="bg-orange-100 text-orange-800 text-xs">Expert Advice</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        With irregular monsoons, how can we efficiently manage water resources? Sharing my experience with drip irrigation and rainwater harvesting...
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Suresh Kumar • Karnataka</span>
                        <span>•</span>
                        <span>32 replies</span>
                        <span>•</span>
                        <span>5 hours ago</span>
                      </div>
                      <div className="flex items-center space-x-3 mt-2">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                          <Heart className="w-3 h-3 mr-1" />
                          18
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
                          <Bookmark className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discussion 3 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10 bg-green-100 text-green-800 font-semibold">
                      AP
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">Project Kisan AI helped me save my cotton crop!</h3>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">Success Story</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Want to share how the AI diagnosis feature detected bollworm infestation early. The recommended treatment worked perfectly and saved my entire crop...
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Anita Patel • Gujarat</span>
                        <span>•</span>
                        <span>28 replies</span>
                        <span>•</span>
                        <span>1 day ago</span>
                      </div>
                      <div className="flex items-center space-x-3 mt-2">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                          <Heart className="w-3 h-3 mr-1" />
                          35
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
                          <Share2 className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discussion 4 */}
                <div>
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10 bg-orange-100 text-orange-800 font-semibold">
                      VR
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">Market rates for paddy - where to sell for best prices?</h3>
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">Price Discussion</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Harvest season is here and I'm looking for the best markets to sell my paddy crop. Current rates in my area are ₹2,100/quintal...
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Vikram Reddy • Telangana</span>
                        <span>•</span>
                        <span>15 replies</span>
                        <span>•</span>
                        <span>2 days ago</span>
                      </div>
                      <div className="flex items-center space-x-3 mt-2">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                          <Heart className="w-3 h-3 mr-1" />
                          12
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Price Alert
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Card>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" className="px-8">
                Load More Discussions
              </Button>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Community Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-semibold text-green-600">15,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Today</span>
                  <span className="font-semibold text-blue-600">1,423</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Discussions</span>
                  <span className="font-semibold text-purple-600">8,956</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expert Answers</span>
                  <span className="font-semibold text-orange-600">2,145</span>
                </div>
              </div>
            </Card>

            {/* Top Contributors */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Contributors</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8 bg-gold-100 text-gold-800 font-semibold">
                    🥇
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Dr. Rahul Sharma</div>
                    <div className="text-xs text-gray-500">Agricultural Expert • 2,456 helps</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8 bg-silver-100 text-gray-700 font-semibold">
                    🥈
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Priya Nair</div>
                    <div className="text-xs text-gray-500">Organic Farming Specialist • 1,867 helps</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8 bg-bronze-100 text-orange-700 font-semibold">
                    🥉
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Arjun Singh</div>
                    <div className="text-xs text-gray-500">Crop Disease Expert • 1,234 helps</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Categories */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">🌾 Crop Diseases</span>
                  <Badge variant="outline" className="text-xs">234</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">💰 Market Prices</span>
                  <Badge variant="outline" className="text-xs">189</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">🌱 Organic Farming</span>
                  <Badge variant="outline" className="text-xs">156</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">💧 Water Management</span>
                  <Badge variant="outline" className="text-xs">143</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">🚜 Technology</span>
                  <Badge variant="outline" className="text-xs">98</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">🌍 Sustainability</span>
                  <Badge variant="outline" className="text-xs">87</Badge>
                </div>
              </div>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-3">
                  <div className="font-medium text-gray-900">Organic Farming Webinar</div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>Jan 25, 2025 • 3:00 PM</span>
                  </div>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <div className="font-medium text-gray-900">AI in Agriculture Summit</div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>Feb 2, 2025 • 10:00 AM</span>
                  </div>
                </div>
                <div className="border-l-4 border-purple-500 pl-3">
                  <div className="font-medium text-gray-900">Monthly Farmer Meetup</div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>Feb 15, 2025 • 6:00 PM</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Join Community */}
            <Card className="p-6 bg-green-50 border-green-200 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Join Our WhatsApp Groups</h3>
              <p className="text-green-700 text-sm mb-4">
                Get instant updates and connect with farmers in your region.
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Join WhatsApp
              </Button>
            </Card>

          </div>

        </div>
      </main>
    </div>
  )
}
