import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Item } from '@/entities';
import { Route, Color } from '@/constants';
import { useItemCategories, useItem } from '@/hooks';
import { AddButton, Admob, CalcList, Header } from '@/views/components';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<Route, 'Calc'>;
  route: RouteProp<Route, 'Calc'>;
};

const CalcScreen = (props: Props) => {
  const categories = useItemCategories();
  const { items } = useItem({ categories: categories });

  const onClickAddButton = () => {
    props.navigation.navigate('CalcInput', {});
  };

  const onClickItem = (item: Item) => {
    props.navigation.navigate('CalcInput', { item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Header title='計算' />
      <CalcList
        categories={categories}
        items={items}
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
