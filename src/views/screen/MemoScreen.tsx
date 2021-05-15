import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Input, Icon } from 'react-native-elements';
import { Color } from '@/constants';
import { Admob, Textarea, Header } from '@/views/components';

interface Props {
  test: string;
}

const MemoScreen = (props: Props) => {
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Header
        title='メモ'
        RightComponent={
          <TouchableOpacity
            style={styles.icon}
            onPress={() => Keyboard.dismiss()}
          >
            <Icon type='material' name='list' color={Color.gray5} size={24} />
          </TouchableOpacity>
        }
      />
      {[''].map((_, i) => (
        <Textarea key={i} text={text} onChangeText={(text) => setText(text)} />
      ))}
      <Admob />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.gray90,
  },
  icon: {
    padding: 12,
    marginRight: 4,
    alignItems: 'flex-end',
  },
});

export { MemoScreen };
