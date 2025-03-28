import Link from "next/link"

interface CartHeaderProps {
  title: string
  breadcrumbs: {
    label: string
    href: string
    active?: boolean
  }[]
}

export function CartHeader({ title, breadcrumbs }: CartHeaderProps) {
  return (
    <section className="bg-gradient-to-b from-blue-900 to-blue-500 py-8 md:py-12">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>

          <nav className="inline-flex items-center rounded-md bg-white/10 px-4 py-2 backdrop-blur-sm">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.href} className="flex items-center">
                  {index > 0 && <span className="text-white mx-2">/</span>}
                  {breadcrumb.active ? (
                    <span className="text-white font-medium">{breadcrumb.label}</span>
                  ) : (
                    <Link href={breadcrumb.href} className="text-white hover:text-blue-200 transition-colors">
                      {breadcrumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  )
}

