import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TrendingProduct {
  id: string
  title: string
  description: string
  image: string
  category: string
  link: string
}

interface TrendingProductsProps {
  className?: string
}

export function TrendingProducts({ className }: TrendingProductsProps) {
  const trendingProducts: TrendingProduct[] = [
    {
      id: "1",
      title: "MacBook Pro",
      description: "Supercharged for pros with the M2 Pro or M2 Max chip",
      image: "/placeholder.svg?height=300&width=200",
      category: "Laptops",
      link: "/category/laptops/macbook",
    },
    {
      id: "2",
      title: "iPhone 15 Pro",
      description: "The ultimate iPhone with the groundbreaking A17 Pro chip",
      image: "/placeholder.svg?height=200&width=200",
      category: "Smartphones",
      link: "/category/smartphones/iphone",
    },
    {
      id: "3",
      title: "Digital Lens Camera",
      description: "Professional-grade cameras for stunning photography",
      image: "/placeholder.svg?height=200&width=200",
      category: "Cameras",
      link: "/category/cameras/digital-lens",
    },
  ]

  return (
    <section className={`py-12 ${className}`}>
      <div className="container px-4 mx-auto">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-8">Top Trending Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="aspect-square relative">
                <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6 text-center">
                <div className="mb-1 text-sm font-medium text-muted-foreground">{product.category}</div>
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <Button asChild variant="outline" className="group">
                  <Link href={product.link}>
                    Shop now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

