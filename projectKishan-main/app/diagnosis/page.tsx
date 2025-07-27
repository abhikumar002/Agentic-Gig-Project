"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, Loader2, CheckCircle, AlertTriangle, ArrowRight, Globe, Zap, Brain, Leaf } from "lucide-react"
import Link from "next/link"

export default function DiagnosisPage() {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [rawResult, setRawResult] = useState("")
  const [loading, setLoading] = useState(false)
  // const language = localStorage.getItem("selectedLanguage") || "English"



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!image) return
    const language = localStorage.getItem("selectedLanguage") || "English"

    setLoading(true)
    const formData = new FormData()
    formData.append("image", image)
    formData.append("language", language)

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.result) {
        setRawResult(JSON.stringify(data.result, null, 2)) // for debugging box

        const { question1, question2, question3, question4 } = data.result

        setResult({
          disease: question1 || "Not specified",
          symptoms: [question1], // You can improve this based on disease name
          causes: [question2],
          severity: question3 || "Unknown",
          treatment: question4 || "No treatment available",
          prevention: question4 || "No prevention steps provided",
          confidence: 90, // fake confidence unless returned from backend
        })
      } else {
        setResult({
          disease: "No analysis available",
          confidence: 0,
          severity: "Unknown",
          treatment: "Please try again with a clearer image",
          prevention: "Ensure good image quality",
          symptoms: ["Unable to detect"],
          causes: ["Poor image quality or unsupported plant type"],
        })
      }
    } catch (error) {
      console.error("Diagnosis error:", error)
      setResult({
        disease: "Error analyzing image",
        confidence: 0,
        severity: "Unknown",
        treatment: "Please try again with a clearer image",
        prevention: "Ensure stable internet connection",
        symptoms: ["Analysis failed"],
        causes: ["Network error or server issue"],
      })
    }

    setLoading(false)
  }
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
    localStorage.setItem("selectedLanguage", value)
  }
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage")
    if (savedLang) setSelectedLanguage(savedLang)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">K</span>
              </div>
              <span className="text-lg font-medium text-gray-900 hidden sm:block">Project Kisan</span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="mb-4">
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>

                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "English",
                      "Hindi",
                      "Marathi",
                      "Bihari",
                      "Kannada",
                      "Gujarati",
                      "Bengali",
                      "Punjabi",
                      "Tamil",
                      "Telugu",
                      "Malayalam",
                      "Odia",
                      "Assamese",
                      "Urdu",
                      "Nepali",
                      "Sanskrit"
                    ].map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>

                </Select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h1 className="text-5xl font-light text-gray-900 mb-6">
            AI-Powered{" "}
            <span className="relative font-normal">
              Leaf Diagnosis
              <div className="absolute -bottom-1 right-0 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center rotate-12">
                <span className="text-white text-xs">🌿</span>
              </div>
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Upload a photo of your crop leaves and get instant AI-powered disease diagnosis with treatment
            recommendations in your preferred language.
          </p>

        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Upload Section */}
            <div className="space-y-8">
              <Card className="p-8 border-0 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Camera className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Upload Leaf Image</h3>
                    <p className="text-gray-500 text-sm">High-quality images work best</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Uploaded leaf"
                          className="w-full h-48 object-cover rounded-xl shadow-lg"
                        />
                        <p className="text-emerald-600 font-medium">Image uploaded successfully!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-emerald-100 transition-colors">
                          <Upload className="w-8 h-8 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                        </div>
                        <div>
                          <p className="text-gray-700 font-medium mb-2">Click to upload or drag and drop</p>
                          <p className="text-gray-500 text-sm">PNG, JPG up to 10MB</p>
                          {/* {language === "kn" && <p className="text-emerald-600 text-sm mt-2">ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ</p>} */}
                        </div>
                      </div>
                    )}
                  </div>

                  <input id="file-input" type="file" accept="image/*" onChange={handleChange} className="hidden" />

                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !image}
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Analyze Leaf
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 text-center border-0 shadow-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">Instant</div>
                  <div className="text-xs text-gray-500">{"<2 seconds"}</div>
                </Card>
                <Card className="p-4 text-center border-0 shadow-lg">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">Accurate</div>
                  <div className="text-xs text-gray-500">95% precision</div>
                </Card>
                <Card className="p-4 text-center border-0 shadow-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">Multilingual</div>
                  <div className="text-xs text-gray-500">15+ languages</div>
                </Card>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-8">
              {(result || loading) && (
                <Card className="p-8 border-0 shadow-xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Brain className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">AI Analysis Results</h3>
                      <p className="text-gray-500 text-sm">Powered by Vertex AI Gemini</p>
                    </div>
                  </div>

                  {loading ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                        <span className="text-gray-600">Analyzing leaf patterns...</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Disease Detection */}
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-6 h-6 text-orange-500 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {result?.disease || "Unknown Disease"}
                            </h4>
                            {/* <Badge className="bg-orange-100 text-orange-800">
                              {result?.confidence || 0}% Confidence
                            </Badge> */}
                          </div>
                          {/* {language === "kn" && result?.kannadaName && (
                            <p className="text-emerald-600 font-medium mb-2">ಕನ್ನಡ: {result.kannadaName}</p>
                          )}
                          {language === "hi" && result?.hindiName && (
                            <p className="text-emerald-600 font-medium mb-2">हिंदी: {result.hindiName}</p>
                          )} */}
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-gray-600">Severity: {result?.severity || "Unknown"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Treatment */}
                      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h5 className="font-semibold text-blue-900 mb-3 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Treatment Recommendation
                        </h5>
                        <p className="text-blue-800 leading-relaxed">
                          {result?.treatment || "No treatment information available"}
                        </p>
                      </div>

                      {/* Prevention */}
                      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                        <h5 className="font-semibold text-green-900 mb-3 flex items-center">
                          <Leaf className="w-4 h-4 mr-2" />
                          Prevention Tips
                        </h5>
                        <p className="text-green-800 leading-relaxed">
                          {result?.prevention || "No prevention information available"}
                        </p>
                      </div>

                      {/* Symptoms & Causes */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                          <h5 className="font-semibold text-yellow-900 mb-3">
                            Symptoms
                          </h5>
                          <ul className="space-y-2">
                            {(result?.symptoms || []).map((symptom: string, index: number) => (
                              <li key={index} className="text-yellow-800 text-sm flex items-start">
                                <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                          <h5 className="font-semibold text-red-900 mb-3">
                            Common Causes
                          </h5>
                          <ul className="space-y-2">
                            {(result?.causes || []).map((cause: string, index: number) => (
                              <li key={index} className="text-red-800 text-sm flex items-start">
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              )}

              {/* How it Works */}
              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-blue-50">
                <h3 className="text-xl font-medium text-gray-900 mb-6">How AI Diagnosis Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Image Processing</h4>
                      <p className="text-gray-600 text-sm">AI analyzes leaf patterns, colors, and textures</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Disease Detection</h4>
                      <p className="text-gray-600 text-sm">Compares with database of 500+ plant diseases</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Expert Recommendations</h4>
                      <p className="text-gray-600 text-sm">Provides treatment and prevention strategies</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Need More Agricultural Support?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore our complete suite of AI-powered farming tools and solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8">
              Explore All Features
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8 bg-transparent"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>
      {/* Raw Result for Debugging */}
      {rawResult && (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h5 className="font-semibold text-gray-900 mb-2">Raw Analysis Result:</h5>
          <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-auto max-h-32">{rawResult}</pre>
        </div>
      )}
    </div>
  )
}
