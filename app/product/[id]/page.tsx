// app/product/[id]/page.tsx

import { ProductDetails } from "../../components/Product/ProductDetails"
import { Metadata } from "next"

// Mock data - replace with your actual data fetching
// This could be a database call, API request, etc.
const getProductById = async (id: string): Promise<any> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Mock product database
  const products = {
    "1": {
      id: 1,
      name: "Apple MacBook Pro 2019 | 16\"",
      brand: "Apple",
      images: ["/smartphone.jpeg"],
      specs: {
        "RAM": "16.0 GB",
        "Memory": "512 GB",
        "Keyboard layout": "Eng (English)"
      },
      price: 749.99,
      rating: 4.5,
      reviewCount: 1,
      inStock: true
    },
    "2": {
      id: 2,
      name: "Apple MacBook Pro 2020 | 13.3\" | Touch Bar",
      brand: "Apple",
      images: ["/placeholder.svg"],
      specs: {
        "RAM": "16.0 GB",
        "Memory": "512 GB",
        "Keyboard layout": "Eng (English)"
      },
      price: 949.99,
      rating: 4.2,
      reviewCount: 3,
      inStock: true
    },
    "3": {
      id: 3,
      name: "HP EliteBook 840 G5 | i5-8350U | 14\"",
      brand: "HP",
      images: ["/placeholder.svg"],
      specs: {
        "RAM": "8 GB",
        "HDD": "128 GB SSD",
        "Backlit keyboard": "Yes",
        "Screen": "Win 11 Pro",
        "Size": "14\""
      },
      price: 549.99,
      rating: 4.0,
      reviewCount: 2,
      inStock: false
    },
    // Add more products as needed
  }
  
  return products[id as keyof typeof products] || null
}

// Mock reviews data
const getProductReviews = async (productId: string): Promise<any[]> => {
  const allReviews = {
    "1": [
      {
        id: "r1",
        author: "John Doe",
        rating: 4.5,
        comment: "Experience exceptional clarity and precision",
        date: "August 6, 2024"
      }
    ],
    "2": [
      {
        id: "r2",
        author: "Jane Smith",
        rating: 5,
        comment: "The best laptop I've ever used, incredibly fast and responsive.",
        date: "July 15, 2024"
      },
      {
        id: "r3",
        author: "Mike Johnson",
        rating: 4,
        comment: "Great performance but battery life could be better.",
        date: "June 22, 2024"
      }
    ],
    "3": [
      {
        id: "r4",
        author: "Sarah Williams",
        rating: 4,
        comment: "Good value for the price, solid performance for business tasks.",
        date: "July 3, 2024"
      }
    ]
  }
  
  return allReviews[productId as keyof typeof allReviews] || []
}

// Mock related products
const getRelatedProducts = async (productId: string, category?: string): Promise<any[]> => {
  // All products in catalog
  const allProducts = [
    {
      id: 1,
      name: "Apple MacBook Pro 2019 | 16\"",
      brand: "Apple",
      image: "/smartphone.jpeg",
      specs: {
        "RAM": "16.0 GB",
        "Memory": "512 GB",
      },
      price: 749.99,
      category: "laptop"
    },
    {
      id: 2,
      name: "Apple MacBook Pro 2020 | 13.3\" | Touch Bar",
      brand: "Apple",
      image: "/placeholder.svg",
      specs: {
        "RAM": "16.0 GB",
        "Memory": "512 GB",
      },
      price: 949.99,
      category: "laptop"
    },
    {
      id: 3,
      name: "HP EliteBook 840 G5 | i5-8350U | 14\"",
      brand: "HP",
      image: "/placeholder.svg",
      specs: {
        "RAM": "8 GB",
        "Storage": "128 GB SSD",
      },
      price: 549.99,
      category: "laptop"
    },
    {
      id: 4,
      name: "Dell XPS 13 | i7 | 13.3\"",
      brand: "Dell",
      image: "/placeholder.svg",
      specs: {
        "RAM": "16 GB",
        "Storage": "512 GB SSD",
      },
      price: 1249.99,
      category: "laptop"
    },
    {
      id: 5,
      name: "Lenovo ThinkPad X1 Carbon | 14\"",
      brand: "Lenovo",
      image: "/placeholder.svg",
      specs: {
        "RAM": "16 GB",
        "Storage": "1 TB SSD",
      },
      price: 1399.99,
      category: "laptop"
    },
  ]
  
  // Filter out the current product and return up to 4 related products
  return allProducts
    .filter(p => p.id.toString() !== productId)
    .slice(0, 4)
}

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductById(params.id)
  
  if (!product) {
    return {
      title: "Product Not Found"
    }
  }
  
  return {
    title: product.name,
    description: `Buy ${product.name} at the best price. ${product.specs.RAM} RAM, ${product.specs.Memory || product.specs.Storage || ''}.`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const product = await getProductById(id)
  
  // If product not found, you might want to show a 404 page
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="mt-4">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }
  
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product.name, href: `/product/${id}`, active: true }
  ]
  
  const reviews = await getProductReviews(id)
  const relatedProducts = await getRelatedProducts(id)
  
  return (
    <main>
      <ProductDetails
        product={product}
        breadcrumbs={breadcrumbs}
        reviews={reviews}
        relatedProducts={relatedProducts}
      />
    </main>
  )
}