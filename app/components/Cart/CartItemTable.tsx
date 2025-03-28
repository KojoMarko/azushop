// components/Cart/CartItemTable.tsx
"use client"

import { CartItem } from "./CartItem"

type CartItemType = {
  id: string
  name: string
  brand: string
  price: number
  image: string
  quantity: number
}

interface CartItemTableProps {
  items: CartItemType[]
  onQuantityChange: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}

export function CartItemTable({ items, onQuantityChange, onRemoveItem }: CartItemTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 font-medium">Product</th>
            <th className="text-right py-4 font-medium">Price</th>
            <th className="text-center py-4 font-medium">Quantity</th>
            <th className="text-right py-4 font-medium">Total</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={onQuantityChange}
              onRemove={onRemoveItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}