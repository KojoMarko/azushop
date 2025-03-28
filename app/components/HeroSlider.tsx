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

  const nextSlide = useCallback(() => {
    setIsAnimating(true)
    setDirection("left")
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      setIsAnimating(false)
    }, 500)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setIsAnimating(true)
    setDirection("right")
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
      setIsAnimating(false)
    }, 500)
  }, [slides.length])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [nextSlide, autoSlideInterval])

  return (
    <div className={cn("relative w-full overflow-hidden px-4", className)}>
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full container mx-auto">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn("absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out", {
              "translate-x-0 z-10": index === currentSlide && !isAnimating,
              "-translate-x-full":
                (index === currentSlide && isAnimating && direction === "left") ||
                (index === (currentSlide + 1) % slides.length && !isAnimating),
              "translate-x-full":
                (index === currentSlide && isAnimating && direction === "right") ||
                (index === (currentSlide - 1 + slides.length) % slides.length && !isAnimating),
              "translate-x-0 -z-10":
                index !== currentSlide &&
                index !== (currentSlide + 1) % slides.length &&
                index !== (currentSlide - 1 + slides.length) % slides.length,
            })}
            style={{ backgroundColor: slide.bgColor }}
          >
            <div className="container h-full mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 text-center md:text-left space-y-4 pt-8 md:pt-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-md mx-auto md:mx-0">
                  {slide.description}
                </p>
                <Button asChild size="lg" className="mt-4 bg-white text-black hover:bg-white/90">
                  <Link href={slide.ctaLink}>
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
                  className={slide.imageStyle || "object-contain max-h-[250px] sm:max-h-[300px] md:max-h-[400px] rounded-lg"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentSlide ? "bg-white w-6" : "bg-white/50",
            )}
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
    bgColor: "#0f172a", // Dark blue
    imageStyle: "object-contain max-h-[600px] sm:max-h-[700px] md:max-h-[800px] rounded-lg", // Increased size
  },
  {
    id: 2,
    title: "Premium Laptops",
    description: "Powerful laptops for work, gaming, and creativity. Now with special back-to-school discounts.",
    ctaText: "Explore Laptops",
    ctaLink: "/category/laptops",
    ctaIcon: <Laptop size={18} />,
    image: "/placeholder.svg?height=400&width=600",
    bgColor: "#18181b", // Dark slate
  },
  {
    id: 3,
    title: "Wireless Audio",
    description: "Experience immersive sound with our collection of premium headphones and earbuds.",
    ctaText: "Shop Audio",
    ctaLink: "/category/audio",
    ctaIcon: <Headphones size={18} />,
    image: "/headphone.webp",
    bgColor: "#0c0a09", // Dark brown/black
  },
]

