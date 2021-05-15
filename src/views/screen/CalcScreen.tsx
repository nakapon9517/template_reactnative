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
import { Admob, CalcList, Header } from '@/views/components';
import { Icon } from 'react-native-elements';

interface Props {
  test: string;
}
const CalcScreen = (props: Props) => {
  const { items } = useItem();
  const [routes] = useState(() => useItemCategories());

  const AddButton = React.memo(() => {
    const styles = StyleSheet.create({
      add: {
        width: 54,
        height: 54,
        position: 'absolute',
        right: 8,
        bottom: 68,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 99,
        backgroundColor: Color.gray80,
        zIndex: 99,
      },
      addText: {
        fontSize: 32,
        color: Color.gray5,
      },
    });

    return (
      <View style={styles.add}>
        <Text style={styles.addText}>+</Text>
      </View>
    );
  });

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
      <AddButton />
      <Admob />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.gray90,
  },
  icon: {
    padding: 8,
    marginRight: 4,
    alignItems: 'flex-end',
  },
});

export { CalcScreen };
