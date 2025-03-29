"use client"

import Link from "next/link"
import { ProductGallery } from "./ProductGallery"
import { ProductInfo } from "./ProductInfo"
import { ProductReviews } from "./ProductReviews"

interface Breadcrumb {
  label: string
  href: string
  active?: boolean
}

interface Review {
  id: string | number
  author: string
  rating: number
  comment: string
  date: string
}

interface ProductDetailsProps {
  product: {
    id: number | string
    name: string
    brand: string
    images: string[]
    specs: Record<string, string>
    price: number
    rating: number
    reviewCount: number
    inStock: boolean
  }
  breadcrumbs: Breadcrumb[]
  reviews: Review[]
}

export function ProductDetails({ 
  product, 
  breadcrumbs, 
  reviews 
}: ProductDetailsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.href}>
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {crumb.active ? (
              <span className="text-gray-700">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="text-gray-600 hover:text-blue-600">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </div>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductInfo product={product} />
      </div>

      {/* Tabs & Reviews */}
      <ProductReviews reviews={reviews} productId={product.id} />
    </div>
  )
}