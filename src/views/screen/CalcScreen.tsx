import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Color } from '@/constants';
import { useItemCategories, useItem } from '@/hooks';
import { AddButton, Admob, CalcList, Header } from '@/views/components';
import { Icon } from 'react-native-elements';

interface Props {
  test: string;
}
const CalcScreen = (props: Props) => {
  const { items } = useItem();
  const [routes] = useState(() => useItemCategories());

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
      <CalcList routes={routes} items={items} />
      <AddButton onPress={() => console.log('aas')} />
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
