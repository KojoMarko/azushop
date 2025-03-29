"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ProductInfoProps {
  product: {
    id: number | string
    name: string
    brand: string
    price: number
    specs: Record<string, string>
    rating: number
    reviewCount: number
    inStock: boolean
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    // Add to cart functionality
    const cartItem = { ...product, quantity }
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    
    // Add new item
    const newCart = [...existingCart, cartItem]
    
    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(newCart))
    
    alert(`Added ${quantity} ${product.name} to cart`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center text-sm">
        <span className="text-gray-500">Brand:</span>
        <span className="ml-2">{product.brand}</span>
      </div>

      <div className="flex items-center">
        <div className="flex">
          {Array(5).fill(0).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={i < Math.floor(product.rating) ? "#FFD700" : "#E5E7EB"}
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-2">({product.reviewCount} review{product.reviewCount !== 1 ? 's' : ''})</span>
      </div>

      <h1 className="text-2xl font-bold">{product.name}</h1>

      <div className="space-y-1">
        {Object.entries(product.specs).map(([key, value]) => (
          <div key={key} className="text-sm">
            <span>{key}:</span> <span>{value}</span>
          </div>
        ))}
      </div>

      <div className="text-blue-600 text-2xl font-bold">${product.price.toFixed(2)}</div>

      <div className={product.inStock ? "text-green-600" : "text-red-600"}>
        {product.inStock ? "In stock" : "Out of stock"}
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <select
          className="w-20 p-2 border border-gray-300 rounded bg-gray-50"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          disabled={!product.inStock}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        <Button
          className="max-w-xs bg-blue-600 hover:bg-blue-700"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          Add to cart
        </Button>
      </div>
    </div>
  )
}