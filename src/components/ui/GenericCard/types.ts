import { type CardProps } from '../Card/types';

export interface GenericCardProps extends Omit<CardProps, 'children'> {
  mainData: string;
  description: string;
};
