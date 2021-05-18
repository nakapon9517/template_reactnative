import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { Memo, Item } from '@/entities';
import { useMemoList, useItem, useImage } from '@/hooks';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from '@/navigators/TabNavigator';
import AppContext from '@/contexts/AppContext';
import { Storage, StorageName } from '@/utils/Storage';
import { stringify, parse } from 'telejson';

// LogBox.ignoreLogs([
//   'Non-serializable values were found in the navigation state',
// ]);

export default function App() {
  const [memos, setMemos] = useState<Memo[]>();
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    useMemoList().then((res) => {
      setMemos(res.memos);
    });
  }, []);

  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{
          memos,
          setMemos,
          items,
          setItems,
        }}
      >
        <TabNavigator />
      </AppContext.Provider>
    </NavigationContainer>
  );
}
