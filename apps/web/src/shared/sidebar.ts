import {
  BoxesIcon,
  LayoutDashboardIcon,
  Package,
  PieChart,
  ShoppingCart,
  Users,
} from 'lucide-react'

export const panel = [
  {
    title: 'Painel',
    url: '/panel',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Vendas',
    url: '/panel/sales',
    icon: ShoppingCart,
  },
  {
    title: 'Estatísticas',
    url: '/panel/insights',
    icon: PieChart,
  },
  {
    title: 'Categorias',
    url: '/panel/category',
    icon: BoxesIcon,
  },
  {
    title: 'Produtos',
    url: '/panel/product',
    icon: Package,
  },
  {
    title: 'Usuários',
    url: '/panel/user',
    icon: Users,
  },
]
