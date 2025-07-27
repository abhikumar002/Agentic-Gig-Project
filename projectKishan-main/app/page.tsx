"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Camera, ChevronRight, Upload, TrendingUp, Loader2, CheckCircle, MessageCircle, LogOut, ChevronDown, Satellite, Calculator, Calendar, Building2, MapPin } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./contexts/AuthContext"
import { signOut } from "firebase/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  // const [selectedCrop, setSelectedCrop] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  // const [isLoading, setIsLoading] = useState(false)
  const [demoResult, setDemoResult] = useState<any>(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // const crops = ["Rice (ಅಕ್ಕಿ)", "Wheat (ಗೋಧಿ)", "Cotton (ಹತ್ತಿ)", "Tomato (ಟೊಮೇಟೊ)"]
  const states = ["Maharashtra", "Karnataka", "Punjab", "Tamil Nadu", "Uttar Pradesh"]
  const crops = ["Wheat", "Rice", "Maize", "Sugarcane", "Cotton"]
  // const [language, setLanguage] = useState("English") // Default language

  const [selectedState, setSelectedState] = useState<string>("")
  const [selectedCrop, setSelectedCrop] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>()
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false)
  const [showServicesDropdown, setShowServicesDropdown] = useState(false)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)
  const [servicesDropdownTimeout, setServicesDropdownTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // This runs only on client
    const savedLang = localStorage.getItem("selectedLanguage") || "English"
    setSelectedLanguage(savedLang)
  }, [])

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
    localStorage.setItem("selectedLanguage", value)
  }

  // Professional dropdown handlers
  const handleDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setShowResourcesDropdown(true)
  }

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setShowResourcesDropdown(false)
    }, 150) // 150ms delay before hiding
    setDropdownTimeout(timeout)
  }

  // Services dropdown handlers
  const handleServicesDropdownEnter = () => {
    if (servicesDropdownTimeout) {
      clearTimeout(servicesDropdownTimeout)
      setServicesDropdownTimeout(null)
    }
    setShowServicesDropdown(true)
  }

  const handleServicesDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setShowServicesDropdown(false)
    }, 150) // 150ms delay before hiding
    setServicesDropdownTimeout(timeout)
  }



  const { setUser, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset
        const parallax = scrolled * 0.3
        heroRef.current.style.transform = `translateY(${parallax}px)`
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      // Call real API
      setIsLoading(true)
      const formData = new FormData()
      formData.append("image", file)
      formData.append("language", selectedLanguage || "English") // Use selected language or default to English

      try {
        const res = await fetch("/api/diagnose", {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        if (data.result) {
          // const parsedResult = JSON.parse(data.result)
          setDemoResult({
            type: "diagnosis",
            disease: data.result.question1,         // Title: Disease
            cause: data.result.question2,           // What causes this?
            severity: data.result.question3,        // How serious is this?
            treatment: data.result.question4        // Treatment & Prevention
          })


        }
      } catch (error) {
        console.error("Diagnosis error:", error)
        setDemoResult({
          type: "diagnosis",
          disease: "Error analyzing image",
          confidence: 0,
          treatment: "Please try again with a clearer image",
          kannadaName: "ದೋಷ",
        })
      } finally {
        // Cleanup
        setIsLoading(false)
        setUploadedImage(null) // Clear uploaded image preview
        event.target.value = "" // Reset the file input value
      }

    }
  }



  const handleLogoutClick = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = async () => {
    try {
      // Optionally sign out from Firebase if used
      // await signOut(auth)

      setUser(null)
      localStorage.removeItem("projectKisan_user")

      toast("👋 You have been logged out.")

      // Close the confirmation dialog
      setShowLogoutConfirm(false)

      // Optional: Redirect or refresh page after logout
      setTimeout(() => {
        router.push("/login") // or simply refresh with: window.location.reload()
      }, 1000)

      console.log("User signed out")
    } catch (err) {
      console.error("Error signing out:", err)
      toast("❌ Error during logout. Please try again.")
    }
  }

  const cancelLogout = () => {
    setShowLogoutConfirm(false)
  }

  const simulateDiagnosis = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDemoResult({
        type: "diagnosis",
        disease: "Late Blight",
        confidence: 94,
        treatment: "Apply copper-based fungicide spray every 7-10 days",
        kannadaName: "ತಡವಾದ ಬ್ಲೈಟ್",
      })
      setIsLoading(false)
    }, 2000)
  }


  const handleCropSelect = (value: string) => {
    setSelectedCrop(value)
    // op
    // tionally trigger fetch here if both crop and state are selected
  }
  const handleStateSelect = (value: string) => {
    setSelectedState(value)
    // optionally trigger fetch here if both crop and state are selected
  }

  useEffect(() => {
    if (selectedCrop && selectedState) {
      fetchVegetablePrice(selectedCrop, selectedState)
    }
  }, [selectedCrop, selectedState])

  const fetchVegetablePrice = async (crop: string, state: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=579b464db66ec23bdd0000010e30f72ab0aa45674921636e6cbe8864&format=json&filters[Commodity]=${encodeURIComponent(
          crop
        )}&filters[State]=${encodeURIComponent(state)}`
      )

      const data = await response.json()

      if (data.records && data.records.length > 0) {
        const record = data.records

        // setPriceData(report)
        setDemoResult({
          type: "price",
          crop: selectedCrop,
          records: record // from the API response
        })


      } else {
        // setPriceData(`❌ No price data found for ${crop} in ${state}.`)
      }
    } catch (error) {
      console.error("Failed to fetch vegetable price:", error)
      // setPriceData("❌ Error fetching price data.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout? You'll need to login again to access your account.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={cancelLogout}
                  className="flex-1 rounded-full border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmLogout}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">K</span>
              </div>
              <span className="text-lg font-medium text-gray-900 hidden sm:block">Project Kisan</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/task-management"
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {/* <Camera className="w-4 h-4" /> */}
                <span className="text-sm font-medium">Task Manager</span>
              </Link>
              <Link
                href="/diagnosis"
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span className="text-sm font-medium">Leaf Diagnosis</span>
              </Link>
              <Link
                href="/farmer-gpt"
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">FarmerGPT</span>
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleServicesDropdownEnter}
                onMouseLeave={handleServicesDropdownLeave}
              >
                <button className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors py-2">
                  <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-sm">Services</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showServicesDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Services Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50 transition-all duration-200 ${showServicesDropdown
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible translate-y-2'
                    }`}
                  onMouseEnter={handleServicesDropdownEnter}
                  onMouseLeave={handleServicesDropdownLeave}
                >
                  <div className="py-1">
                    <Link
                      href="/services/satellite-analysis"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                    >
                      <Satellite className="w-4 h-4 mr-3 text-blue-500" />
                      <div>
                        <div className="font-medium">Satellite Analysis</div>
                        <div className="text-xs text-gray-500 group-hover:text-emerald-500">Crop & field monitoring</div>
                      </div>
                    </Link>
                    <Link
                      href="/services/roi-calculator"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                    >
                      <Calculator className="w-4 h-4 mr-3 text-green-500" />
                      <div>
                        <div className="font-medium">ROI Calculator</div>
                        <div className="text-xs text-gray-500 group-hover:text-emerald-500">Yield & financial planning</div>
                      </div>
                    </Link>
                    <Link
                      href="/services/calendar"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                    >
                      <Calendar className="w-4 h-4 mr-3 text-purple-500" />
                      <div>
                        <div className="font-medium">Calendar Maker</div>
                        <div className="text-xs text-gray-500 group-hover:text-emerald-500">Farm activity planning</div>
                      </div>
                    </Link>
                    <Link
                      href="/services/government-schemes"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                    >
                      <Building2 className="w-4 h-4 mr-3 text-orange-500" />
                      <div>
                        <div className="font-medium">Government Schemes</div>
                        <div className="text-xs text-gray-500 group-hover:text-emerald-500">Agricultural subsidies</div>
                      </div>
                    </Link>
                    <Link
                      href="/services/shop-locator"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                    >
                      <MapPin className="w-4 h-4 mr-3 text-red-500" />
                      <div>
                        <div className="font-medium">Shop Locator</div>
                        <div className="text-xs text-gray-500 group-hover:text-emerald-500">Find agriculture stores</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors py-2">
                  <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-sm">Resources</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showResourcesDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50 transition-all duration-200 ${showResourcesDropdown
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible translate-y-2'
                    }`}
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="py-1">
                    <Link
                      href="/documentation"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                    >
                      <span className="mr-3 text-base">📚</span>
                      <div>
                        <div className="font-medium">Documentation</div>
                        <div className="text-xs text-gray-500 group-hover:text-emerald-500">Complete guides & tutorials</div>
                      </div>
                    </Link>
                    <Link
                      href="/success-stories"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                    >
                      <span className="mr-3 text-base">🏆</span>
                      <div>
                        <div className="font-medium">Success Stories</div>
                        <div className="text-xs text-gray-500 group-hover:text-emerald-500">Real farmer experiences</div>
                      </div>
                    </Link>
                    <Link
                      href="/support"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                    >
                      <span className="mr-3 text-base">🛠️</span>
                      <div>
                        <div className="font-medium">Support Center</div>
                        <div className="text-xs text-gray-500 group-hover:text-emerald-500">Get help & assistance</div>
                      </div>
                    </Link>
                    <div className="mx-4 my-2 border-t border-gray-100"></div>
                    <Link
                      href="/community"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                    >
                      <span className="mr-3 text-base">👥</span>
                      <div>
                        <div className="font-medium">Community</div>
                        <div className="text-xs text-gray-500 group-hover:text-emerald-500">Connect with farmers</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {user ? (
                // ✅ Show Logout with confirmation if user is logged in
                <Button
                  size="sm"
                  onClick={handleLogoutClick}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4"
                >
                  Logout
                  <LogOut className="w-4 h-4 ml-2" />
                </Button>

              ) : (
                // ✅ Show Login & Sign Up if user is NOT logged in
                <div className="flex items-center space-x-3">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full px-4">
                    <Link href="/signup">
                      Sign Up
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="lg:pt-16">
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600 font-medium">Empowering Modern Agriculture</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-light text-gray-900 leading-tight mb-8">
                  AI-powered farming solutions for a{" "}
                  <span className="relative font-normal">
                    better tomorrow.
                    <div className="absolute -bottom-1 left-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center -rotate-12">
                      <span className="text-white text-xs">🌱</span>
                    </div>
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                  Bringing cutting-edge AI technology and innovative practices to Indian agriculture. Helping farmers
                  maximize yields, reduce waste, and enhance sustainability through intelligent solutions.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full px-8 py-3"
                >
                  <Link href="/signup">
                    Get Started Today
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-emerald-700 border-emerald-700 hover:bg-emerald-50 rounded-full px-6 bg-transparent"
                >
                  <Link href="/farmer-gpt">🤖 FarmerGPT</Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="text-gray-700 hover:bg-gray-50 rounded-full px-6">
                  <Link href="/diagnosis">Try Diagnosis</Link>
                </Button>
              </div>
            </div>
            {/* Right Content - Image Grid */}
            <div className="grid grid-cols-2 gap-4 h-fit">
              {/* Interactive Map Card */}
              <Card className="col-span-2 p-0 overflow-hidden bg-gradient-to-br from-green-100 to-emerald-200 border-0 shadow-lg">
                <div
                  className="relative h-64"
                  style={{
                    backgroundImage: `url('/placeholder.svg?height=256&width=512')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Farm landscape overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/40 to-emerald-600/50"></div>
                  {/* Floating technology badges */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-emerald-800 animate-pulse">
                    🌾 Precision Agriculture
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-emerald-800 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  >
                    🚜 Smart Farming
                  </div>
                  <div
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-emerald-800 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  >
                    📊 Data Analytics
                  </div>
                  <div
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-emerald-800 animate-pulse"
                    style={{ animationDelay: "1.5s" }}
                  >
                    🌱 Crop Health
                  </div>
                </div>
              </Card>
              {/* Success Story Card */}
              <Card className="p-0 overflow-hidden bg-gradient-to-br from-emerald-500 to-green-600 border-0 shadow-lg text-white">
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 bg-white/20 rounded-full border border-white/30 flex items-center justify-center">
                          <span className="text-xs">👨‍🌾</span>
                        </div>
                        <div className="w-6 h-6 bg-white/20 rounded-full border border-white/30 flex items-center justify-center">
                          <span className="text-xs">👩‍🌾</span>
                        </div>
                        <div className="w-6 h-6 bg-white/20 rounded-full border border-white/30 flex items-center justify-center">
                          <span className="text-xs">+</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-1">10K++</div>
                    <div className="text-sm opacity-90">farmers joined</div>
                  </div>
                  <div className="text-xs opacity-80">Join us in transforming the future of farming.</div>
                </div>
              </Card>
              {/* Diagnosis Feature */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg">
                <Link href="/diagnosis" className="block group">
                  <div className="flex items-center justify-between mb-3">
                    <Camera className="w-8 h-8 text-blue-600" />
                    <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="text-sm font-semibold text-blue-900 mb-1">Leaf Diagnosis</div>
                  <div className="text-xs text-blue-700">AI-powered crop analysis</div>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Try Our AI Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the power of AI-driven farming assistance with these quick demos
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Diagnosis */}
            {/* <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Camera className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Quick Diagnosis</h3>
                  <p className="text-gray-500 text-sm">Upload & analyze</p>
                </div>
              </div>
              <Link href="/diagnosis">
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-300 transition-colors mb-4">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">Click to start diagnosis</p>
                </div>
              </Link>
              {isLoading && (
                <div className="flex items-center justify-center space-x-2 text-emerald-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Analyzing...</span>
                </div>
              )}
            </Card> */}
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Camera className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Quick Diagnosis</h3>
                  <p className="text-gray-500 text-sm">Upload & analyze</p>
                </div>
              </div>

              {/* Language Select */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Select Language</label>

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


              {/* Image Upload Area */}
              <div
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-300 transition-colors mb-4"
                onClick={() => document.getElementById("demo-file-input")?.click()}
              >
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Uploaded plant"
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <div>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">Upload plant photo</p>
                  </div>
                )}
              </div>

              <input
                id="demo-file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Loading Spinner */}
              {isLoading && (
                <div className="flex items-center justify-center space-x-2 text-emerald-600 mt-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Analyzing...</span>
                </div>
              )}

            </Card>
            {/* Market Prices */}
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Market Prices</h3>
                  <p className="text-gray-500 text-sm">Real-time rates</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-4">

                {/* State Select */}
                <Select onValueChange={handleStateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Crop Select */}
                <Select onValueChange={handleCropSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isLoading && selectedCrop && selectedState && (
                <div className="flex items-center justify-center space-x-2 text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Fetching prices...</span>
                </div>
              )}
            </Card>

            {/* FarmerGPT Assistant */}
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">FarmerGPT</h3>
                  <p className="text-gray-500 text-sm">AI Chat Assistant</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 mb-4">
                <p className="text-purple-800 text-sm">"ನನ್ನ ಟೊಮೇಟೊ ಗಿಡದಲ್ಲಿ ಹಳದಿ ಎಲೆಗಳು ಕಾಣುತ್ತಿವೆ"</p>
                <p className="text-purple-600 text-xs mt-1">My tomato plant has yellow leaves</p>
              </div>
              <Button asChild variant="outline" size="sm" className="w-full rounded-full bg-transparent">
                <Link href="/farmer-gpt">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Try FarmerGPT
                </Link>
              </Button>
            </Card>
          </div>

          {demoResult && (
            <Card className="mt-12 p-8 border-0 shadow-xl">
              <h3 className="text-xl font-medium text-gray-900 mb-6">Result</h3>

              {demoResult.type === "diagnosis" && (
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-orange-500" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-orange-900">Disease: {demoResult.disease}</h4>
                    </div>
                  </div>

                  {/* What causes this? */}
                  {demoResult.cause && (
                    <div className="mb-4 p-4 bg-orange-100 rounded-lg">
                      <h5 className="font-medium text-orange-900 mb-2">What causes this?</h5>
                      <p className="text-orange-800 text-sm">{demoResult.cause}</p>
                    </div>
                  )}

                  {/* How serious is this? */}
                  {demoResult.severity && (
                    <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                      <h5 className="font-medium text-red-900 mb-2">How serious is this?</h5>
                      <p className="text-red-800 text-sm">{demoResult.severity}</p>
                    </div>
                  )}

                  {/* Treatment & Prevention */}
                  {demoResult.treatment && (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-900 mb-2">Treatment & Prevention</h5>
                      <p className="text-green-800 text-sm">{demoResult.treatment}</p>
                    </div>
                  )}
                </div>
              )}

              {demoResult.type === "price" && Array.isArray(demoResult.records) && (
                <div className="bg-green-50 p-6 rounded-xl border border-green-200 space-y-4">
                  <h3 className="text-lg font-semibold text-green-900">📊 {demoResult.crop} Prices</h3>

                  {demoResult.records.map((item: any, index: any) => (
                    <div
                      key={`${item.Market}-${item.Arrival_Date}-${index}`}
                      className="p-4 bg-white rounded-lg shadow-sm border border-green-100"
                    >
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium text-gray-700">
                          🏬 <span className="font-semibold">{item.Market}</span>, {item.District}
                        </div>
                        <div className="text-xs text-gray-500">{item.Arrival_Date}</div>
                      </div>

                      <div className="text-green-700 font-semibold text-sm">
                        ₹{item.Min_Price} – ₹{item.Max_Price}
                      </div>

                      <div className="text-xs text-gray-500">
                        Modal Price: ₹{item.Modal_Price} | Grade: {item.Grade} | Variety: {item.Variety}
                      </div>
                    </div>
                  ))}
                </div>
              )}


              <div className="mt-6 text-center">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6">
                  <Link href="/diagnosis">Try Full Diagnosis Tool</Link>
                </Button>
              </div>
            </Card>
          )}

        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-600 font-medium">About Project Kisan</span>
            </div>
            <h2 className="text-4xl font-light text-gray-900 mb-8 max-w-2xl">
              A Smarter, More Productive Agricultural Future
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              We are committed to supporting farmers and agricultural businesses with the tools and knowledge they need
              to thrive. With a focus on sustainable practices, advanced AI technology, and a deep understanding of
              Indian agriculture, we help farmers grow more with less impact on the environment.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h3 className="text-2xl font-light text-gray-900 mb-8">Embrace AI-Powered Practices</h3>
            <Card className="p-8 bg-emerald-50 border-emerald-200 border-l-4 border-l-emerald-600">
              <p className="text-gray-700 leading-relaxed">
                Adopt intelligent methods that not only boost productivity but also minimize environmental impact,
                ensuring the long-term health of your land and the surrounding ecosystem through advanced AI technology
                and sustainable farming practices.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">95%</div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">24/7</div>
                    <div className="text-sm text-gray-600">AI Support</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-emerald-700 hover:bg-emerald-100 rounded-full p-2">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-light mb-4">Subscribe to our newsletter for the latest updates.</h2>
              <p className="text-emerald-200 mb-8 leading-relaxed">
                Get insights on sustainable farming, AI technology updates, and success stories from farmers across
                India. Stay ahead with cutting-edge agricultural innovations.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-full h-12"
                />
                <Button className="bg-white text-emerald-900 hover:bg-gray-100 rounded-full px-8 h-12">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-emerald-200 text-xs mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">K</span>
                </div>
                <span className="text-lg font-medium">Project Kisan</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Empowering farmers with AI-powered solutions for sustainable agriculture and better crop yields through
                innovative technology.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-6">Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/diagnosis" className="hover:text-white transition-colors text-sm">
                    Crop Diagnosis
                  </Link>
                </li>
                <li>
                  <Link href="/farmer-gpt" className="hover:text-white transition-colors text-sm">
                    FarmerGPT Assistant
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm">
                    Market Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm">
                    Government Schemes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-6">Solutions</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm">
                    Family Farming
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm">
                    Sustainable Practices
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm">
                    Waste Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm">
                    Resource Optimization
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-6">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/documentation" className="hover:text-white transition-colors text-sm">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/success-stories" className="hover:text-white transition-colors text-sm">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors text-sm">
                    Support Center
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors text-sm">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Project Kisan. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}