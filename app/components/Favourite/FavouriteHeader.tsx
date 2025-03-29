import Link from "next/link";

interface FavouriteHeaderProps {
  title: string;
  breadcrumbs: {
    label: string;
    href: string;
    active?: boolean;
  }[];
}

export function FavouriteHeader({ title, breadcrumbs }: FavouriteHeaderProps) {
  return (
    <section className="bg-gradient-to-b from-green-800 to-green-600 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{title}</h1>
          <p className="text-lg text-green-100 mb-6">Explore your favourite items</p>

          <nav aria-label="Breadcrumb" className="inline-flex">
            <ol className="flex items-center rounded-md bg-white/10 px-4 py-2 backdrop-blur-sm text-sm">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.href} className="flex items-center">
                  {index > 0 && (
                    <span className="text-white/70 mx-2" aria-hidden="true">/</span>
                  )}
                  {breadcrumb.active ? (
                    <span className="text-white font-medium" aria-current="page">
                      {breadcrumb.label}
                    </span>
                  ) : (
                    <Link 
                      href={breadcrumb.href} 
                      className="text-white/90 hover:text-white transition-colors"
                    >
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