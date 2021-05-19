import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Calc } from '@/entities';
import { Route, Color } from '@/constants';
import { useCalcList, useCalcCategories } from '@/hooks';
import {
  AddButton,
  AddTabButton,
  Admob,
  CalcList,
  Header,
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
  const { calcCategories } = useCalcCategories();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(calcCategories ? calcCategories.length === 0 : true);
  }, []);

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
