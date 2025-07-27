"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, EyeOff, Leaf, Mail, Lock, User, MapPin } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    state: "",
    farmSize: "",
    role: "Farmer",
  })

  const states = [
    "Karnataka",
    "Tamil Nadu",
    "Andhra Pradesh",
    "Telangana",
    "Kerala",
    "Maharashtra",
    "Gujarat",
    "Rajasthan",
    "Punjab",
    "Haryana",
  ]
  const { setUser, user } = useAuth()
  const farmSizes = [
    "Less than 1 acre",
    "1-2 acres",
    "2-5 acres",
    "5-10 acres",
    "More than 10 acres",
  ]
  const router = useRouter()
  if (user) {
    // If user is already logged in, redirect to dashboard
    router.push("/")
    return null
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 mb-6 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-medium text-gray-900">Project Kisan</span>
          </Link>

          <h1 className="text-3xl font-light text-gray-900 mb-2">Join thousands of farmers</h1>
          <p className="text-gray-600">Create your AI farming assistant account</p>
        </div>

        {/* Signup Form */}
        <Card className="p-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault()

              if (!formData.email || !formData.password || !formData.name || !formData.state) {

                toast("Please fill in all required fields.")
                return
              }

              setLoading(true)

              try {
                const response = await fetch("api/register", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                })

                const data = await response.json()

                if (data.success) {
                  toast(" Account created successfully.")
                  // Optionally redirect to dashboard or login:
                  setUser(data.user)
                  localStorage.setItem("projectKisan_user", JSON.stringify(data.user))

                  setTimeout(() => router.push("/"), 1500)
                } else {


                  toast(data.error)

                }
              } catch (error) {

                toast("Something went wrong. Please try again.")

                // toast(data.error)
              } finally {
                setLoading(false)
              }
            }}

          >
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="farmer@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                Role
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="h-12 rounded-xl border-gray-200">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Farmer">Farmer</SelectItem>
                  <SelectItem value="Worker">Worker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* State + (optional) Farm Size */}
            <div className={`grid gap-4 ${formData.role === "Farmer" ? "grid-cols-2" : "grid-cols-1"}`}>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                  State
                </Label>
                <Select onValueChange={(value) => setFormData({ ...formData, state: value })}>
                  <SelectTrigger className="h-12 rounded-xl border-gray-200">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <SelectValue placeholder="Select state" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.role === "Farmer" && (
                <div className="space-y-2">
                  <Label htmlFor="farmSize" className="text-sm font-medium text-gray-700">
                    Farm Size
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, farmSize: value })}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {farmSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="mt-1" />
              <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-emerald-600 hover:text-emerald-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

          </form>

          {/* Login Redirect */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </Card>

        {/* Benefits */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-xl p-6">
          <h3 className="font-medium text-gray-900 mb-4 text-center">What you'll get:</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-700">AI-powered crop disease diagnosis</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-700">Real-time market price alerts</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-700">Voice assistant in your language</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
