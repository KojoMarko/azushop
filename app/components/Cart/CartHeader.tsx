import Link from "next/link";

interface CartHeaderProps {
  title: string;
  breadcrumbs: {
    label: string;
    href: string;
    active?: boolean;
  }[];
}

export function CartHeader({ title, breadcrumbs }: CartHeaderProps) {
  return (
    <section className="bg-gradient-to-b from-blue-900 to-blue-500 py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{title}</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">Review your cart items</p>

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
  );
}

