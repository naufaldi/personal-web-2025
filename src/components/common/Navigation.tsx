import { useLocation, Link } from 'react-router'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib'

interface NavItem {
  name: string
  href: string
  external?: boolean
}

const navigationItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: 'https://blog.faldi.xyz/', external: true },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Speaker', href: '/speaker' },
]

const moreItems: NavItem[] = [
  { name: 'Book', href: '/book' },
  { name: 'Manhwa', href: '/manhwa' },
  { name: 'Short', href: '/shorts' },
]

export default function Navigation() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <NavigationMenu delayDuration={200}>
      <NavigationMenuList className="space-x-0 gap-2">
        {navigationItems.map((item) => {
          const isActive = !item.external && currentPath === item.href
          const linkClassName = cn(
            'inline-flex h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:pointer-events-none disabled:opacity-50',
            isActive
              ? 'bg-slate-800/80 text-slate-100 border border-slate-700/60'
              : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/60 hover:text-blue-400'
          )

          return (
            <NavigationMenuItem key={item.name}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                  style={{
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  to={item.href}
                  className={linkClassName}
                  style={{
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {item.name}
                </Link>
              )}
            </NavigationMenuItem>
          )
        })}
        <NavigationMenuItem className="flex items-center">
          <Separator
            orientation="vertical"
            className="h-6 mx-2 bg-slate-700/60"
          />
          <NavigationMenuTrigger
            className={cn(
              'rounded-full bg-slate-900/60 text-slate-300 hover:bg-slate-800/60 hover:text-blue-400',
              'h-10 px-4 py-2 text-sm font-medium transition-colors duration-200',
              'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              'data-[state=open]:bg-slate-800/80 data-[state=open]:text-slate-100'
            )}
            style={{
              fontFamily: 'var(--font-body)',
            }}
          >
            Other
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-slate-900/95 backdrop-blur-sm border border-slate-800/70 rounded-lg shadow-lg">
            <ul className="grid w-[200px] gap-1 p-2">
              {moreItems.map((item) => {
                const isActive = currentPath === item.href
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        'block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors',
                        'hover:bg-slate-800/60 hover:text-slate-100 focus:bg-slate-800/60 focus:text-slate-100',
                        isActive && 'bg-slate-800/80 text-slate-100',
                        !isActive && 'text-slate-300'
                      )}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                      }}
                    >
                      <div className="font-medium leading-none">
                        {item.name}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
