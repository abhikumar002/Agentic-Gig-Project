"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Satellite, MapPin, Calendar, TrendingUp, Zap, Droplets, Thermometer, Eye, Download } from "lucide-react"
import Link from "next/link"

export default function SatelliteAnalysisPage() {
  const [selectedField, setSelectedField] = useState("")
  const [analysisType, setAnalysisType] = useState("")
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleAnalysis = () => {
    setIsLoading(true)
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        fieldHealth: 87,
        cropStage: "Flowering",
        ndviValue: 0.72,
        moistureLevel: 68,
        temperature: 28.5,
        recommendations: [
          "Optimal irrigation in north-eastern section",
          "Monitor for early blight symptoms",
          "Consider nitrogen supplement in 2 weeks"
        ]
      })
      setIsLoading(false)
    }, 3000)
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
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Satellite className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Satellite Field Analysis</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Monitor your crops and agricultural fields with advanced satellite imagery and AI-powered analysis
            </p>
          </div>
        </div>
      </section>

      {/* Analysis Tool */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Field Analysis Tool</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Field Location</label>
                <div className="space-y-3">
                  <Input
                    placeholder="Latitude (e.g., 28.6139)"
                    value={coordinates.lat}
                    onChange={(e) => setCoordinates({...coordinates, lat: e.target.value})}
                  />
                  <Input
                    placeholder="Longitude (e.g., 77.2090)"
                    value={coordinates.lng}
                    onChange={(e) => setCoordinates({...coordinates, lng: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Analysis Type</label>
                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select analysis type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crop-health">Crop Health Assessment</SelectItem>
                    <SelectItem value="ndvi">NDVI Analysis</SelectItem>
                    <SelectItem value="moisture">Soil Moisture Analysis</SelectItem>
                    <SelectItem value="growth">Growth Monitoring</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleAnalysis}
              disabled={!coordinates.lat || !coordinates.lng || !analysisType || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Satellite className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Satellite Data...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Start Analysis
                </>
              )}
            </Button>
          </Card>

          {/* Results */}
          {analysisResult && (
            <Card className="mt-8 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Analysis Results</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 bg-green-50 border-green-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Field Health</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{analysisResult.fieldHealth}%</div>
                  <div className="text-sm text-green-700">Excellent condition</div>
                </Card>

                <Card className="p-6 bg-blue-50 border-blue-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Moisture Level</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{analysisResult.moistureLevel}%</div>
                  <div className="text-sm text-blue-700">Optimal range</div>
                </Card>

                <Card className="p-6 bg-orange-50 border-orange-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Thermometer className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Temperature</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">{analysisResult.temperature}°C</div>
                  <div className="text-sm text-orange-700">Suitable for growth</div>
                </Card>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">AI Recommendations</h4>
                <div className="space-y-3">
                  {analysisResult.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span className="text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Analysis Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">NDVI Monitoring</h3>
              <p className="text-gray-600">Track vegetation health and photosynthetic activity using normalized difference vegetation index.</p>
            </Card>

            <Card className="p-6">
              <Droplets className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Soil Moisture</h3>
              <p className="text-gray-600">Monitor soil moisture levels to optimize irrigation scheduling and water management.</p>
            </Card>

            <Card className="p-6">
              <Calendar className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Tracking</h3>
              <p className="text-gray-600">Track crop growth stages and predict harvest timing with historical satellite data.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
