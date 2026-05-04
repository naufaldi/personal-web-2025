import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib'

interface NavItem {
  name: string
  href: string
}

const navigationItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blogs' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Speaker', href: '/speaker' },
]

const secondaryItems: NavItem[] = [
  { name: 'Book', href: '/book' },
  { name: 'Manhwa', href: '/manhwa' },
  { name: 'Short', href: '/shorts' },
  { name: 'Experience', href: '/experience' },
]

const linkClassName = (isActive: boolean) =>
  cn(
    'relative inline-flex h-10 items-center px-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--graphite-muted)] transition-colors hover:text-[var(--graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]',
    isActive &&
      'text-[var(--graphite)] after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:bg-[var(--graphite)]',
  )

export default function Navigation() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const isSecondaryActive = secondaryItems.some((item) => item.href === pathname)

  return (
    <>
      <NavigationMenu className="hidden md:flex" delayDuration={120}>
        <NavigationMenuList className="flex items-center gap-7">
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <Link to={item.href} className={linkClassName(pathname === item.href)}>
                {item.name}
              </Link>
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger
              className={cn(
                'relative inline-flex h-10 items-center gap-1 px-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--graphite-muted)] transition-colors hover:text-[var(--graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)] data-[state=open]:text-[var(--graphite)]',
                'rounded-none bg-transparent py-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent',
                isSecondaryActive &&
                  'text-[var(--graphite)] after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:bg-[var(--graphite)]',
              )}
            >
              Other
            </NavigationMenuTrigger>
            <NavigationMenuContent className="rounded-[var(--radius-sm)] border border-[var(--border-line)] bg-[var(--paper)] shadow-[var(--shadow-paper-sm)]">
              <ul className="grid w-56 gap-1 p-2">
                {secondaryItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        'block rounded-[var(--radius-xs)] px-3 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--graphite-muted)] transition-colors hover:bg-[var(--surface-subtle)] hover:text-[var(--graphite)] focus:bg-[var(--surface-subtle)] focus:text-[var(--graphite)] focus-visible:outline-none',
                        pathname === item.href && 'text-[var(--graphite)]',
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open navigation menu">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm">
            <SheetTitle className="font-mono text-sm uppercase tracking-[0.14em]">Route index</SheetTitle>
            <nav className="mt-10 grid gap-1" aria-label="Mobile navigation">
              {[...navigationItems, ...secondaryItems].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'border-b border-[var(--border-line)] py-4 font-mono text-sm uppercase tracking-[0.12em] text-[var(--graphite-muted)] transition-colors hover:text-[var(--graphite)]',
                    pathname === item.href && 'text-[var(--graphite)]',
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
