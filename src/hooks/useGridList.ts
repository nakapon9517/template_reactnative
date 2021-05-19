import { useContext } from 'react';
import AppContext from '@/contexts/AppContext';
import { Grid } from '@/entities';
import { Storage, StorageName } from '@/utils';

export const useGridList = () => {
  const { grids, setGrids } = useContext(AppContext);

  const setGridList = (grids: Grid[]) => {
    const storage = new Storage<Grid[]>();
    storage.save(StorageName.GRID_LIST, grids);
    setGrids(grids);
  };

  return { grids, setGrids, setGridList };
};
