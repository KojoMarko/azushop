"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Home, LogIn, ShoppingBag, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo - Left Side */}
        <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
                <Image 
                src="/azushop.svg" 
                alt="Logo" 
                width={250}    // Increased from 100
                height={250}   // Increased from 100
                className="mr-2 h-auto w-auto max-h-12" // Added max-height constraint and auto sizing
                />
            </Link>
            </div>

        {/* Navigation Links - Middle (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center space-x-6">
          <NavLink href="/" icon={<Home className="mr-2 h-4 w-4" />} label="Home" />
          <NavLink href="/shop" icon={<ShoppingBag className="mr-2 h-4 w-4" />} label="Shop" />
          <NavLink href="/cart" icon={<ShoppingCart className="mr-2 h-4 w-4" />} label="Cart" />
          <NavLink href="/favourite" icon={<Heart className="mr-2 h-4 w-4" />} label="Favourite" />
        </div>

        {/* Auth Links - Right Side (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login" className="flex items-center">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Register
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 py-4">
              <MobileNavLink
                href="/"
                icon={<Home className="mr-2 h-5 w-5" />}
                label="Home"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/shop"
                icon={<ShoppingBag className="mr-2 h-5 w-5" />}
                label="Shop"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/cart"
                icon={<ShoppingCart className="mr-2 h-5 w-5" />}
                label="Cart"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/favourite"
                icon={<Heart className="mr-2 h-5 w-5" />}
                label="Favourite"
                onClick={() => setIsOpen(false)}
              />

              <div className="border-t pt-4 mt-4">
                <MobileNavLink
                  href="/login"
                  icon={<LogIn className="mr-2 h-5 w-5" />}
                  label="Login"
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavLink
                  href="/register"
                  icon={<User className="mr-2 h-5 w-5" />}
                  label="Register"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

// Desktop Navigation Link
interface NavLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

function NavLink({ href, icon, label }: NavLinkProps) {
  return (
    <Link href={href} className="flex items-center text-sm font-medium transition-colors hover:text-primary">
      {icon}
      {label}
    </Link>
  )
}

// Mobile Navigation Link
interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void
}

function MobileNavLink({ href, icon, label, onClick }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center py-2 text-base font-medium transition-colors hover:text-primary"
      onClick={onClick}
    >
      {icon}
      {label}
    </Link>
  )
}

