"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Eye } from "lucide-react"

interface RelatedProduct {
  id: number | string
  name: string
  brand: string
  price: number
  image: string
  specs?: Record<string, string>
}

interface RelatedProductsProps {
  products: RelatedProduct[]
  currentProductId: number | string
}

export function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  // Filter out the current product
  const filteredProducts = products.filter(p => p.id !== currentProductId)

  const handleAddToCart = (product: RelatedProduct) => {
    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    
    // Add new item
    const newCart = [...existingCart, { ...product, quantity: 1 }]
    
    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(newCart))
    
    alert(`Added ${product.name} to cart`)
  }

  const handleAddToFavorites = (product: RelatedProduct) => {
    // Get existing favorites
    const existingFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    
    // Add new item
    const newFavorites = [...existingFavorites, product]
    
    // Save back to localStorage
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    
    alert(`Added ${product.name} to favorites`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {filteredProducts.slice(0, 4).map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col items-center relative"
        >
          {/* Brand at the top */}
          <div className="absolute top-2 left-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
            {product.brand}
          </div>

          {/* Product image */}
          <div className="aspect-square bg-gray-100 rounded-md mb-3 flex items-center justify-center w-full">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={120}
              height={120}
              className="object-contain h-32"
            />
          </div>

          {/* Product details */}
          <h3 className="font-medium text-center text-sm md:text-base">{product.name}</h3>
          {product.specs && (
            <p className="text-xs md:text-sm text-muted-foreground text-center mb-2">
              {Object.entries(product.specs).slice(0, 3).map(([key, value]) => `${key}: ${value}`).join(" | ")}
            </p>
          )}
          <div className="mt-2 font-semibold text-center text-sm md:text-base text-blue-600">${product.price.toFixed(2)}</div>

          {/* Action icons */}
          <div className="flex justify-center gap-4 mt-3">
            <button
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              onClick={() => handleAddToCart(product)}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              onClick={() => handleAddToFavorites(product)}
              aria-label={`Add ${product.name} to favorites`}
            >
              <Heart className="w-5 h-5" />
            </button>
            <Link
              href={`/product/${product.id}`}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              aria-label={`View details of ${product.name}`}
            >
              <Eye className="w-5 h-5" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}