"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Leaf, Mail, Lock, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "sonner"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { setUser, user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })

  if (user) {
    // If user is already logged in, redirect to dashboard
    router.push("/")
    return null
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast("Please fill in all required fields.")

      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        const { user } = data

        // Save user data
        setUser(user)
        localStorage.setItem("projectKisan_user", JSON.stringify(user))


        toast("🎉 Welcome back, ${user.name}!")

        setTimeout(() => {
          router.push("/")
        }, 1500)
      } else {

        toast("Login failed. Please check your credentials.")

      }
    } catch (error) {
      console.error("Sign in error:", error)

      toast("Login failed. Please try again later.")
    } finally {
      setIsLoading(false)
    }
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

          <h1 className="text-3xl font-light text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to your farming assistant account</p>
        </div>

        {/* Login Form */}
        <Card className="p-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <form className="space-y-6">
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
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, rememberMe: checked })
                  }
                  disabled={isLoading}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link href="#" className="text-sm text-emerald-600 hover:text-emerald-700">
                Forgot password?
              </Link>
            </div>

            <Button
              type="button"
              onClick={handleSubmit}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl mb-1">🌱</div>
            <div className="text-xs text-gray-600">AI Diagnosis</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl mb-1">📈</div>
            <div className="text-xs text-gray-600">Market Prices</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl mb-1">🗣️</div>
            <div className="text-xs text-gray-600">Voice Assistant</div>
          </div>
        </div>
      </div>
    </div>
  )
}
