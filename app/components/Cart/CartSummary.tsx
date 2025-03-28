// components/Cart/CartSummary.tsx
"use client"

import { Button } from "@/components/ui/button"

type CartSummaryProps = {
  itemCount: number
  subtotal: number
}

export function CartSummary({ itemCount, subtotal }: CartSummaryProps) {
  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-sm">Calculated at checkout</span>
        </div>
        <div className="pt-3 border-t">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mb-4">
        {itemCount} items in cart
      </div>
      
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        Proceed to checkout
      </Button>
    </div>
  )
}