"use client"

import { useState, useMemo } from "react"
import { NewArrivalsHeader } from "../components/Shop/NewArrivalsHeader"
import { ProductFilterSidebar } from "../components/Shop/ProductFilterSidebar"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { useRouter } from 'next/navigation';

// Define filter types for better type safety
type PriceRange = {
  min: number | null
  max: number | null
}

type ActiveFilters = {
  categories: string[]
  brands: string[]
  priceRange: PriceRange
}

// Product type definition
type Product = {
  id: number
  name: string
  price: number
  brand: string
  category: string
}

export default function ShopPage() {
  // Define the products variable at the very top
  const products: Product[] = useMemo(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 1000) + 100,
      brand: ["Apple", "Samsung", "Sony", "Lenovo"][Math.floor(Math.random() * 4)],
      category: ["Laptops", "Phones", "Cameras", "Accessories"][Math.floor(Math.random() * 4)],
    })), 
    []
  );

  const router = useRouter();
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    categories: [],
    brands: [],
    priceRange: { min: null, max: null },
  })
  const [clickedCartIds, setClickedCartIds] = useState<number[]>([]);
  const [clickedFavoriteIds, setClickedFavoriteIds] = useState<number[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    setClickedCartIds((prev) => [...prev, product.id]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    console.log(`${product.name} added to cart.`);
  };

  const addToFavorites = (product: Product) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]);
    setClickedFavoriteIds((prev) => [...prev, product.id]);
    localStorage.setItem("favorites", JSON.stringify([...favorites, product]));
    console.log(`${product.name} added to favorites.`);
  };

  const viewProduct = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  // Define handleFilterChange function
  const handleFilterChange = (filters: ActiveFilters) => {
    console.log("Filters applied:", filters);
    setActiveFilters(filters);
  };

  // Define hasActiveFilters variable
  const hasActiveFilters = useMemo(() => {
    return (
      activeFilters.categories.length > 0 ||
      activeFilters.brands.length > 0 ||
      activeFilters.priceRange.min !== null ||
      activeFilters.priceRange.max !== null
    );
  }, [activeFilters]);

  // Define filteredProducts variable
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by category
      if (
        activeFilters.categories.length > 0 &&
        !activeFilters.categories.some((cat) =>
          product.category.toLowerCase().includes(cat.toLowerCase())
        )
      ) {
        return false;
      }

      // Filter by brand
      if (
        activeFilters.brands.length > 0 &&
        !activeFilters.brands.some((brand) =>
          product.brand.toLowerCase().includes(brand.toLowerCase())
        )
      ) {
        return false;
      }

      // Filter by price
      if (activeFilters.priceRange.min !== null && product.price < activeFilters.priceRange.min) {
        return false;
      }
      if (activeFilters.priceRange.max !== null && product.price > activeFilters.priceRange.max) {
        return false;
      }

      return true;
    });
  }, [products, activeFilters]);

  // Define resetFilters function
  const resetFilters = () => {
    setActiveFilters({
      categories: [],
      brands: [],
      priceRange: { min: null, max: null },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NewArrivalsHeader />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <ProductFilterSidebar onFilterChange={handleFilterChange} />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Products</h1>

            {/* Mobile filter button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden flex items-center gap-2"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Active filters summary */}
          {hasActiveFilters && (
            <div className="bg-muted/50 p-3 rounded-md mb-6">
              <div className="text-sm font-medium mb-2">Active Filters:</div>
              <div className="flex flex-wrap gap-2">
                {activeFilters.categories.map((cat) => (
                  <div key={cat} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    Category: {cat}
                  </div>
                ))}
                {activeFilters.brands.map((brand) => (
                  <div key={brand} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    Brand: {brand}
                  </div>
                ))}
                {activeFilters.priceRange.min !== null && (
                  <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    Min Price: ${activeFilters.priceRange.min}
                  </div>
                )}
                {activeFilters.priceRange.max !== null && (
                  <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    Max Price: ${activeFilters.priceRange.max}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
                  <img
                    src="/placeholder.svg" // Replace with actual product image URL
                    alt={product.name}
                    className="object-contain h-32"
                  />
                </div>

                {/* Product details */}
                <h3 className="font-medium text-center text-sm md:text-base">{product.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground text-center mb-2">
                  8GB | 128 GB | Dual-SIM | Phantom Black
                </p>
                <div className="mt-2 font-semibold text-center text-sm md:text-base text-blue-600">${product.price}</div>

                {/* Action icons */}
                <div className="flex justify-center gap-4 mt-3">
                  <button
                    className={`p-2 rounded-full hover:bg-gray-200 ${
                      clickedCartIds.includes(product.id) ? "bg-green-500" : "bg-gray-100"
                    }`}
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                  <button
                    className={`p-2 rounded-full hover:bg-gray-200 ${
                      clickedFavoriteIds.includes(product.id) ? "bg-red-500" : "bg-gray-100"
                    }`}
                    onClick={() => addToFavorites(product)}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                    onClick={() => viewProduct(product.id)}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">No products match your filter criteria.</p>
                <Button
                  variant="link"
                  onClick={resetFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}