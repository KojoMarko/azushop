"use client"

import React from "react"

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
        <Link href="/" className="flex items-center">
          <Image src="/azushop.svg" alt="Logo" width={200} height={200} className="h-40 w-40" />
        </Link>

        {/* Navigation Links - Middle (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center space-x-6">
          <NavLink href="/" icon={<Home className="h-6 w-6" />} label="Home" />
          <NavLink href="/shop" icon={<ShoppingBag className="h-6 w-6" />} label="Shop" />
          <NavLink href="/cart" icon={<ShoppingCart className="h-6 w-6" />} label="Cart" />
          <NavLink href="/favourite" icon={<Heart className="h-6 w-6" />} label="Favourite" />
        </div>

        {/* Auth Links - Right Side (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="lg" className="flex items-center space-x-2" asChild>
            <Link href="/login" className="flex items-center text-lg font-medium">
              <LogIn className="h-6 w-6" />
              <span>Login</span>
            </Link>
          </Button>
          <Button variant="ghost" size="lg" className="flex items-center space-x-2" asChild>
            <Link href="/register" className="flex items-center text-lg font-medium">
              <User className="h-6 w-6" />
              <span>Register</span>
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
                icon={<Home className="mr-2 h-6 w-6" />}
                label="Home"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/shop"
                icon={<ShoppingBag className="mr-2 h-6 w-6" />}
                label="Shop"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/cart"
                icon={<ShoppingCart className="mr-2 h-6 w-6" />}
                label="Cart"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/favourite"
                icon={<Heart className="mr-2 h-6 w-6" />}
                label="Favourite"
                onClick={() => setIsOpen(false)}
              />

              <div className="border-t pt-4 mt-4">
                <MobileNavLink
                  href="/login"
                  icon={<LogIn className="mr-2 h-6 w-6" />}
                  label="Login"
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavLink
                  href="/register"
                  icon={<User className="mr-2 h-6 w-6" />}
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
  href: string;
  icon: React.ReactElement<{ className?: string }>;
  label: string;
}

function NavLink({ href, icon, label }: NavLinkProps) {
  const validIcon = React.cloneElement(icon, { className: "mr-2 h-6 w-6" });

  return (
    <Link href={href} className="flex items-center text-lg font-medium transition-colors hover:text-primary">
      {validIcon}
      {label}
    </Link>
  );
}

// Mobile Navigation Link
interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

function MobileNavLink({ href, icon, label, onClick }: MobileNavLinkProps) {
  const validIcon = React.cloneElement(icon, { className: "mr-2 h-6 w-6" });

  return (
    <Link
      href={href}
      className="flex items-center py-3 text-lg font-medium transition-colors hover:text-primary"
      onClick={onClick}
    >
      {validIcon}
      {label}
    </Link>
  );
}

