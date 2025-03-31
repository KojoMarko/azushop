"use client"

import { useState } from "react"
import { Search, X, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  subcategories?: Category[]
}

interface Brand {
  id: string
  name: string
}

interface PriceRange {
  min: string | number | null
  max: string | number | null
}

interface Filters {
  categories: string[]
  brands: string[]
  priceRange: PriceRange
}

interface ProductFilterSidebarProps {
  className?: string
  onFilterChange?: (filters: Filters) => void
}

export function ProductFilterSidebar({ className, onFilterChange }: ProductFilterSidebarProps) {
  // State for filter values
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [brandSearchQuery, setBrandSearchQuery] = useState("")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Sample data
  const categories: Category[] = [
    {
      id: "laptops",
      name: "Laptops",
      subcategories: [
        { id: "gaming-laptops", name: "Gaming Laptops" },
        { id: "ultrabooks", name: "Ultrabooks" },
        { id: "macbooks", name: "MacBooks" },
      ],
    },
    {
      id: "phones",
      name: "Phones",
      subcategories: [
        { id: "smartphones", name: "Smartphones" },
        { id: "feature-phones", name: "Feature Phones" },
      ],
    },
    { id: "cameras", name: "Cameras" },
    { id: "watches", name: "Watches" },
    { id: "accessories", name: "Accessories" },
  ]

  const brands: Brand[] = [
    { id: "apple", name: "Apple" },
    { id: "samsung", name: "Samsung" },
    { id: "lenovo", name: "Lenovo" },
    { id: "sony", name: "Sony" },
    { id: "canon", name: "Canon" },
    { id: "nikon", name: "Nikon" },
    { id: "dell", name: "Dell" },
    { id: "hp", name: "HP" },
    { id: "asus", name: "Asus" },
    { id: "lg", name: "LG" },
  ]

  // Filter brands based on search query
  const filteredBrands = brands.filter((brand) => brand.name.toLowerCase().includes(brandSearchQuery.toLowerCase()))

  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  // Handle brand selection
  const handleBrandChange = (brandId: string) => {
    setSelectedBrands((prev) => (prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]))
  }

  // Handle price range input
  const handlePriceChange = (type: "min" | "max", value: string) => {
    setPriceRange((prev) => ({ ...prev, [type]: value }))
  }

  // Apply filters
  const applyFilters = () => {
    const filters: Filters = {
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange: {
        min: priceRange.min ? Number.parseInt(priceRange.min) : null,
        max: priceRange.max ? Number.parseInt(priceRange.max) : null,
      },
    }

    if (onFilterChange) {
      onFilterChange(filters)
    }

    // Close mobile sidebar after applying filters
    setIsMobileSidebarOpen(false)
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange({ min: "", max: "" })
    setBrandSearchQuery("")

    if (onFilterChange) {
      onFilterChange({
        categories: [],
        brands: [],
        priceRange: { min: null, max: null },
      })
    }
  }

  // Render category item with potential subcategories
  const renderCategoryItem = (category: Category, depth = 0) => (
    <div key={`${category.id}-${depth}`} className={cn("py-1", depth > 0 && "ml-4")}>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`category-${category.id}`}
          checked={selectedCategories.includes(category.id)}
          onCheckedChange={() => handleCategoryChange(category.id)}
        />
        <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
          {category.name}
        </Label>
      </div>

      {category.subcategories && category.subcategories.length > 0 && (
        <div className="mt-1">{category.subcategories.map((subcat) => renderCategoryItem(subcat, depth + 1))}</div>
      )}
    </div>
  )

  // Mobile sidebar toggle button
  const MobileSidebarToggle = () => (
    <div className="md:hidden fixed bottom-4 right-4 z-50">
      <Button onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} className="rounded-full h-12 w-12 shadow-lg">
        {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
      </Button>
    </div>
  )

  return (
    <>
      <aside
        className={cn(
          "bg-gray-50 border-r p-4 transition-all duration-300 overflow-auto",
          "fixed inset-0 z-40 md:sticky md:top-16 md:h-[calc(100vh-4rem)]",
          "md:w-64 md:translate-x-0 md:border-r md:block",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Categories Section */}
          <div>
            <Accordion type="single" collapsible defaultValue="categories">
              <AccordionItem value="categories" className="border-none">
                <AccordionTrigger className="py-2 text-base font-medium">Product Categories</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 pt-1">{categories.map((category) => renderCategoryItem(category))}</div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Brands Section */}
          <div>
            <Accordion type="single" collapsible defaultValue="brands">
              <AccordionItem value="brands" className="border-none">
                <AccordionTrigger className="py-2 text-base font-medium">Brands</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search brands"
                        value={brandSearchQuery}
                        onChange={(e) => setBrandSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {filteredBrands.map((brand, index) => (
                        <div key={`${brand.id}-${index}`} className="flex items-center space-x-2">
                          <Checkbox
                            id={`brand-${brand.id}`}
                            checked={selectedBrands.includes(brand.id)}
                            onCheckedChange={() => handleBrandChange(brand.id)}
                          />
                          <Label htmlFor={`brand-${brand.id}`} className="text-sm cursor-pointer">
                            {brand.name}
                          </Label>
                        </div>
                      ))}
                      {filteredBrands.length === 0 && (
                        <p className="text-sm text-muted-foreground py-2">No brands found</p>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Price Range Section */}
          <div>
            <Accordion type="single" collapsible defaultValue="price">
              <AccordionItem value="price" className="border-none">
                <AccordionTrigger className="py-2 text-base font-medium">Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="min-price" className="text-xs mb-1 block">
                          Min Price
                        </Label>
                        <Input
                          id="min-price"
                          type="number"
                          placeholder="0"
                          value={priceRange.min}
                          onChange={(e) => handlePriceChange("min", e.target.value)}
                          className="h-9"
                        />
                      </div>
                      <div>
                        <Label htmlFor="max-price" className="text-xs mb-1 block">
                          Max Price
                        </Label>
                        <Input
                          id="max-price"
                          type="number"
                          placeholder="1000"
                          value={priceRange.max}
                          onChange={(e) => handlePriceChange("max", e.target.value)}
                          className="h-9"
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button onClick={applyFilters} className="flex-1">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={resetFilters} className="flex-1">
              Reset
            </Button>
          </div>
        </div>
      </aside>

      <MobileSidebarToggle />
    </>
  )
}

