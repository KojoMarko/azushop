"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Smartphone, Laptop, Headphones, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Slide {
  id: number
  title: string
  description: string
  ctaText: string
  ctaLink: string
  ctaIcon: React.ReactNode
  image: string
  bgColor: string
  textColor: string
  buttonBg: string
  buttonText: string
  buttonHover: string
  imageStyle?: string
}

interface HeroSliderProps {
  slides?: Slide[]
  autoSlideInterval?: number
  className?: string
}

export default function HeroSlider({ slides = defaultSlides, autoSlideInterval = 5000, className }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("left")

  const changeSlide = useCallback(
    (direction: "left" | "right") => {
      setIsAnimating(true)
      setDirection(direction)
      setTimeout(() => {
        setCurrentSlide((prev) =>
          direction === "left"
            ? (prev + 1) % slides.length
            : (prev - 1 + slides.length) % slides.length
        )
        setIsAnimating(false)
      }, 500)
    },
    [slides.length]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide("left")
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [changeSlide, autoSlideInterval])

  return (
    <div className={cn("relative w-full overflow-hidden px-4", className)}>
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full container mx-auto">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn("absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out", {
              "translate-x-0 z-10": index === currentSlide && !isAnimating,
              "-translate-x-full":
                index === currentSlide && isAnimating && direction === "left" ||
                index === (currentSlide + 1) % slides.length && !isAnimating,
              "translate-x-full":
                index === currentSlide && isAnimating && direction === "right" ||
                index === (currentSlide - 1 + slides.length) % slides.length && !isAnimating,
              "translate-x-0 -z-10":
                index !== currentSlide &&
                index !== (currentSlide + 1) % slides.length &&
                index !== (currentSlide - 1 + slides.length) % slides.length,
            })}
            style={{ backgroundColor: slide.bgColor }}
          >
            <div className="container h-full mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 text-center md:text-left space-y-4 pt-8 md:pt-0">
                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" 
                  style={{ color: slide.textColor }}
                >
                  {slide.title}
                </h2>
                <p 
                  className="text-sm sm:text-base md:text-lg max-w-md mx-auto md:mx-0"
                  style={{ color: `${slide.textColor}CC` }}
                >
                  {slide.description}
                </p>
                <Button 
                  asChild 
                  size="lg" 
                  className="mt-4"
                  style={{ 
                    backgroundColor: slide.buttonBg, 
                    color: slide.buttonText,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <Link 
                    href={slide.ctaLink}
                    className="hover:opacity-90 transition-opacity"
                  >
                    {slide.ctaText}
                    <span className="ml-2">{slide.ctaIcon}</span>
                  </Link>
                </Button>
              </div>
              <div className="w-full md:w-1/2 h-full flex items-center justify-center p-4">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  width={600}
                  height={400}
                  className={slide.imageStyle || "object-contain max-h-[250px] sm:max-h-[300px] md:max-h-[400px]"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => changeSlide("right")}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-20 shadow-md transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => changeSlide("left")}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-20 shadow-md transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300 shadow-sm",
              index === currentSlide ? "w-6" : "w-2"
            )}
            style={{ 
              backgroundColor: index === currentSlide 
                ? slides[currentSlide].buttonBg 
                : `${slides[currentSlide].buttonBg}80` 
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    title: "Next-Gen Smartphones",
    description: "Discover the latest flagship smartphones with cutting-edge features and 5G connectivity.",
    ctaText: "Shop Smartphones",
    ctaLink: "/category/smartphones",
    ctaIcon: <Smartphone size={18} />,
    image: "/smartphone.jpeg",
    bgColor: "#ffffff", // Off-white/very light gray
    textColor: "#333333", // Dark gray
    buttonBg: "#3b82f6", // Blue
    buttonText: "#ffffff", // White
    buttonHover: "#2563eb", // Darker blue
    imageStyle: "object-contain max-h-[600px] sm:max-h-[700px] md:max-h-[800px]", // Removed borders and shadows
  },
  {
    id: 2,
    title: "Premium Laptops",
    description: "Powerful laptops for work, gaming, and creativity. Now with special back-to-school discounts.",
    ctaText: "Explore Laptops",
    ctaLink: "/category/laptops",
    ctaIcon: <Laptop size={18} />,
    image: "/laptop11.png",
    bgColor: "#0f172a", // Slate-900
    textColor: "#f8fafc", // Slate-50
    buttonBg: "#10b981", // Emerald-500
    buttonText: "#f8fafc", // Slate-50
    buttonHover: "#059669", // Emerald-600
    imageStyle: "object-contain max-h-[700px] sm:max-h-[800px] md:max-h-[900px]", // Increased size
  },
  {
    id: 3,
    title: "Wireless Audio",
    description: "Experience immersive sound with our collection of premium headphones and earbuds.",
    ctaText: "Shop Audio",
    ctaLink: "/category/audio",
    ctaIcon: <Headphones size={18} />,
    image: "/headphone.webp",
    bgColor: "#7c3aed", // Violet-600
    textColor: "#ffffff", // White
    buttonBg: "#fbbf24", // Amber-400
    buttonText: "#1e293b", // Slate-800
    buttonHover: "#f59e0b", // Amber-500
  },
]