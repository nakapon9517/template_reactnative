import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { Memo, Calc, Grid, Category } from '@/entities';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from '@/navigators/TabNavigator';
import AppContext from '@/contexts/AppContext';
import { Storage, StorageName } from '@/utils/Storage';

// LogBox.ignoreLogs([
//   'Non-serializable values were found in the navigation state',
// ]);

export default function App() {
  const [memos, setMemos] = useState<Memo[]>();
  const [calcs, setCalcs] = useState<Calc[]>();
  const [calcCategories, setCalcCategory] = useState<Category[]>();
  const [grids, setGrids] = useState<Grid[]>();

  useEffect(() => {
    const load = async () => {
      const storage = new Storage();
      await storage.get(StorageName.MEMO_LIST).then((list) => {
        setMemos(list);
      });
      await storage.get(StorageName.CALC_LIST).then((list) => {
        setCalcs(list);
      });
      await storage.get(StorageName.CALC_CATEGORY).then((list) => {
        setCalcCategory(list);
      });
      await storage.get(StorageName.GRID_LIST).then((list) => {
        setGrids(list);
      });
    };
    load();
  }, []);

  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{
          memos,
          setMemos,
          calcs,
          setCalcs,
          calcCategories,
          setCalcCategory,
          grids,
          setGrids,
        }}
      >
        <TabNavigator />
      </AppContext.Provider>
    </NavigationContainer>
  );
}
