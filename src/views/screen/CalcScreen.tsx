import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Calc, Category } from '@/entities';
import { Route, Color } from '@/constants';
import { useCalcList, useCalcCategories } from '@/hooks';
import {
  AddButton,
  AddTabButton,
  Admob,
  CalcList,
  Header,
  CategoryView,
} from '@/views/components';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

type Props = {
  navigation: StackNavigationProp<Route, 'Calc'>;
  route: RouteProp<Route, 'Calc'>;
};

const CalcScreen = (props: Props) => {
  const { calcs, setCalcList } = useCalcList();
  const { calcCategories, setCalcCategory, setCalcCategoryList } =
    useCalcCategories();
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    setCalcCategory([{ id: 1, title: 'aaa' }]);
    setDisabled(calcCategories ? calcCategories.length === 0 : true);
  }, []);

  const onSaveNewCategory = () => {
    console.log('aaaaa', newCategory);
    // setCalcCategoryList([
    //   ...(calcCategories ?? []),
    //   { id: calcCategories ? calcCategories.length : 0, title: text },
    // ]);
  };

  const onClickCategory = () => {};

  const onClickAddCategoryButton = () => {
    props.navigation.navigate('CalcCategoryScreen');
  };
  const onClickAddButton = () => {
    props.navigation.navigate('CalcInput', {});
  };

  const onClickItem = (calc: Calc) => {
    props.navigation.navigate('CalcInput', { calc });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Header title='計算' />
      <CalcList
        items={calcs ?? []}
        categories={calcCategories ?? []}
        onClickItem={onClickItem}
      />
      <CategoryView
        visible={open}
        calcs={calcs ?? []}
        categories={calcCategories ?? []}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        setOpen={setOpen}
        onClickItem={onClickCategory}
        onSaveNewCategory={onSaveNewCategory}
      />
      <AddTabButton onPress={onClickAddCategoryButton} />
      <AddButton disabled={disabled} onPress={onClickAddButton} />
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
