import { useContext } from 'react';
import AppContext from '@/contexts/AppContext';
import { Calc } from '@/entities';
import { Storage, StorageName } from '@/utils';

export const useCalcList = () => {
  const { calcs, setCalcs } = useContext(AppContext);

  const setCalcList = (calcs: Calc[]) => {
    const storage = new Storage<Calc[]>();
    storage.save(StorageName.CALC_LIST, calcs);
    setCalcs(calcs);
  };

  return { calcs, setCalcs, setCalcList };
};
