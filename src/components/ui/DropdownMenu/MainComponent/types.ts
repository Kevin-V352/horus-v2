import { type ReactNode } from 'react';

export interface IMenuProps {
  children: ReactNode;
  groups: IGroupOptions[];
}

export interface IGroupOptions {
  label: string;
  options: Option[];
  subMenuGroupLabel?: string;
  type: 'header' | 'subMenu';
}

export interface Option {
  name: string;
  callback: () => void;
}
