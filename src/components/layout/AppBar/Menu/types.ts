import { ReactNode } from 'react';

export interface MenuItemType {
  label: string;
  href: string;
  active?: boolean;
  icon?: ReactNode;
  children?: MenuItemType[];
}