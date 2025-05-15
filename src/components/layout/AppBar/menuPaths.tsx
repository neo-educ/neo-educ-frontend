import { BookA, BookCheck, Home } from 'lucide-react';
import { BsPeopleFill } from 'react-icons/bs';
import { MenuItemType } from "./Menu/types";

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
    active: false,
    icon: <BookCheck size={16} />
  },
  {
    label: 'Geração de materiais',
    href: '/geracao-de-materiais',
    active: false,
    icon: <BookA size={16} />
  },
  {
    label: 'Meus Alunos',
    href: '/gerenciamento-de-alunos',
    active: false,
    icon: <BsPeopleFill size={16} />
  }
]
