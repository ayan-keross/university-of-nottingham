"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./theme-switcher"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const pathname = usePathname()

  // Split path into breadcrumb parts
  const segments = pathname
    .split("/")
    .filter((segment) => segment.length > 0)

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/")
            const isLast = index === segments.length - 1
            return (
              <div key={href} className="flex items-center space-x-2">
                <span className="text-muted-foreground">/</span>
                {isLast ? (
                  <span className="text-foreground capitalize">{segment}</span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-foreground capitalize"
                  >
                    {segment}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
