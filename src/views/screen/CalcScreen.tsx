import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Color } from '@/constants';
import { Item } from '@/entities';
import { useItemCategories, useItem } from '@/hooks';
import {
  AddButton,
  Admob,
  CalcList,
  Header,
  CalcInput,
} from '@/views/components';
import { Icon } from 'react-native-elements';

interface Props {
  test: string;
}
const CalcScreen = (props: Props) => {
  const { items } = useItem();
  const [categories] = useState(() => useItemCategories());
  const [open, setOpen] = useState(false);
  const [selectedItem, setItem] = useState<Item>();

  const onClickItem = (item: Item) => {
    setItem(item);
    setOpen(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Header
        title='計算'
        RightComponent={
          <TouchableOpacity
            style={styles.icon}
            onPress={() => Keyboard.dismiss()}
          >
            <Icon type='material' name='list' color={Color.gray5} size={24} />
          </TouchableOpacity>
        }
      />
      <CalcList
        categories={categories}
        items={items}
        onClickItem={onClickItem}
      />
      <AddButton onPress={() => console.log('aas')} />
      <CalcInput
        item={selectedItem}
        category={
          categories.filter(
            (category) => category.id === selectedItem?.category
          )[0]
        }
        open={open}
        setOpen={setOpen}
      />
      <Admob />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.gray100,
  },
  icon: {
    padding: 8,
    marginRight: 4,
    alignItems: 'flex-end',
  },
});

export { CalcScreen };
