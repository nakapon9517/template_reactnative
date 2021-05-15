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
import { Textarea } from './item/Textarea';

interface Props {
  memos: string[];
}

const MemoList = (props: Props) => {
  const [text, setText] = useState('');

  return (
    <>
      {props.memos.map((_, i) => (
        <Textarea key={i} text={text} onChangeText={(text) => setText(text)} />
      ))}
    </>
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

export { MemoList };
