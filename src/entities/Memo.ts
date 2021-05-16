import { Category } from '@/entities';

export type Memo = {
  text: string;
  update: Date;
  category: Category;
};
