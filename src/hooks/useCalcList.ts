import { useContext } from 'react';
import AppContext from '@/contexts/AppContext';

export const useCalcList = () => {
  const { calcs, setCalcs } = useContext(AppContext);
  return { calcs, setCalcs };
};
