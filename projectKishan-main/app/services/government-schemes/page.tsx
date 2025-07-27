"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building2, Search, ExternalLink, FileText, Calendar, DollarSign, Users, CheckCircle, AlertCircle, Info } from "lucide-react"
import Link from "next/link"

export default function GovernmentSchemesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [filteredSchemes, setFilteredSchemes] = useState<any[]>([])

  const schemes = [
    {
      id: 1,
      name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      category: "financial",
      description: "Direct income support to farmer families owning cultivable land",
      benefits: "₹6,000 per year in three installments",
      eligibility: "Small and marginal farmers",
      applicationProcess: "Online registration through PM-KISAN portal",
      documents: ["Aadhaar Card", "Bank Account Details", "Land Records"],
      deadline: "Ongoing",
      status: "active",
      state: "all",
      website: "https://pmkisan.gov.in"
    },
    {
      id: 2,
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      category: "insurance",
      description: "Crop insurance scheme providing financial support against crop loss",
      benefits: "Coverage against natural calamities, pests, and diseases",
      eligibility: "All farmers growing notified crops",
      applicationProcess: "Through banks, CSCs, or insurance companies",
      documents: ["Aadhaar Card", "Bank Account", "Land Documents", "Sowing Certificate"],
      deadline: "Season-wise cutoff dates",
      status: "active",
      state: "all",
      website: "https://pmfby.gov.in"
    },
    {
      id: 3,
      name: "Kisan Credit Card (KCC)",
      category: "credit",
      description: "Credit facility for farmers to meet agricultural and allied expenses",
      benefits: "Credit limit based on farming area and crops",
      eligibility: "All farmers including tenant farmers",
      applicationProcess: "Apply through banks and cooperative societies",
      documents: ["Aadhaar Card", "Land Records", "Income Certificate"],
      deadline: "Ongoing",
      status: "active",
      state: "all",
      website: "https://kcc.gov.in"
    },
    {
      id: 4,
      name: "Soil Health Card Scheme",
      category: "technology",
      description: "Soil testing and nutrient management for better crop yield",
      benefits: "Free soil testing and customized fertilizer recommendations",
      eligibility: "All farmers",
      applicationProcess: "Through agriculture extension officers",
      documents: ["Aadhaar Card", "Land Records"],
      deadline: "Ongoing",
      status: "active",
      state: "all",
      website: "https://soilhealth.dac.gov.in"
    },
    {
      id: 5,
      name: "National Agriculture Market (e-NAM)",
      category: "marketing",
      description: "Online trading platform for agricultural commodities",
      benefits: "Better price discovery and reduced transaction costs",
      eligibility: "Farmers and traders",
      applicationProcess: "Registration on e-NAM portal",
      documents: ["Aadhaar Card", "Bank Account Details"],
      deadline: "Ongoing",
      status: "active",
      state: "all",
      website: "https://enam.gov.in"
    }
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "financial", label: "Financial Support" },
    { value: "insurance", label: "Insurance" },
    { value: "credit", label: "Credit & Loans" },
    { value: "technology", label: "Technology" },
    { value: "marketing", label: "Marketing" }
  ]

  const states = [
    { value: "all-states", label: "All States" },
    { value: "all", label: "Pan India" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "karnataka", label: "Karnataka" },
    { value: "punjab", label: "Punjab" },
    { value: "tamil-nadu", label: "Tamil Nadu" },
    { value: "uttar-pradesh", label: "Uttar Pradesh" }
  ]

  const searchSchemes = () => {
    let filtered = schemes

    if (searchQuery) {
      filtered = filtered.filter(scheme => 
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory)
    }

    if (selectedState && selectedState !== "all-states") {
      filtered = filtered.filter(scheme => 
        scheme.state === "all" || scheme.state === selectedState
      )
    }

    setFilteredSchemes(filtered)
  }

  React.useEffect(() => {
    searchSchemes()
  }, [searchQuery, selectedCategory, selectedState])

  React.useEffect(() => {
    setFilteredSchemes(schemes)
  }, [])

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      financial: "bg-green-100 text-green-800 border-green-200",
      insurance: "bg-blue-100 text-blue-800 border-blue-200",
      credit: "bg-purple-100 text-purple-800 border-purple-200",
      technology: "bg-orange-100 text-orange-800 border-orange-200",
      marketing: "bg-pink-100 text-pink-800 border-pink-200"
    }
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200"
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
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Government Schemes</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover and apply for government agricultural schemes and subsidies available for farmers
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <Card className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search schemes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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

              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map(state => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>
      </section>

      {/* Schemes List */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Available Schemes ({filteredSchemes.length})
            </h2>
          </div>

          <div className="grid gap-6">
            {filteredSchemes.map((scheme) => (
              <Card key={scheme.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{scheme.name}</h3>
                      <Badge className={getCategoryColor(scheme.category)}>
                        {categories.find(c => c.value === scheme.category)?.label}
                      </Badge>
                      {scheme.status === 'active' && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{scheme.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-900">Benefits</span>
                    </div>
                    <p className="text-sm text-gray-600">{scheme.benefits}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-900">Eligibility</span>
                    </div>
                    <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span className="font-medium text-gray-900">Deadline</span>
                    </div>
                    <p className="text-sm text-gray-600">{scheme.deadline}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-gray-900">Required Documents</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {scheme.documents.map((doc: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900">Application Process:</span>
                      <p className="text-sm text-gray-600 mt-1">{scheme.applicationProcess}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <Card className="p-8 text-center">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Schemes Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </Card>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Get assistance with scheme applications and eligibility requirements
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Download Guide
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
