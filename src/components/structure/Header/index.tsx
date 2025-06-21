'use client'

import { motion } from 'framer-motion'
import { Calendar, LogOut, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export const Header: React.FC = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      initial={{ opacity: 0, y: -20 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-beuni-gradient flex h-8 w-8 items-center justify-center rounded-full">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <span className="bg-beuni-gradient bg-clip-text text-xl font-bold text-transparent">
              BeUni Aniversários
            </span>
          </motion.div>
        </div>

        <nav className="hidden items-center space-x-6 md:flex">
          <Button
            className="hover:text-beuni-orange text-gray-600"
            size="sm"
            variant="ghost"
          >
            <Users className="mr-2 h-4 w-4" />
            Aniversariantes
          </Button>
        </nav>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="relative h-8 w-8 rounded-full" variant="ghost">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-beuni-orange text-white">
                    {getInitials('Igor Sasaki')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium">
                    Igor Sasaki
                  </p>

                  <p className="text-muted-foreground text-xs leading-none">
                    igor-sasaki@hotmail.com
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  )
}
