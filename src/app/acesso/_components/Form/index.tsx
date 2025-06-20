'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Form: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form className="space-y-4">
      <fieldset className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          className="transition-all-smooth focus-beuni"
          id="email"
          name="email"
          placeholder="seu@email.com"
          type="email"
        />
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>

        <div className="relative">
          <Input
            className="transition-all-smooth focus-beuni pr-10"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            type={showPassword ? 'text' : 'password'}
          />
          <Button
            className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            size="sm"
            type="button"
            variant="ghost"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
      </div>

      <Button
        className="bg-beuni-orange hover:bg-beuni-orange/90 transition-all-smooth w-full cursor-pointer"
        type="submit"
      >
        Entrar
      </Button>
    </form>
  )
}
