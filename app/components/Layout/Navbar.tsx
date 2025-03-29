"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Home, LogIn, ShoppingBag, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"

// Nav Link Component (works for both desktop and mobile)
interface NavLinkProps {
  href: string
  icon: React.ReactElement<{ className?: string }>
  label: string
  count?: number
  isMobile?: boolean
  onClick?: () => void
}

function NavLink({ href, icon, label, count, isMobile = false, onClick }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  const IconElement = React.isValidElement(icon)
    ? React.cloneElement(icon, {
        className: `${isMobile ? "mr-2" : "mr-2"} h-5 w-5`,
      })
    : null

  return (
    <Link
      href={href}
      className={`flex items-center text-lg transition-colors hover:text-primary ${
        isActive ? "text-blue-600 font-medium" : ""
      } ${isMobile ? "py-3" : ""}`}
      onClick={onClick}
    >
      {IconElement}
      <span>{label}</span>
      {count !== undefined && count > 0 && (
        <Badge variant="secondary" className="ml-2 px-2 py-0">
          {count}
        </Badge>
      )}
    </Link>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [favoriteCount, setFavoriteCount] = useState(0)

  useEffect(() => {
    // Safe localStorage access (only in browser)
    if (typeof window !== "undefined") {
      try {
        const cartItems = JSON.parse(localStorage.getItem("cart") || "[]")
        const favoriteItems = JSON.parse(localStorage.getItem("favorites") || "[]")

        // Ensure cartItems and favoriteItems are arrays
        const cartCount = Array.isArray(cartItems) ? cartItems.length : 0
        const favoriteCount = Array.isArray(favoriteItems) ? favoriteItems.length : 0

        setCartCount(cartCount)
        setFavoriteCount(favoriteCount)
      } catch (error) {
        console.error("Error loading cart/favorites data:", error)
        setCartCount(0)
        setFavoriteCount(0)
      }
    }
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/azushop.svg" alt="Logo" width={150} height={150} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-6">
          <NavLink 
            href="/" 
            icon={<Home />} 
            label="Home" 
          />
          <NavLink 
            href="/shop" 
            icon={<ShoppingBag />} 
            label="Shop" 
          />
          <NavLink 
            href="/cart" 
            icon={<ShoppingCart />} 
            label="Cart" 
            count={cartCount}
          />
          <NavLink 
            href="/favourite" 
            icon={<Heart />} 
            label="Favourite" 
            count={favoriteCount}
          />
        </div>

        {/* Desktop Auth Links */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="flex items-center gap-2" asChild>
            <Link href="/login">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
            <Link href="/register">
              <User className="h-4 w-4" />
              <span>Register</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[260px] sm:w-[300px]">
            <div className="flex flex-col space-y-2 py-4">
              <NavLink
                href="/"
                icon={<Home />}
                label="Home"
                isMobile
                onClick={closeMenu}
              />
              <NavLink
                href="/shop"
                icon={<ShoppingBag />}
                label="Shop"
                isMobile
                onClick={closeMenu}
              />
              <NavLink
                href="/cart"
                icon={<ShoppingCart />}
                label="Cart"
                count={cartCount}
                isMobile
                onClick={closeMenu}
              />
              <NavLink
                href="/favourite"
                icon={<Heart />}
                label="Favourite"
                count={favoriteCount}
                isMobile
                onClick={closeMenu}
              />

              <div className="border-t pt-4 mt-4">
                <NavLink
                  href="/login"
                  icon={<LogIn />}
                  label="Login"
                  isMobile
                  onClick={closeMenu}
                />
                <NavLink
                  href="/register"
                  icon={<User />}
                  label="Register"
                  isMobile
                  onClick={closeMenu}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}