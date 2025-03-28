// components/Cart/CartItem.tsx
"use client"

import Image from "next/image"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type CartItemType = {
  id: string
  name: string
  brand: string
  price: number
  image: string
  quantity: number
}

interface CartItemProps {
  item: CartItemType
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const totalPrice = item.price * item.quantity

  return (
    <tr className="border-b">
      <td className="py-4">
        <div className="flex items-center">
          <div className="h-20 w-20 bg-gray-100 rounded mr-4 flex-shrink-0 overflow-hidden">
            <Image 
              src={item.image} 
              alt={item.name} 
              width={80} 
              height={80} 
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-gray-500 text-sm">{item.brand}</p>
          </div>
        </div>
      </td>
      <td className="text-right py-4">${item.price.toFixed(2)}</td>
      <td className="py-4">
        <div className="flex justify-center">
          <Select
            value={item.quantity.toString()}
            onValueChange={(value) => onQuantityChange(item.id, parseInt(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Qty" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </td>
      <td className="text-right py-4 font-medium">
        ${totalPrice.toFixed(2)}
      </td>
      <td className="py-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Remove</span>
        </Button>
      </td>
    </tr>
  )
}