import { useState } from "react";
import {
  useLocation,
  Link,
} from "react-router";
import {
  Menu,
  ArrowRight,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

const navigationItems: NavItem[] =
  [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Blog",
      href: "/blogs",
    },
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Speaker",
      href: "/speaker",
    },
  ];

const moreItems: NavItem[] =
  [
    {
      name: "Book",
      href: "/book",
    },
    {
      name: "Manhwa",
      href: "/manhwa",
    },
    {
      name: "Short",
      href: "/shorts",
    },
  ];

// Animation variants for mobile Sheet
const sheetOverlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const sheetContentVariants = {
  hidden: {
    x: "100%",
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    x: "100%",
    opacity: 0,
    scale: 0.95,
  },
};

const sheetItemVariants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 50,
    opacity: 0,
  },
};

export default function Navigation() {
  const location =
    useLocation();
  const currentPath =
    location.pathname;
  const [
    open,
    setOpen,
  ] =
    useState(
      false,
    );

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <NavigationMenu
          delayDuration={
            200
          }
        >
          <NavigationMenuList className="space-x-0 gap-1 sm:gap-2 flex-wrap">
            {navigationItems.map(
              (
                item,
              ) => {
                const isActive =
                  !item.external &&
                  currentPath ===
                    item.href;
                const linkClassName =
                  cn(
                    "inline-flex h-9 sm:h-10 items-center justify-center rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "disabled:pointer-events-none disabled:opacity-50",
                    isActive
                      ? "bg-slate-800/80 light:bg-slate-900 text-slate-100 light:text-white border border-slate-700/60 light:border-slate-800"
                      : "bg-slate-900/60 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:bg-slate-800/60 light:hover:bg-slate-200 hover:text-blue-400 light:hover:text-slate-900",
                  );

                return (
                  <NavigationMenuItem
                    key={
                      item.name
                    }
                  >
                    {item.external ? (
                      <a
                        href={
                          item.href
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          linkClassName
                        }
                        style={{
                          fontFamily:
                            "var(--font-body)",
                        }}
                      >
                        {
                          item.name
                        }
                      </a>
                    ) : (
                      <Link
                        to={
                          item.href
                        }
                        className={
                          linkClassName
                        }
                        style={{
                          fontFamily:
                            "var(--font-body)",
                        }}
                      >
                        {
                          item.name
                        }
                      </Link>
                    )}
                  </NavigationMenuItem>
                );
              },
            )}
            <NavigationMenuItem className="flex items-center">
              <Separator
                orientation="vertical"
                className="h-5 sm:h-6 mx-1 sm:mx-2 bg-slate-700/60 light:bg-slate-300"
              />
              <NavigationMenuTrigger
                className={cn(
                  "rounded-full bg-slate-900/60 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:bg-slate-800/60 light:hover:bg-slate-200 hover:text-blue-400 light:hover:text-slate-900",
                  "h-9 sm:h-10 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-200",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "data-[state=open]:bg-slate-800/80 light:data-[state=open]:bg-slate-900 data-[state=open]:text-slate-100 light:data-[state=open]:text-white",
                )}
                style={{
                  fontFamily:
                    "var(--font-body)",
                }}
              >
                Other
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-slate-900/95 light:bg-white backdrop-blur-sm border border-slate-800/70 light:border-slate-300 rounded-lg shadow-lg">
                <ul className="grid w-[160px] sm:w-[200px] gap-1 p-2">
                  {moreItems.map(
                    (
                      item,
                    ) => {
                      const isActive =
                        currentPath ===
                        item.href;
                      return (
                        <li
                          key={
                            item.name
                          }
                        >
                          <Link
                            to={
                              item.href
                            }
                            className={cn(
                              "block select-none rounded-md px-3 py-2 text-xs sm:text-sm leading-none no-underline outline-none transition-colors",
                              "hover:bg-slate-800/60 light:hover:bg-slate-100 hover:text-slate-100 light:hover:text-slate-900 focus:bg-slate-800/60 light:focus:bg-slate-100 focus:text-slate-100 light:focus:text-slate-900",
                              isActive &&
                                "bg-slate-800/80 light:bg-slate-900 text-slate-100 light:text-white",
                              !isActive &&
                                "text-slate-300 light:text-slate-700",
                            )}
                            style={{
                              fontFamily:
                                "var(--font-body)",
                              fontWeight: 500,
                            }}
                          >
                            <div className="font-medium leading-none">
                              {
                                item.name
                              }
                            </div>
                          </Link>
                        </li>
                      );
                    },
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation - Hamburger Menu with Sheet Animations */}
      <div className="md:hidden">
        <Sheet
          open={
            open
          }
          onOpenChange={
            setOpen
          }
        >
          <SheetTrigger asChild>
            <motion.button
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40"
              aria-label="Toggle navigation menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </SheetTrigger>
          
          <AnimatePresence>
            {open && (
              <>
                {/* Animated Overlay */}
                <motion.div
                  className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                  variants={sheetOverlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                />
                
                {/* Animated Sheet Content */}
                <SheetContent 
                  side="right" 
                  className="w-full flex flex-col p-0 border-l border-slate-800/70"
                >
                  <motion.div
                    className="w-full flex flex-col p-0"
                    variants={sheetContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ 
                      duration: 0.4,
                      ease: "easeOut",
                      when: "beforeChildren",
                      staggerChildren: 0.1,
                    }}
                  >
                    <nav className="flex-1 flex flex-col space-y-4 mt-16 px-6">
                      {navigationItems.map(
                        (
                          item,
                        ) => {
                          const isActive =
                            !item.external &&
                            currentPath ===
                              item.href;
                          return (
                            <motion.div
                              key={
                                item.name
                              }
                              variants={sheetItemVariants}
                              transition={{ 
                                duration: 0.4,
                                ease: "easeOut"
                              }}
                            >
                              <Link
                                to={
                                  item.href
                                }
                                onClick={() =>
                                  setOpen(
                                    false,
                                  )
                                }
                                className={cn(
                                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                                  isActive
                                    ? "bg-slate-800/80 text-slate-100 border border-slate-700/60"
                                    : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-100",
                                )}
                                style={{
                                  fontFamily:
                                    "var(--font-body)",
                                }}
                              >
                                {
                                  item.name
                                }
                              </Link>
                            </motion.div>
                          );
                        },
                      )}
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        <Separator className="bg-slate-700/60" />
                      </motion.div>
                      
                      <motion.div
                        className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 pt-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        More
                      </motion.div>
                      
                      {moreItems.map(
                        (
                          item,
                        ) => {
                          const isActive =
                            currentPath ===
                            item.href;
                          return (
                            <motion.div
                              key={
                                item.name
                              }
                              variants={sheetItemVariants}
                              transition={{ 
                                duration: 0.4,
                                ease: "easeOut"
                              }}
                            >
                              <Link
                                to={
                                  item.href
                                }
                                onClick={() =>
                                  setOpen(
                                    false,
                                  )
                                }
                                className={cn(
                                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                                  isActive
                                    ? "bg-slate-800/80 text-slate-100 border border-slate-700/60"
                                    : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-100",
                                )}
                                style={{
                                  fontFamily:
                                    "var(--font-body)",
                                }}
                              >
                                {
                                  item.name
                                }
                              </Link>
                            </motion.div>
                          );
                        },
                      )}
                    </nav>
                    
                    <motion.div
                      className="border-t border-slate-800/70 p-6 space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                    >
                      <motion.a
                        href="https://www.linkedin.com/in/naufaldirafif/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full rounded-md border border-slate-700/70 bg-slate-800/80 px-4 py-3 text-sm text-slate-100 hover:bg-slate-800/90 hover:border-slate-600/70 transition-colors"
                        style={{
                          fontFamily:
                            "var(--font-body)",
                          fontWeight: 600,
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        Contact
                        <ArrowRight className="h-4 w-4" />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="flex items-center justify-center gap-2 w-full rounded-md bg-slate-100 text-slate-900 px-4 py-3 text-sm hover:bg-white transition-colors font-semibold"
                        style={{
                          fontFamily:
                            "var(--font-body)",
                          fontWeight: 600,
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        Download
                        CV
                        <ArrowRight className="h-4 w-4" />
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </SheetContent>
              </>
            )}
          </AnimatePresence>
        </Sheet>
      </div>
    </>
  );
}