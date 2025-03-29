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
        <div key={product.id} className="border rounded-md overflow-hidden bg-white">
          {/* Brand badge */}
          <div className="p-2 bg-gray-50 text-xs text-center">
            {product.brand}
          </div>
          
          {/* Product image */}
          <div className="p-4">
            <div className="h-32 flex items-center justify-center mb-4">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={120}
                height={120}
                className="object-contain max-h-full"
              />
            </div>
            
            {/* Product name */}
            <Link href={`/product/${product.id}`} className="block hover:text-blue-600">
              <h3 className="font-medium text-sm line-clamp-2 h-10">{product.name}</h3>
            </Link>
            
            {/* Specs summary */}
            {product.specs && (
              <div className="mt-2 space-y-1">
                {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="text-xs text-gray-600">
                    {key}: {value}
                  </div>
                ))}
              </div>
            )}
            
            {/* Price */}
            <div className="font-bold mt-2">${product.price.toFixed(2)}</div>
            
            {/* Action buttons */}
            <div className="flex items-center justify-between mt-4">
              <button 
                className="p-1 hover:text-blue-600" 
                onClick={() => handleAddToCart(product)}
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button 
                className="p-1 hover:text-red-600"
                onClick={() => handleAddToFavorites(product)}
                aria-label={`Add ${product.name} to favorites`}
              >
                <Heart className="w-5 h-5" />
              </button>
              <Link href={`/product/${product.id}`} className="p-1 hover:text-green-600">
                <Eye className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}