import { Item, Memo } from '@/entities';

export type Route = {
  Splash: undefined;
  Memo: undefined;
  MemoInput: { memo?: Memo };
  Calc: undefined;
  CalcInput: { item?: Item };
  Grid: undefined;
  GridInput: { item?: Item };
};
