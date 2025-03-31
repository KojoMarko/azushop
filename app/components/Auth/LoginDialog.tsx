"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface LoginFormData {
  email: string
  password: string
}

interface LoginDialogProps {
  children?: React.ReactNode
  onOpenChange?: (open: boolean) => void
  open?: boolean
  onRegisterClick?: () => void
}

export function LoginDialog({ children, onOpenChange, open, onRegisterClick }: LoginDialogProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
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

      // This is where you would normally make an API call to authenticate
      console.log("Login attempt with:", formData)

      // Simulate successful login
      if (formData.email && formData.password) {
        // Reset form
        setFormData({ email: "", password: "" })

        // Close dialog (if onOpenChange is provided)
        if (onOpenChange) {
          onOpenChange(false)
        }

        // You could redirect or update auth state here
        console.log("Login successful!")
      }
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle navigation to register dialog
  const handleRegisterClick = () => {
    // Close login dialog
    if (onOpenChange) {
      onOpenChange(false)
    }

    // Open register dialog if callback provided
    if (onRegisterClick) {
      onRegisterClick()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">Login</DialogTitle>
          {/* The close button is already included in DialogContent by default */}
          {/* We don't need to add another one */}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleRegisterClick}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              New Customer? Create your account
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

