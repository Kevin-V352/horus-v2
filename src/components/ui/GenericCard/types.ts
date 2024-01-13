import { type CardProps } from '../Card/types';

export interface GenericCardProps extends Omit<CardProps, 'children'> {
  value:        string;
  description:  string;
  unit?:        string;
};
