"use client"

import { useState } from "react"
import { CartHeader } from "../components/Cart/CartHeader"
import { ShoppingCart } from "lucide-react"
import { CartItemTable } from "../components/Cart/CartItemTable"
import { CartSummary } from "../components/Cart/CartSummary"

type CartItemType = {
  id: string
  name: string
  brand: string
  price: number
  image: string
  quantity: number
}

// Sample cart data
const initialCartItems: CartItemType[] = [
  {
    id: "1",
    name: "MacBook Pro M2",
    brand: "Apple",
    price: 1999.99,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 1,
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 999.99,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 2,
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Headphones",
    brand: "Sony",
    price: 349.99,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 1,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems)

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Calculate totals
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <main className="min-h-screen pb-12">
      <CartHeader
        title="Your Cart"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart", active: true },
        ]}
      />

      <div className="container px-4 mx-auto mt-8">
        {cartItems.length > 0 ? (
          <div className="lg:flex lg:gap-8">
            {/* Cart Items Table - Using the CartItemTable component */}
            <div className="lg:flex-grow">
              <CartItemTable
                items={cartItems}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
              />
            </div>

            {/* Order Summary - Using the CartSummary component */}
            <div className="mt-8 lg:mt-0 lg:w-80 lg:flex-shrink-0">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <CartSummary itemCount={itemCount} subtotal={subtotal} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven&apos;t added any products to your cart yet.
            </p>
            <a
              href="/shop"
              className="inline-flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
            >
              Continue Shopping
            </a>
          </div>
        )}
      </div>
    </main>
  )
}

