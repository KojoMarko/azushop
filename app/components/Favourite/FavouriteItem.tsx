"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type FavouriteItemType = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
};

interface FavouriteItemProps {
  item: FavouriteItemType;
  onRemove: (id: string) => void;
}

export function FavouriteItem({ item, onRemove }: FavouriteItemProps) {
  return (
    <div className="border rounded-lg p-4 flex items-start space-x-4">
      <div className="h-24 w-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
        <Image 
          src={item.image} 
          alt={item.name} 
          width={96} 
          height={96} 
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-lg">{item.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{item.brand}</p>
        <p className="font-bold text-blue-600">${item.price.toFixed(2)}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="h-5 w-5" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  );
}