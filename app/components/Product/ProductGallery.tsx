// app/components/Product/ProductGallery.tsx
"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || "/placeholder.svg")

  return (
    <div className="bg-white border border-gray-100 rounded-md p-6">
      {/* Main Image Display */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative h-[300px] w-full">
          <Image
            src={selectedImage}
            alt={productName}
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer border rounded-md p-1 ${
              selectedImage === image ? "border-blue-500" : "border-gray-200"
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative h-[60px] w-[60px]">
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}