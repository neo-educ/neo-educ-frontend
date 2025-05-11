import { MenuItemType } from "./Menu/types"
import { Home, BookCheck, BookA} from 'lucide-react';

export const menuItems: MenuItemType[] = [
  {
    label: 'Home',
    href: '/home',
    active: true,
    icon: <Home size={16} />
  },
  {
    label: 'Planos de Aulas',
    href: '/planos-de-aulas',
    icon: <BookCheck size={16} />
  },
  {
    label: 'Geração de materiais',
    href: '/geracao-de-materiais',
    icon: <BookA size={16} />
  }
]
