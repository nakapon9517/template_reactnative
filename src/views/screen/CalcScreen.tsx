import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Route, Color } from '@/constants';
import { Item } from '@/entities';
import { useItemCategories, useItem } from '@/hooks';
import { AddButton, Admob, CalcList, Header } from '@/views/components';
import { Icon } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';

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
