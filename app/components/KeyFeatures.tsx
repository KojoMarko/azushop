import type React from "react"
import { Truck, Lightbulb, Shield } from "lucide-react"

interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
}

export function KeyFeatures() {
  const features: FeatureItem[] = [
    {
      icon: <Truck className="h-10 w-10" />,
      title: "Fast & Free Shipping",
      description:
        "Enjoy complimentary shipping on all orders with our expedited delivery service, ensuring your tech arrives promptly.",
    },
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: "Innovative User-Centric Design",
      description:
        "Our products are thoughtfully designed with your needs in mind, focusing on intuitive interfaces and seamless experiences.",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Durable, High-Quality Materials",
      description:
        "Built to last with premium materials that withstand daily use, our products combine elegance with exceptional durability.",
    },
  ]

  return (
    <section className="bg-blue-600 py-16 text-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Products?</h2>
          <p className="max-w-2xl mx-auto text-blue-100">
            We tackle the challenges of modern technology by creating products that combine innovation, quality, and
            customer satisfaction in every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-blue-700/30 backdrop-blur-sm transition-transform hover:translate-y-[-4px]"
            >
              <div className="bg-blue-500 p-3 rounded-full mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

