import { useContext } from 'react';
import AppContext from '@/contexts/AppContext';

export const useGridList = () => {
  const { grids, setGrids } = useContext(AppContext);
  return { grids, setGrids };
};
