"use client"

import { useState, useMemo } from "react"
import { NewArrivalsHeader } from "../components/Shop/NewArrivalsHeader"
import { ProductFilterSidebar } from "../components/Shop/ProductFilterSidebar"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    categories: [],
    brands: [],
    priceRange: { min: null, max: null },
  })

  // Mock product data - in a real app, this would likely come from an API
  const products: Product[] = useMemo(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 1000) + 100,
      brand: ["Apple", "Samsung", "Sony", "Lenovo"][Math.floor(Math.random() * 4)],
      category: ["Laptops", "Phones", "Cameras", "Accessories"][Math.floor(Math.random() * 4)],
    })), 
    []
  )

  const handleFilterChange = (filters: ActiveFilters) => {
    console.log("Filters applied:", filters)
    setActiveFilters(filters)
  }

  // Filter products based on active filters - use useMemo for performance
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by category
      if (
        activeFilters.categories.length > 0 &&
        !activeFilters.categories.some((cat) => 
          product.category.toLowerCase().includes(cat.toLowerCase())
        )
      ) {
        return false
      }

      // Filter by brand
      if (
        activeFilters.brands.length > 0 &&
        !activeFilters.brands.some((brand) => 
          product.brand.toLowerCase().includes(brand.toLowerCase())
        )
      ) {
        return false
      }

      // Filter by price
      if (activeFilters.priceRange.min !== null && product.price < activeFilters.priceRange.min) {
        return false
      }
      if (activeFilters.priceRange.max !== null && product.price > activeFilters.priceRange.max) {
        return false
      }

      return true
    })
  }, [products, activeFilters])

  const resetFilters = () => {
    setActiveFilters({
      categories: [],
      brands: [],
      priceRange: { min: null, max: null },
    })
  }

  // Check if any filters are active
  const hasActiveFilters = 
    activeFilters.categories.length > 0 ||
    activeFilters.brands.length > 0 ||
    activeFilters.priceRange.min !== null ||
    activeFilters.priceRange.max !== null

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                  Product Image
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <div className="text-sm text-muted-foreground">{product.brand}</div>
                <div className="text-sm text-muted-foreground">{product.category}</div>
                <div className="mt-2 font-semibold">${product.price}</div>
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