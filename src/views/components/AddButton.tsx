import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Color } from '@/constants';

interface Props {
  onPress: () => void;
}

export const AddButton = React.memo((props: Props) => {
  return (
    <TouchableOpacity style={styles.add} onPress={props.onPress}>
      <Text style={styles.addText}>+</Text>
    </TouchableOpacity>
  );
});

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
