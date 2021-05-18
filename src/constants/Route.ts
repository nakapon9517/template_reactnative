import { Memo, Calc, Grid } from '@/entities';

export type Route = {
  Splash: undefined;
  Memo: undefined;
  MemoInput: { memo?: Memo };
  Calc: undefined;
  CalcInput: { calc?: Calc };
  Grid: undefined;
  GridInput: { grid?: Grid };
};
