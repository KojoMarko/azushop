// app/components/Product/ProductGallery.tsx
"use client"

import Image from "next/image"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-md p-6 flex items-center justify-center">
      <div className="relative h-[300px] w-full">
        <Image
          src={images[0] || "/placeholder.svg"}
          alt={productName}
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>
  )
}