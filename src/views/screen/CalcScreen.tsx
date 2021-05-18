import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Calc } from '@/entities';
import { Route, Color } from '@/constants';
import { useCalcList, useCalcCategories } from '@/hooks';
import { AddButton, Admob, CalcList, Header } from '@/views/components';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<Route, 'Calc'>;
  route: RouteProp<Route, 'Calc'>;
};

const CalcScreen = (props: Props) => {
  const { calcs, setCalcs } = useCalcList();
  const categories = useCalcCategories();

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
        categories={categories}
        items={calcs ?? []}
        onClickItem={onClickItem}
      />
      <AddButton onPress={onClickAddButton} />
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
