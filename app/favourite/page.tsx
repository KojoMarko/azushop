"use client";

import { FavouriteHeader } from "../components/Favourite/FavouriteHeader";
import { FavouriteItem } from "../components/Favourite/FavouriteItem";

const favouriteItems = [
  {
    id: "1",
    name: "Wireless Headphones",
    brand: "AudioTech",
    price: 199.99,
    image: "/headphone.webp",
  },
  {
    id: "2",
    name: "Smartphone",
    brand: "TechBrand",
    price: 999.99,
    image: "/smartphone.jpeg",
  },
];

export default function FavouritePage() {
  const handleRemove = (id: string) => {
    console.log(`Remove item with id: ${id}`);
  };

  return (
    <div className="container mx-auto">
      <FavouriteHeader
        title="Your Favourites"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Favourites", href: "/favourite", active: true },
        ]}
      />

      <div className="mt-8 space-y-4">
        {favouriteItems.map((item) => (
          <FavouriteItem key={item.id} item={item} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}