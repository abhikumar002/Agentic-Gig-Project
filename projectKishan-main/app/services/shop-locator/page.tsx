"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Search, Phone, Clock, Star, Navigation, Filter, Store, Truck, Wrench, Sprout } from "lucide-react"
import Link from "next/link"

export default function ShopLocatorPage() {
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedRadius, setSelectedRadius] = useState("10")
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [shops, setShops] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { value: "all", label: "All Categories", icon: Store },
    { value: "seeds", label: "Seeds & Nursery", icon: Sprout },
    { value: "fertilizers", label: "Fertilizers & Pesticides", icon: Sprout },
    { value: "tools", label: "Farm Tools & Equipment", icon: Wrench },
    { value: "machinery", label: "Agricultural Machinery", icon: Truck },
    { value: "general", label: "General Agriculture Store", icon: Store }
  ]

  const sampleShops = [
    {
      id: 1,
      name: "Green Valley Agri Center",
      category: "general",
      address: "123 Main Street, Agricultural Market, Pune",
      distance: 2.5,
      rating: 4.5,
      phone: "+91 98765 43210",
      hours: "8:00 AM - 8:00 PM",
      services: ["Seeds", "Fertilizers", "Tools", "Pesticides"],
      verified: true,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Krishna Seeds & Nursery",
      category: "seeds",
      address: "456 Garden Road, Shivaji Nagar, Pune",
      distance: 3.2,
      rating: 4.8,
      phone: "+91 98765 43211",
      hours: "7:00 AM - 7:00 PM",
      services: ["Hybrid Seeds", "Organic Seeds", "Saplings", "Garden Plants"],
      verified: true,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Modern Farm Equipment",
      category: "machinery",
      address: "789 Industrial Area, Hadapsar, Pune",
      distance: 5.1,
      rating: 4.3,
      phone: "+91 98765 43212",
      hours: "9:00 AM - 6:00 PM",
      services: ["Tractors", "Harvesters", "Irrigation Systems", "Repair Services"],
      verified: false,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Organic Fertilizer Hub",
      category: "fertilizers",
      address: "321 Eco Park, Aundh, Pune",
      distance: 4.8,
      rating: 4.6,
      phone: "+91 98765 43213",
      hours: "8:30 AM - 7:30 PM",
      services: ["Organic Fertilizers", "Bio-pesticides", "Soil Conditioners"],
      verified: true,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Farmers Tool Mart",
      category: "tools",
      address: "654 Market Yard, Gultekdi, Pune",
      distance: 6.2,
      rating: 4.1,
      phone: "+91 98765 43214",
      hours: "8:00 AM - 8:00 PM",
      services: ["Hand Tools", "Power Tools", "Irrigation Equipment", "Storage"],
      verified: true,
      image: "/placeholder.svg"
    }
  ]

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }, [])

  const searchShops = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      let filtered = sampleShops

      if (selectedCategory && selectedCategory !== "all") {
        filtered = filtered.filter(shop => shop.category === selectedCategory)
      }

      // Filter by radius
      const radius = parseInt(selectedRadius)
      filtered = filtered.filter(shop => shop.distance <= radius)

      // Sort by distance
      filtered.sort((a, b) => a.distance - b.distance)

      setShops(filtered)
      setIsLoading(false)
    }, 1500)
  }

  useEffect(() => {
    setShops(sampleShops)
  }, [])

  const getCategoryIcon = (category: string) => {
    const categoryInfo = categories.find(c => c.value === category)
    return categoryInfo ? categoryInfo.icon : Store
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      seeds: "bg-green-100 text-green-800 border-green-200",
      fertilizers: "bg-blue-100 text-blue-800 border-blue-200",
      tools: "bg-orange-100 text-orange-800 border-orange-200",
      machinery: "bg-purple-100 text-purple-800 border-purple-200",
      general: "bg-gray-100 text-gray-800 border-gray-200"
    }
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const openInMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-pink-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Agriculture Shop Locator</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find agricultural stores, equipment dealers, and supply shops near your location
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <Card className="p-6">
            <div className="grid md:grid-cols-5 gap-4 mb-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Enter location or pincode..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRadius} onValueChange={setSelectedRadius}>
                <SelectTrigger>
                  <SelectValue placeholder="Radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 km</SelectItem>
                  <SelectItem value="10">10 km</SelectItem>
                  <SelectItem value="25">25 km</SelectItem>
                  <SelectItem value="50">50 km</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={searchShops} disabled={isLoading} className="bg-red-600 hover:bg-red-700 text-white">
                {isLoading ? (
                  <>
                    <Search className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>

            {userLocation && (
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Navigation className="w-4 h-4" />
                <span>Location detected. Showing nearby stores.</span>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Agriculture Shops ({shops.length} found)
            </h2>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="grid gap-6">
            {shops.map((shop) => {
              const CategoryIcon = getCategoryIcon(shop.category)
              
              return (
                <Card key={shop.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <CategoryIcon className="w-8 h-8 text-gray-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{shop.name}</h3>
                          {shop.verified && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              Verified
                            </Badge>
                          )}
                          <Badge className={getCategoryColor(shop.category)}>
                            {categories.find(c => c.value === shop.category)?.label}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{shop.address}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Navigation className="w-4 h-4" />
                            <span>{shop.distance} km away</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{shop.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{shop.hours}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{shop.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Services & Products</h4>
                    <div className="flex flex-wrap gap-2">
                      {shop.services.map((service: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => openInMaps(shop.address)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Shop
                    </Button>
                    <Button variant="outline">
                      View Details
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>

          {shops.length === 0 && !isLoading && (
            <Card className="p-8 text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Shops Found</h3>
              <p className="text-gray-600">Try expanding your search radius or adjusting filters</p>
            </Card>
          )}
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Browse by Category</h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(1).map((category) => {
              const Icon = category.icon
              return (
                <Card 
                  key={category.value} 
                  className="p-6 text-center cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setSelectedCategory(category.value)
                    searchShops()
                  }}
                >
                  <Icon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 mb-1">{category.label}</h3>
                  <p className="text-xs text-gray-500">Find nearby stores</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
