import Link from "next/link"

export function NewArrivalsHeader() {
  return (
    <section className="bg-gradient-to-b from-blue-900 to-blue-500 py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">New Arrivals</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">Shop through our latest selection of Products</p>

          <nav className="inline-flex items-center rounded-md bg-white/10 px-4 py-2 backdrop-blur-sm">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-white hover:text-blue-200 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white">/</li>
              <li>
                <Link href="/shop" className="text-white font-medium" aria-current="page">
                  Shop
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  )
}

