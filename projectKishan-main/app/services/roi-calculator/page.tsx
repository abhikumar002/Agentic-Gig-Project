"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calculator, TrendingUp, DollarSign, PieChart, BarChart3, Target, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ROICalculatorPage() {
  const [formData, setFormData] = useState({
    cropType: "",
    landSize: "",
    landUnit: "acres",
    seedCost: "",
    fertilizerCost: "",
    laborCost: "",
    irrigationCost: "",
    otherCosts: "",
    expectedYield: "",
    marketPrice: "",
    season: ""
  })

  const [calculationResult, setCalculationResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateROI = () => {
    setIsCalculating(true)
    
    setTimeout(() => {
      const totalInvestment = parseFloat(formData.seedCost || "0") + 
                            parseFloat(formData.fertilizerCost || "0") + 
                            parseFloat(formData.laborCost || "0") + 
                            parseFloat(formData.irrigationCost || "0") + 
                            parseFloat(formData.otherCosts || "0")
      
      const totalRevenue = parseFloat(formData.expectedYield || "0") * parseFloat(formData.marketPrice || "0")
      const netProfit = totalRevenue - totalInvestment
      const roiPercentage = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0
      
      setCalculationResult({
        totalInvestment,
        totalRevenue,
        netProfit,
        roiPercentage,
        breakEvenYield: totalInvestment / parseFloat(formData.marketPrice || "1"),
        profitPerAcre: netProfit / parseFloat(formData.landSize || "1"),
        costBreakdown: {
          seeds: parseFloat(formData.seedCost || "0"),
          fertilizer: parseFloat(formData.fertilizerCost || "0"),
          labor: parseFloat(formData.laborCost || "0"),
          irrigation: parseFloat(formData.irrigationCost || "0"),
          others: parseFloat(formData.otherCosts || "0")
        }
      })
      setIsCalculating(false)
    }, 2000)
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
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">ROI & Yield Calculator</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate return on investment and plan your agricultural finances with precision
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Investment Calculator</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Crop Type</label>
                    <Select value={formData.cropType} onValueChange={(value) => handleInputChange("cropType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="maize">Maize</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="tomato">Tomato</SelectItem>
                        <SelectItem value="potato">Potato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Season</label>
                    <Select value={formData.season} onValueChange={(value) => handleInputChange("season", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                        <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Land Size</label>
                    <Input
                      type="number"
                      placeholder="Enter land size"
                      value={formData.landSize}
                      onChange={(e) => handleInputChange("landSize", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Unit</label>
                    <Select value={formData.landUnit} onValueChange={(value) => handleInputChange("landUnit", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acres">Acres</SelectItem>
                        <SelectItem value="hectares">Hectares</SelectItem>
                        <SelectItem value="bigha">Bigha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Investment Costs (₹)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="Seed cost"
                      value={formData.seedCost}
                      onChange={(e) => handleInputChange("seedCost", e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Fertilizer cost"
                      value={formData.fertilizerCost}
                      onChange={(e) => handleInputChange("fertilizerCost", e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Labor cost"
                      value={formData.laborCost}
                      onChange={(e) => handleInputChange("laborCost", e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Irrigation cost"
                      value={formData.irrigationCost}
                      onChange={(e) => handleInputChange("irrigationCost", e.target.value)}
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Other costs"
                    value={formData.otherCosts}
                    onChange={(e) => handleInputChange("otherCosts", e.target.value)}
                    className="mt-4"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Expected Returns</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="Expected yield (kg/quintal)"
                      value={formData.expectedYield}
                      onChange={(e) => handleInputChange("expectedYield", e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Market price per unit (₹)"
                      value={formData.marketPrice}
                      onChange={(e) => handleInputChange("marketPrice", e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateROI}
                  disabled={isCalculating || !formData.cropType}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {isCalculating ? (
                    <>
                      <Calculator className="w-4 h-4 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate ROI
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
              {calculationResult ? (
                <>
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Summary</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-600">Total Investment</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-900">₹{calculationResult.totalInvestment.toLocaleString()}</div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">Expected Revenue</span>
                        </div>
                        <div className="text-2xl font-bold text-green-900">₹{calculationResult.totalRevenue.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 rounded-lg text-white mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm opacity-90">Net Profit</div>
                          <div className="text-3xl font-bold">₹{calculationResult.netProfit.toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm opacity-90">ROI</div>
                          <div className="text-3xl font-bold">{calculationResult.roiPercentage.toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Break-even Yield</div>
                        <div className="text-lg font-semibold text-gray-900">{calculationResult.breakEvenYield.toFixed(0)} units</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Profit per {formData.landUnit.slice(0, -1)}</div>
                        <div className="text-lg font-semibold text-gray-900">₹{calculationResult.profitPerAcre.toFixed(0)}</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                    <div className="space-y-3">
                      {Object.entries(calculationResult.costBreakdown).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-gray-600 capitalize">{key === 'others' ? 'Other costs' : key}</span>
                          <span className="font-semibold">₹{(value as number).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 bg-yellow-50 border-yellow-200">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-2">Financial Tips</h4>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• Consider crop insurance to mitigate risks</li>
                          <li>• Monitor market prices regularly</li>
                          <li>• Plan for seasonal price variations</li>
                          <li>• Maintain 10-15% buffer for unexpected costs</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </>
              ) : (
                <Card className="p-8 text-center">
                  <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculate Your ROI</h3>
                  <p className="text-gray-600">Fill in the form to get detailed financial analysis and ROI calculations</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
