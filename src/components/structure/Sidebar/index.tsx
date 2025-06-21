'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { SIDEBAR_ITEMS } from './data'

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 256 }}
      className="sticky top-16 h-[calc(100vh-4rem)] border-r bg-white"
      initial={{ width: 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex h-full flex-col">
        <div className="p-4">
          <Button
            className="hover:text-beuni-orange w-full justify-start text-gray-600"
            onClick={() => setCollapsed(!collapsed)}
            size="sm"
            variant="ghost"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-2">Recolher</span>
              </>
            )}
          </Button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {SIDEBAR_ITEMS.map(item => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className={cn(
                    'w-full justify-start transition-colors',
                    isActive
                      ? 'bg-beuni-orange hover:bg-beuni-orange/90 text-white'
                      : 'hover:text-beuni-orange text-gray-600 hover:bg-orange-50'
                  )}
                  onClick={() => router.push(item.href)}
                  size="sm"
                  variant={isActive ? 'default' : 'ghost'}
                >
                  <Icon className="h-4 w-4" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        animate={{ opacity: 1, width: 'auto' }}
                        className="ml-2 whitespace-nowrap"
                        exit={{ opacity: 0, width: 0 }}
                        initial={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            )
          })}
        </nav>
      </div>
    </motion.aside>
  )
}
