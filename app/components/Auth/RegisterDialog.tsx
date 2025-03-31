"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface RegisterFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

interface RegisterDialogProps {
  children?: React.ReactNode
  onOpenChange?: (open: boolean) => void
  open?: boolean
  onLoginClick?: () => void
}

export function RegisterDialog({ children, onOpenChange, open, onLoginClick }: RegisterDialogProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {}

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // This is where you would normally make an API call to register the user
      console.log("Registration attempt with:", formData)

      // Simulate successful registration
      if (formData.email && formData.password) {
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        })

        // Close dialog (if onOpenChange is provided)
        if (onOpenChange) {
          onOpenChange(false)
        }

        // You could redirect or update auth state here
        console.log("Registration successful!")
      }
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle navigation to login
  const handleLoginClick = () => {
    // Close registration dialog
    if (onOpenChange) {
      onOpenChange(false)
    }

    // Open login dialog if callback provided
    if (onLoginClick) {
      onLoginClick()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold">Create Account</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Full Name Field */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          {/* Register Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Register"}
          </Button>

          {/* Login Link */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleLoginClick}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Already have an account? Login
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

