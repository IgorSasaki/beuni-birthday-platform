import { Gift, LayoutDashboard, UserPlus, Users } from 'lucide-react'

export const SIDEBAR_ITEMS = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard'
  },
  {
    icon: Users,
    label: 'Aniversariantes',
    href: '/funcionarios'
  },
  {
    icon: UserPlus,
    label: 'Novo Funcionário',
    href: '/funcionarios/novo'
  },
  {
    icon: Gift,
    label: 'Gestão de Brindes',
    href: '/brindes'
  }
]
