import type * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  segments: {
    title: string
    href: string
    active?: boolean
  }[]
  separator?: React.ReactNode
  className?: string
}

export function Breadcrumb({
  segments,
  separator = <ChevronRight className="h-4 w-4" />,
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn("flex items-center text-sm", className)} {...props}>
      <ol className="flex items-center gap-2">
        {segments.map((segment, index) => {
          const isLastItem = index === segments.length - 1
          return (
            <li key={`${segment.href}-${index}`} className="flex items-center gap-2">
              {isLastItem ? (
                <span
                  className={cn("font-medium", segment.active ? "text-foreground" : "text-muted-foreground")}
                  aria-current={segment.active ? "page" : undefined}
                >
                  {segment.title}
                </span>
              ) : (
                <>
                  <Link href={segment.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {segment.title}
                  </Link>
                  <span className="text-muted-foreground">{separator}</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

